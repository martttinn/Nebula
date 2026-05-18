// Librería repo-local del change-log.
// Centraliza parsing, validación, generación de índices y helpers de creación para doc/change-log/.
const fs = require("fs");
const path = require("path");

const CHANGE_LOG_ROOT_SEGMENTS = ["doc", "change-log"];
const CHANGE_LOG_CONFIG_SEGMENTS = [...CHANGE_LOG_ROOT_SEGMENTS, "config.json"];
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const ENTRY_FRONTMATTER_ORDER = [
  "change_id",
  "date",
  "title",
  "group_id",
  "category",
  "subcategories",
  "origin",
  "complexity",
  "scope",
  "user_visible",
  "release_impacts",
  "architecture_layers",
  "backend_sensitive",
  "files_touched",
  "verification",
  "related_decisions",
];

const GROUP_FRONTMATTER_ORDER = [
  "group_id",
  "group_type",
  "title",
  "date_start",
  "date_end",
  "status",
  "customer",
  "change_ids",
];

const ENTRY_REQUIRED_SECTIONS = [
  {
    label: "Resumen corto",
    alternatives: ["# Resumen corto"],
  },
  {
    label: "Contexto / problema",
    alternatives: ["## Contexto / problema", "# Contexto"],
  },
  {
    label: "Cambio realizado",
    alternatives: ["## Cambio realizado"],
  },
  {
    label: "Objetivo",
    alternatives: ["## Objetivo"],
  },
  {
    label: "Impacto",
    alternatives: [
      "## Impacto arquitectonico",
      "## Impacto arquitectónico",
      "## Impacto",
    ],
  },
  {
    label: "Validacion",
    alternatives: ["## Validacion", "## Validación"],
  },
  {
    label: "Cierre / seguimiento",
    alternatives: [
      "## Pendientes / limites",
      "## Pendientes / límites",
      "## Riesgos / seguimiento",
    ],
  },
  {
    label: "Notas para presupuesto",
    alternatives: ["## Notas para presupuesto"],
  },
];

const GROUP_REQUIRED_SECTIONS = [
  {
    label: "Resumen",
    alternatives: ["# Resumen"],
  },
  {
    label: "Objetivo del grupo",
    alternatives: ["## Objetivo del grupo"],
  },
  {
    label: "Cambios incluidos",
    alternatives: ["## Cambios incluidos"],
  },
  {
    label: "Impacto en arquitectura / producto",
    alternatives: ["## Impacto en arquitectura / producto"],
  },
  {
    label: "Validacion agregada",
    alternatives: ["## Validacion agregada", "## Validación agregada"],
  },
  {
    label: "Riesgos o arrastres",
    alternatives: ["## Riesgos o arrastres"],
  },
  {
    label: "Notas para presupuesto",
    alternatives: ["## Notas para presupuesto"],
  },
];

const LEGACY_ENTRY_FRONTMATTER_KEYS = [
  "change_id",
  "group_id",
  "date",
  "title",
  "type",
  "status",
  "owner",
  "tags",
];

const LEGACY_ENTRY_REQUIRED_SECTIONS = [
  {
    label: "Contexto",
    alternatives: ["# Contexto", "## Contexto / problema"],
  },
  {
    label: "Cambio realizado",
    alternatives: ["## Cambio realizado"],
  },
  {
    label: "Objetivo",
    alternatives: ["## Objetivo"],
  },
  {
    label: "Impacto",
    alternatives: [
      "## Impacto",
      "## Impacto arquitectonico",
      "## Impacto arquitectónico",
    ],
  },
  {
    label: "Validacion",
    alternatives: ["## Validacion", "## Validación"],
  },
  {
    label: "Seguimiento",
    alternatives: [
      "## Riesgos / seguimiento",
      "## Pendientes / limites",
      "## Pendientes / límites",
    ],
  },
];

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function toPosixPath(filePath) {
  return filePath.replace(/\\/g, "/");
}

function resolveChangeLogRoot(projectRoot = process.cwd()) {
  return path.join(projectRoot, ...CHANGE_LOG_ROOT_SEGMENTS);
}

function resolveChangeLogConfigPath(projectRoot = process.cwd()) {
  return path.join(projectRoot, ...CHANGE_LOG_CONFIG_SEGMENTS);
}

function ensureDirectory(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function readFile(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function ensureTrailingNewline(content) {
  return content.endsWith("\n") ? content : `${content}\n`;
}

function writeFile(filePath, content) {
  fs.writeFileSync(filePath, ensureTrailingNewline(content), "utf8");
}

function parseScalar(rawValue) {
  const value = rawValue.trim();
  if (value === "true") {
    return true;
  }
  if (value === "false") {
    return false;
  }
  if (value === "null") {
    return null;
  }
  if (value === "[]") {
    return [];
  }
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  return value;
}

function parseFrontmatterValue(text, filePath) {
  const result = {};
  let currentArrayKey = null;

  for (const rawLine of text.split(/\r?\n/)) {
    const trimmed = rawLine.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    if (/^\s*-\s+/.test(rawLine)) {
      if (!currentArrayKey) {
        throw new Error(
          `Lista sin clave activa en el frontmatter de ${filePath}: ${rawLine}`,
        );
      }
      result[currentArrayKey].push(parseScalar(trimmed.replace(/^- /, "")));
      continue;
    }

    const keyValueMatch = /^([^:]*):(.*)$/.exec(rawLine);
    if (!keyValueMatch) {
      throw new Error(
        `Linea invalida en el frontmatter de ${filePath}: ${rawLine}`,
      );
    }

    const [, rawKey, rawValuePart] = keyValueMatch;
    const key = rawKey.trim();
    const rawValue = rawValuePart.trim();

    if (rawValue === "") {
      result[key] = [];
      currentArrayKey = key;
      continue;
    }

    result[key] = parseScalar(rawValue);
    currentArrayKey = null;
  }

  return result;
}

function parseMarkdownDocument(filePath) {
  const raw = readFile(filePath);

  if (!raw.startsWith("---\n")) {
    throw new Error(`Falta frontmatter en ${filePath}`);
  }

  const closingIndex = raw.indexOf("\n---\n", 4);
  if (closingIndex === -1) {
    throw new Error(`Frontmatter mal cerrado en ${filePath}`);
  }

  const frontmatterRaw = raw.slice(4, closingIndex);
  const body = raw.slice(closingIndex + 5).replace(/^\n+/, "");

  return {
    filePath,
    raw,
    data: parseFrontmatterValue(frontmatterRaw, filePath),
    body,
  };
}

function serializeScalar(value) {
  if (typeof value === "boolean") {
    return value ? "true" : "false";
  }

  if (value === null) {
    return "null";
  }

  return String(value);
}

function serializeFrontmatter(data, orderedKeys) {
  const lines = ["---"];

  for (const key of orderedKeys) {
    if (!(key in data)) {
      continue;
    }

    const value = data[key];
    if (Array.isArray(value)) {
      lines.push(`${key}:`);
      for (const item of value) {
        lines.push(`  - ${serializeScalar(item)}`);
      }
      continue;
    }

    lines.push(`${key}: ${serializeScalar(value)}`);
  }

  lines.push("---");
  return lines.join("\n");
}

function listMarkdownFiles(dirPath) {
  if (!fs.existsSync(dirPath)) {
    return [];
  }

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolutePath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      files.push(...listMarkdownFiles(absolutePath));
      continue;
    }
    if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(absolutePath);
    }
  }

  return files.sort();
}

function compareDatesDescending(first, second, primaryKey = "date") {
  const firstDate = first.data[primaryKey] || "";
  const secondDate = second.data[primaryKey] || "";
  if (firstDate !== secondDate) {
    return secondDate.localeCompare(firstDate);
  }
  return getPrimaryId(second).localeCompare(getPrimaryId(first));
}

function getPrimaryId(document) {
  return document.data.change_id || document.data.group_id || "";
}

function escapeHeadingPattern(heading) {
  return heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function bodyHasHeading(body, heading) {
  const pattern = new RegExp(`^${escapeHeadingPattern(heading)}\\s*$`, "m");
  return pattern.test(body);
}

function ensureRequiredSections(body, sections, filePath) {
  const errors = [];

  for (const section of sections) {
    const satisfied = section.alternatives.some((heading) =>
      bodyHasHeading(body, heading),
    );
    if (!satisfied) {
      errors.push(
        `${filePath}: falta una seccion obligatoria compatible con "${section.label}"`,
      );
    }
  }

  return errors;
}

function validateNonEmptyArray(document, key, errors) {
  const value = document.data[key];
  if (!Array.isArray(value) || value.length === 0) {
    errors.push(`${document.filePath}: "${key}" debe ser un array no vacio`);
  }
}

function validateEnumArray(document, key, enumSet, errors) {
  const value = document.data[key];
  if (!Array.isArray(value) || value.length === 0) {
    errors.push(`${document.filePath}: "${key}" debe ser un array no vacio`);
    return;
  }

  for (const item of value) {
    if (!enumSet.has(item)) {
      errors.push(
        `${document.filePath}: valor invalido "${item}" en "${key}"`,
      );
    }
  }
}

function loadChangeLogConfig(projectRoot = process.cwd()) {
  const configPath = resolveChangeLogConfigPath(projectRoot);
  assert(fs.existsSync(configPath), `No existe ${configPath}`);

  const config = JSON.parse(readFile(configPath));

  assert(
    typeof config.projectName === "string" && config.projectName.trim(),
    `config change-log invalida: falta "projectName"`,
  );
  assert(
    typeof config.projectCode === "string" &&
      /^[A-Z0-9]+$/.test(config.projectCode.trim()),
    `config change-log invalida: "projectCode" debe ser alfanumerico uppercase`,
  );
  assert(
    typeof config.customerDefault === "string" && config.customerDefault.trim(),
    `config change-log invalida: falta "customerDefault"`,
  );

  const arrayKeys = [
    "entryCategories",
    "entrySubcategories",
    "entryOrigins",
    "entryComplexities",
    "entryScopes",
    "releaseImpacts",
    "architectureLayers",
  ];

  for (const key of arrayKeys) {
    assert(Array.isArray(config[key]) && config[key].length > 0, `config change-log invalida: "${key}" debe ser un array no vacio`);
  }

  return config;
}

function buildPatterns(config) {
  const escapedCode = config.projectCode.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return {
    entryIdPattern: new RegExp(
      `^${escapedCode}-CHG-(\\d{4})-(\\d{2})-(\\d{2})-(\\d{3})$`,
    ),
    groupIdPattern: new RegExp(`^${escapedCode}-(SPR|TSK)-(\\d{4})-(\\d{3})$`),
  };
}

function buildEnums(config) {
  return {
    category: new Set(config.entryCategories),
    subcategories: new Set(config.entrySubcategories),
    origin: new Set(config.entryOrigins),
    complexity: new Set(config.entryComplexities),
    scope: new Set(config.entryScopes),
    release_impacts: new Set(config.releaseImpacts),
    architecture_layers: new Set(config.architectureLayers),
    group_type: new Set(["sprint", "task"]),
    status: new Set(["open", "closed"]),
  };
}

function isLegacyEntryDocument(data) {
  return "type" in data || "owner" in data || "tags" in data;
}

function validateLegacyEntryDocument(document, groupsById, projectRoot, config) {
  const patterns = buildPatterns(config);
  const errors = [];
  const data = document.data;

  for (const key of LEGACY_ENTRY_FRONTMATTER_KEYS) {
    if (!(key in data)) {
      errors.push(`${document.filePath}: falta frontmatter legacy obligatorio "${key}"`);
    }
  }

  const entryMatch = String(data.change_id || "").match(patterns.entryIdPattern);
  if (!entryMatch) {
    errors.push(`${document.filePath}: "change_id" no cumple el formato esperado`);
  }

  if (!ISO_DATE_PATTERN.test(String(data.date || ""))) {
    errors.push(`${document.filePath}: "date" debe tener formato YYYY-MM-DD`);
  }

  if (!patterns.groupIdPattern.test(String(data.group_id || ""))) {
    errors.push(`${document.filePath}: "group_id" no cumple el formato esperado`);
  } else if (!groupsById.has(data.group_id)) {
    errors.push(
      `${document.filePath}: el grupo "${data.group_id}" no existe en doc/change-log/groups`,
    );
  }

  if (typeof data.type !== "string" || data.type.trim().length === 0) {
    errors.push(`${document.filePath}: "type" legacy no puede estar vacio`);
  }

  if (typeof data.status !== "string" || data.status.trim().length === 0) {
    errors.push(`${document.filePath}: "status" legacy no puede estar vacio`);
  }

  if (typeof data.owner !== "string" || data.owner.trim().length === 0) {
    errors.push(`${document.filePath}: "owner" legacy no puede estar vacio`);
  }

  if (!Array.isArray(data.tags) || data.tags.length === 0) {
    errors.push(`${document.filePath}: "tags" legacy debe ser un array no vacio`);
  }

  if (entryMatch) {
    const [, year, month] = entryMatch;
    const relativeFilePath = toPosixPath(
      path.relative(resolveChangeLogRoot(projectRoot), document.filePath),
    );
    if (!relativeFilePath.startsWith(`entries/${year}/${month}/`)) {
      errors.push(
        `${document.filePath}: la ruta no coincide con el arbol entries/${year}/${month}/`,
      );
    }
  }

  const basename = path.basename(document.filePath);
  if (data.change_id && !basename.startsWith(`${data.change_id}--`)) {
    errors.push(
      `${document.filePath}: el nombre de archivo debe empezar por "${data.change_id}--"`,
    );
  }

  errors.push(
    ...ensureRequiredSections(
      document.body,
      LEGACY_ENTRY_REQUIRED_SECTIONS,
      document.filePath,
    ),
  );

  return errors;
}

function validateEntryDocument(document, groupsById, projectRoot, config) {
  if (isLegacyEntryDocument(document.data)) {
    return validateLegacyEntryDocument(document, groupsById, projectRoot, config);
  }

  const patterns = buildPatterns(config);
  const enums = buildEnums(config);
  const errors = [];
  const data = document.data;

  for (const key of ENTRY_FRONTMATTER_ORDER.filter((item) => item !== "related_decisions")) {
    if (!(key in data)) {
      errors.push(`${document.filePath}: falta frontmatter obligatorio "${key}"`);
    }
  }

  const entryMatch = String(data.change_id || "").match(patterns.entryIdPattern);
  if (!entryMatch) {
    errors.push(`${document.filePath}: "change_id" no cumple el formato esperado`);
  }

  if (!ISO_DATE_PATTERN.test(String(data.date || ""))) {
    errors.push(`${document.filePath}: "date" debe tener formato YYYY-MM-DD`);
  }

  if (!patterns.groupIdPattern.test(String(data.group_id || ""))) {
    errors.push(`${document.filePath}: "group_id" no cumple el formato esperado`);
  } else if (!groupsById.has(data.group_id)) {
    errors.push(
      `${document.filePath}: el grupo "${data.group_id}" no existe en doc/change-log/groups`,
    );
  }

  if (!enums.category.has(data.category)) {
    errors.push(`${document.filePath}: "category" tiene un valor invalido`);
  }

  validateEnumArray(document, "subcategories", enums.subcategories, errors);

  if (!enums.origin.has(data.origin)) {
    errors.push(`${document.filePath}: "origin" tiene un valor invalido`);
  }

  if (!enums.complexity.has(data.complexity)) {
    errors.push(`${document.filePath}: "complexity" tiene un valor invalido`);
  }

  if (!enums.scope.has(data.scope)) {
    errors.push(`${document.filePath}: "scope" tiene un valor invalido`);
  }

  if (typeof data.user_visible !== "boolean") {
    errors.push(`${document.filePath}: "user_visible" debe ser booleano`);
  }

  validateEnumArray(document, "release_impacts", enums.release_impacts, errors);
  validateEnumArray(document, "architecture_layers", enums.architecture_layers, errors);

  if (typeof data.backend_sensitive !== "boolean") {
    errors.push(`${document.filePath}: "backend_sensitive" debe ser booleano`);
  }

  validateNonEmptyArray(document, "files_touched", errors);
  validateNonEmptyArray(document, "verification", errors);

  if ("related_decisions" in data && !Array.isArray(data.related_decisions)) {
    errors.push(`${document.filePath}: "related_decisions" debe ser un array`);
  }

  if (entryMatch) {
    const [, year, month] = entryMatch;
    const relativeFilePath = toPosixPath(
      path.relative(resolveChangeLogRoot(projectRoot), document.filePath),
    );
    if (!relativeFilePath.startsWith(`entries/${year}/${month}/`)) {
      errors.push(
        `${document.filePath}: la ruta no coincide con el arbol entries/${year}/${month}/`,
      );
    }
  }

  const basename = path.basename(document.filePath);
  if (data.change_id && !basename.startsWith(`${data.change_id}--`)) {
    errors.push(
      `${document.filePath}: el nombre de archivo debe empezar por "${data.change_id}--"`,
    );
  }

  errors.push(
    ...ensureRequiredSections(
      document.body,
      ENTRY_REQUIRED_SECTIONS,
      document.filePath,
    ),
  );

  return errors;
}

function validateGroupDocument(document, projectRoot, config) {
  const patterns = buildPatterns(config);
  const enums = buildEnums(config);
  const errors = [];
  const data = document.data;

  for (const key of GROUP_FRONTMATTER_ORDER) {
    if (!(key in data)) {
      errors.push(`${document.filePath}: falta frontmatter obligatorio "${key}"`);
    }
  }

  const groupMatch = String(data.group_id || "").match(patterns.groupIdPattern);
  if (!groupMatch) {
    errors.push(`${document.filePath}: "group_id" no cumple el formato esperado`);
  } else {
    const [, prefix, year] = groupMatch;
    const expectedType = prefix === "SPR" ? "sprint" : "task";
    if (data.group_type !== expectedType) {
      errors.push(
        `${document.filePath}: "group_type" debe ser "${expectedType}" para ${data.group_id}`,
      );
    }
    const relativeFilePath = toPosixPath(
      path.relative(resolveChangeLogRoot(projectRoot), document.filePath),
    );
    if (!relativeFilePath.startsWith(`groups/${year}/`)) {
      errors.push(
        `${document.filePath}: la ruta no coincide con el arbol groups/${year}/`,
      );
    }
  }

  if (!enums.group_type.has(data.group_type)) {
    errors.push(`${document.filePath}: "group_type" tiene un valor invalido`);
  }

  if (!ISO_DATE_PATTERN.test(String(data.date_start || ""))) {
    errors.push(`${document.filePath}: "date_start" debe tener formato YYYY-MM-DD`);
  }

  if (!ISO_DATE_PATTERN.test(String(data.date_end || ""))) {
    errors.push(`${document.filePath}: "date_end" debe tener formato YYYY-MM-DD`);
  }

  if (
    ISO_DATE_PATTERN.test(String(data.date_start || "")) &&
    ISO_DATE_PATTERN.test(String(data.date_end || "")) &&
    String(data.date_end) < String(data.date_start)
  ) {
    errors.push(`${document.filePath}: "date_end" no puede ser anterior a "date_start"`);
  }

  if (!enums.status.has(data.status)) {
    errors.push(`${document.filePath}: "status" tiene un valor invalido`);
  }

  if (typeof data.title !== "string" || data.title.trim().length === 0) {
    errors.push(`${document.filePath}: "title" no puede estar vacio`);
  }

  if (typeof data.customer !== "string" || data.customer.trim().length === 0) {
    errors.push(`${document.filePath}: "customer" no puede estar vacio`);
  }

  if (!Array.isArray(data.change_ids)) {
    errors.push(`${document.filePath}: "change_ids" debe ser un array`);
  }

  if (data.status === "closed" && Array.isArray(data.change_ids) && data.change_ids.length === 0) {
    errors.push(`${document.filePath}: un grupo closed no puede tener change_ids vacio`);
  }

  errors.push(
    ...ensureRequiredSections(
      document.body,
      GROUP_REQUIRED_SECTIONS,
      document.filePath,
    ),
  );

  return errors;
}

function loadChangeLog(projectRoot = process.cwd()) {
  const changeLogRoot = resolveChangeLogRoot(projectRoot);
  const entriesRoot = path.join(changeLogRoot, "entries");
  const groupsRoot = path.join(changeLogRoot, "groups");

  const entryDocuments = listMarkdownFiles(entriesRoot).map(parseMarkdownDocument);
  const groupDocuments = listMarkdownFiles(groupsRoot).map(parseMarkdownDocument);

  return {
    changeLogRoot,
    entriesRoot,
    groupsRoot,
    entryDocuments,
    groupDocuments,
  };
}

function validateChangeLog(projectRoot = process.cwd()) {
  const config = loadChangeLogConfig(projectRoot);
  const { changeLogRoot, entryDocuments, groupDocuments } = loadChangeLog(projectRoot);
  const patterns = buildPatterns(config);
  const errors = [];
  const warnings = [];

  if (!fs.existsSync(changeLogRoot)) {
    return {
      errors: [`No existe el directorio ${changeLogRoot}`],
      entries: [],
      groups: [],
    };
  }

  const groupIdCounts = new Map();
  const entryIdCounts = new Map();

  for (const group of groupDocuments) {
    const groupId = String(group.data.group_id || "");
    if (groupId) {
      groupIdCounts.set(groupId, (groupIdCounts.get(groupId) || 0) + 1);
    }
  }

  for (const entry of entryDocuments) {
    const changeId = String(entry.data.change_id || "");
    if (changeId) {
      entryIdCounts.set(changeId, (entryIdCounts.get(changeId) || 0) + 1);
    }
  }

  for (const [groupId, count] of groupIdCounts) {
    if (count > 1) {
      warnings.push(`group_id duplicado detectado: ${groupId}`);
    }
  }

  for (const [changeId, count] of entryIdCounts) {
    if (count > 1) {
      warnings.push(`change_id duplicado detectado: ${changeId}`);
    }
  }

  const groupsById = new Map(groupDocuments.map((group) => [group.data.group_id, group]));
  const entriesById = new Map(entryDocuments.map((entry) => [entry.data.change_id, entry]));
  const groupChangeIdsById = new Map();

  for (const group of groupDocuments) {
    errors.push(...validateGroupDocument(group, projectRoot, config));
  }

  for (const entry of entryDocuments) {
    errors.push(...validateEntryDocument(entry, groupsById, projectRoot, config));
  }

  for (const group of groupDocuments) {
    const groupId = group.data.group_id;
    const listedChangeIds = Array.isArray(group.data.change_ids)
      ? group.data.change_ids
      : [];
    const listedChangeIdSet = new Set(listedChangeIds);
    groupChangeIdsById.set(groupId, listedChangeIdSet);

    for (const changeId of listedChangeIds) {
      const entry = entriesById.get(changeId);
      if (!entry) {
        errors.push(
          `${group.filePath}: referencia una entrada inexistente "${changeId}"`,
        );
        continue;
      }

      if (entry.data.group_id !== groupId) {
        errors.push(
          `${group.filePath}: "${changeId}" apunta a "${entry.data.group_id}" y no a "${groupId}"`,
        );
      }
    }
  }

  for (const entry of entryDocuments) {
    const { change_id: changeId, group_id: entryGroupId } = entry.data;

    if (!patterns.entryIdPattern.test(String(changeId || ""))) {
      continue;
    }

    const group = groupsById.get(entryGroupId);
    if (!group) {
      continue;
    }

    const changeIds =
      groupChangeIdsById.get(entryGroupId) ||
      new Set(Array.isArray(group.data.change_ids) ? group.data.change_ids : []);
    if (!changeIds.has(changeId)) {
      errors.push(
        `${entry.filePath}: la entrada no esta referenciada en change_ids de ${entryGroupId}`,
      );
    }
  }

  return {
    errors,
    warnings,
    entries: entryDocuments.sort((a, b) => compareDatesDescending(a, b, "date")),
    groups: groupDocuments.sort((a, b) => compareDatesDescending(a, b, "date_end")),
    config,
  };
}

function buildChangeLogIndex(projectRoot = process.cwd()) {
  const { errors, entries, groups, config } = validateChangeLog(projectRoot);

  if (errors.length > 0) {
    throw new Error(errors.join("\n"));
  }

  const changeLogRoot = resolveChangeLogRoot(projectRoot);
  const indexPath = path.join(changeLogRoot, "index.md");
  const openGroups = groups.filter((group) => group.data.status === "open");
  const closedGroups = groups.filter((group) => group.data.status === "closed");
  const groupsById = new Map(groups.map((group) => [group.data.group_id, group]));

  const lines = [
    "# Change Log Index",
    "",
    `Índice derivado del \`change-log\` repo-only de ${config.projectName}.`,
    "",
    "> Archivo generado automaticamente por `npm run changes:index`.",
    "> No editar a mano.",
    "",
    `- Entradas registradas: ${entries.length}`,
    `- Grupos registrados: ${groups.length}`,
    "",
    "## Ultimos cambios",
  ];

  if (entries.length === 0) {
    lines.push("", "- No hay entradas registradas todavia.");
  } else {
    for (const entry of entries) {
      const entryLink = toPosixPath(path.relative(changeLogRoot, entry.filePath));
      const group = groupsById.get(entry.data.group_id);
      const groupLink = group
        ? toPosixPath(path.relative(changeLogRoot, group.filePath))
        : null;
      const entryCategory = entry.data.category || entry.data.type || "legacy";
      lines.push(
        `- \`${entry.data.date}\` [\`${entry.data.change_id}\`](${entryLink}) - ${entry.data.title} - \`${entryCategory}\`${groupLink ? ` - grupo [\`${entry.data.group_id}\`](${groupLink})` : ""}`,
      );
    }
  }

  lines.push("", "## Grupos abiertos");

  if (openGroups.length === 0) {
    lines.push("", "- No hay grupos abiertos.");
  } else {
    for (const group of openGroups) {
      const groupLink = toPosixPath(path.relative(changeLogRoot, group.filePath));
      const changeCount = Array.isArray(group.data.change_ids) ? group.data.change_ids.length : 0;
      lines.push(
        `- [\`${group.data.group_id}\`](${groupLink}) - ${group.data.title} - ${group.data.date_start} -> ${group.data.date_end} - ${changeCount} cambios`,
      );
    }
  }

  lines.push("", "## Grupos cerrados recientes");

  if (closedGroups.length === 0) {
    lines.push("", "- No hay grupos cerrados.");
  } else {
    for (const group of closedGroups) {
      const groupLink = toPosixPath(path.relative(changeLogRoot, group.filePath));
      const changeCount = Array.isArray(group.data.change_ids) ? group.data.change_ids.length : 0;
      lines.push(
        `- [\`${group.data.group_id}\`](${groupLink}) - ${group.data.title} - ${group.data.date_start} -> ${group.data.date_end} - ${changeCount} cambios`,
      );
    }
  }

  writeFile(indexPath, lines.join("\n"));

  return {
    indexPath,
    entriesCount: entries.length,
    groupsCount: groups.length,
  };
}

function parseCliArgs(argv) {
  const result = {};

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith("--")) {
      continue;
    }

    const key = token.slice(2);
    const nextToken = argv[index + 1];
    if (!nextToken || nextToken.startsWith("--")) {
      result[key] = true;
      continue;
    }

    result[key] = nextToken;
    index += 1;
  }

  return result;
}

function buildEntryTemplate({ changeId, groupId, title, date }) {
  return [
    serializeFrontmatter(
      {
        change_id: changeId,
        date,
        title,
        group_id: groupId,
        category: "frontend",
        subcategories: ["feature"],
        origin: "client-request",
        complexity: "medium",
        scope: "local",
        user_visible: true,
        release_impacts: ["none"],
        architecture_layers: ["docs"],
        backend_sensitive: false,
        files_touched: ["pending/path"],
        verification: ["pending/validation"],
        related_decisions: [],
      },
      ENTRY_FRONTMATTER_ORDER,
    ),
    "",
    "# Resumen corto",
    "",
    "Pendiente completar.",
    "",
    "## Contexto / problema",
    "",
    "Pendiente completar.",
    "",
    "## Cambio realizado",
    "",
    "Pendiente completar.",
    "",
    "## Objetivo",
    "",
    "Pendiente completar.",
    "",
    "## Impacto arquitectonico",
    "",
    "Pendiente completar.",
    "",
    "## Desglose denso",
    "",
    "Pendiente completar.",
    "",
    "## Validacion",
    "",
    "Pendiente completar.",
    "",
    "## Pendientes / limites",
    "",
    "Pendiente completar.",
    "",
    "## Notas para presupuesto",
    "",
    "Pendiente completar.",
  ].join("\n");
}

function buildGroupTemplate({
  groupId,
  groupType,
  title,
  dateStart,
  dateEnd,
  status,
  customer,
}) {
  return [
    serializeFrontmatter(
      {
        group_id: groupId,
        group_type: groupType,
        title,
        date_start: dateStart,
        date_end: dateEnd,
        status,
        customer,
        change_ids: [],
      },
      GROUP_FRONTMATTER_ORDER,
    ),
    "",
    "# Resumen",
    "",
    "Pendiente completar.",
    "",
    "## Objetivo del grupo",
    "",
    "Pendiente completar.",
    "",
    "## Cambios incluidos",
    "",
    "Pendiente completar.",
    "",
    "## Impacto en arquitectura / producto",
    "",
    "Pendiente completar.",
    "",
    "## Validacion agregada",
    "",
    "Pendiente completar.",
    "",
    "## Riesgos o arrastres",
    "",
    "Pendiente completar.",
    "",
    "## Notas para presupuesto",
    "",
    "Pendiente completar.",
  ].join("\n");
}

function rewriteDocument(filePath, data, orderedKeys, body) {
  const content = `${serializeFrontmatter(data, orderedKeys)}\n\n${body.trim()}\n`;
  writeFile(filePath, content);
}

function appendChangeIdToGroup(projectRoot, groupId, changeId) {
  const { groupDocuments } = loadChangeLog(projectRoot);
  const groupDocument = groupDocuments.find((group) => group.data.group_id === groupId);

  assert(groupDocument, `No existe el grupo ${groupId}`);

  const nextChangeIds = Array.isArray(groupDocument.data.change_ids)
    ? [...groupDocument.data.change_ids]
    : [];

  if (!nextChangeIds.includes(changeId)) {
    nextChangeIds.push(changeId);
  }

  rewriteDocument(
    groupDocument.filePath,
    {
      ...groupDocument.data,
      change_ids: nextChangeIds,
    },
    GROUP_FRONTMATTER_ORDER,
    groupDocument.body,
  );
}

function createChangeGroup({
  projectRoot = process.cwd(),
  groupId,
  groupType,
  title,
  dateStart,
  dateEnd,
  status = "open",
  customer,
}) {
  const config = loadChangeLogConfig(projectRoot);
  const patterns = buildPatterns(config);
  const enums = buildEnums(config);

  assert(
    patterns.groupIdPattern.test(groupId || ""),
    `"groupId" no tiene un formato valido`,
  );
  assert(
    enums.group_type.has(groupType),
    `"groupType" debe ser "sprint" o "task"`,
  );
  assert(
    ISO_DATE_PATTERN.test(dateStart || ""),
    `"dateStart" debe tener formato YYYY-MM-DD`,
  );
  assert(
    ISO_DATE_PATTERN.test(dateEnd || ""),
    `"dateEnd" debe tener formato YYYY-MM-DD`,
  );
  assert(enums.status.has(status), `"status" debe ser "open" o "closed"`);
  assert(typeof title === "string" && title.trim(), `"title" es obligatorio`);

  const finalCustomer = customer || config.customerDefault;
  assert(
    typeof finalCustomer === "string" && finalCustomer.trim(),
    `"customer" es obligatorio`,
  );

  const [, prefix, year] = groupId.match(patterns.groupIdPattern);
  const expectedType = prefix === "SPR" ? "sprint" : "task";
  assert(
    groupType === expectedType,
    `El prefijo de ${groupId} exige groupType "${expectedType}"`,
  );

  const filePath = path.join(resolveChangeLogRoot(projectRoot), "groups", year, `${groupId}.md`);
  assert(!fs.existsSync(filePath), `Ya existe ${filePath}`);

  ensureDirectory(path.dirname(filePath));
  writeFile(
    filePath,
    buildGroupTemplate({
      groupId,
      groupType,
      title,
      dateStart,
      dateEnd,
      status,
      customer: finalCustomer,
    }),
  );

  return filePath;
}

function createChangeEntry({
  projectRoot = process.cwd(),
  changeId,
  groupId,
  title,
  slug,
}) {
  const config = loadChangeLogConfig(projectRoot);
  const patterns = buildPatterns(config);

  const changeMatch = (changeId || "").match(patterns.entryIdPattern);
  assert(changeMatch, `"changeId" no tiene un formato valido`);
  assert(
    patterns.groupIdPattern.test(groupId || ""),
    `"groupId" no tiene un formato valido`,
  );
  assert(typeof title === "string" && title.trim(), `"title" es obligatorio`);
  assert(SLUG_PATTERN.test(slug || ""), `"slug" debe estar en kebab-case`);

  const { groupDocuments } = loadChangeLog(projectRoot);
  const groupExists = groupDocuments.some((group) => group.data.group_id === groupId);
  assert(groupExists, `No existe el grupo ${groupId}`);

  const [, year, month, day] = changeMatch;
  const date = `${year}-${month}-${day}`;
  const filePath = path.join(
    resolveChangeLogRoot(projectRoot),
    "entries",
    year,
    month,
    `${changeId}--${slug}.md`,
  );

  assert(!fs.existsSync(filePath), `Ya existe ${filePath}`);

  ensureDirectory(path.dirname(filePath));
  writeFile(filePath, buildEntryTemplate({ changeId, groupId, title, date }));
  appendChangeIdToGroup(projectRoot, groupId, changeId);

  return filePath;
}

module.exports = {
  parseCliArgs,
  validateChangeLog,
  buildChangeLogIndex,
  createChangeEntry,
  createChangeGroup,
};
