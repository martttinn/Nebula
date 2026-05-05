---
description: pasos mínimos antes de empezar cualquier tarea en Nebula Studios
---

## 0. Si Martín abre el hilo con `init`

1. ejecuta `workflows/init-context.md`
2. trata esa inicialización como inspección read-only por defecto
3. devuelve un informe de contexto con repo, backend live si existe, vault, drift detectado y bloqueos
4. si junto a `init` Martín añade un objetivo concreto, primero completa el bootstrap y después continúa con ese objetivo
5. si `init` llega solo, detente tras el informe y espera la siguiente instrucción

## 0.1. Si Martín abre el hilo con `cleanup`

1. ejecuta `workflows/cleanup-audit.md`
2. trata esa auditoría como inspección read-only por defecto
3. devuelve un informe de higiene con hallazgos priorizados, riesgo, coste y candidatos de borrado seguro
4. si junto a `cleanup` Martín añade un objetivo concreto, primero completa la auditoría y después continúa solo con la limpieza segura directamente ligada a ese objetivo
5. si `cleanup` llega solo, detente tras el informe y espera la siguiente instrucción

## 1. Carga las reglas base

1. `rules/00-operating-mode.md`
2. `rules/01-project-context.md`

## 2. Selecciona un rol principal

| Rol | Úsalo cuando... |
| --- | --- |
| `roles/00-role-senior-developer.md` | implementar, refactorizar, depurar, extender |
| `roles/01-role-architecture-audit.md` | revisar estructura, boundaries, deuda o refactor |
| `roles/02-role-performance-audit.md` | analizar LCP, CLS, bundle, renders, hidratación o coste visual |
| `roles/03-role-security-review.md` | auth, datos, secretos, exposición o backend sensible |
| `roles/04-role-product-strategy.md` | priorización, alcance, MVP, trade-offs negocio/tech |
| `roles/05-role-seo-strategy.md` | SEO técnico, discoverability, semántica, entidades, captación y conversión orgánica |
| `roles/06-role-copywriter.md` | copy comercial, hooks, landings, emails, anuncios y piezas de conversión |
| `roles/07-role-frontend-developer.md` | interfaces premium, motion, sistemas visuales, interacciones avanzadas y frontend de alto impacto |

## 3. Carga las reglas técnicas aplicables

- Toca App Router, UI web, runtime o boundaries server/client → `rules/03-nextjs-web-rules.md`
- Toca backend, auth, contratos de datos o integraciones sensibles → `rules/04-supabase-and-data-rules.md`
- Toca marketing, metadata, schema, CTA o narrativa pública → `rules/05-marketing-seo-and-conversion-rules.md`
- Toca validación, release, documentación o change log → `rules/06-testing-release-and-docs-rules.md`
- Toca convenciones de implementación, estructura o code style → `rules/07-code-style-and-implementation-rules.md`

## 4. Lee los archivos realmente implicados

No asumas el comportamiento actual. Lee el código afectado.

## 4.1. Identifica el grupo facturable activo

- localiza el `group_id` activo en `doc/change-log/groups/`
- si no existe ninguno que encaje, crea uno nuevo antes de cerrar la tarea
- si la tarea continúa una entrega lógica existente, reutiliza su entrada en vez de crear otra

## 4.2. Si la tarea puede tocar documentación o conocimiento operativo

- decide si el cambio afecta también al vault de Obsidian
- si afecta, entra primero por `filesystem`, lista el root del vault y lee su `AGENTS.md`
- después ejecuta `workflows/obsidian-vault-sync.md`
- si estás creando documentación de una zona no verificada, identifica antes qué hechos faltan y pregúntalos a Martín

## 4.3. Si prevés revertir parte del worktree

- inspecciona primero el estado completo del worktree
- identifica si hay cambios ajenos o no relacionados con tu tarea
- si los hay, no hagas una reversión global

## 4.4. Si la tarea crea una surface nueva o toca una surface pública importante

- decide antes de implementar qué partes deben renderizarse en server y cuáles en client
- revisa desde el inicio responsive, accesibilidad, semántica, rendimiento y conversión
- si hay motion, observers o componentes pesados, planifica coste de bundle, hidratación y carga
- si ya ves riesgo de jank o peso visual excesivo, carga también `roles/02-role-performance-audit.md`
- si la surface afecta discoverability, semántica o captación, carga también `roles/05-role-seo-strategy.md`
- si el problema principal es dirección visual, motion, micro-interacciones, storytelling scroll, sistemas de componentes o WebGL/Three.js, carga también `roles/07-role-frontend-developer.md`

## 4.5. Si la tarea toca facts visibles al público

- verifica especialmente dominio, email, dirección, años, testimonios, clientes y claims comerciales
- si no puedes confirmar un dato sensible, no lo consolides como canon

## 4.6. Si la tarea toca backend live o contratos de datos

- identifica si realmente existe una capa backend repo-local para tocar o si habría que introducirla
- si depende del estado actual de un proyecto live, planifica verificación por MCP
- si sabes que no podrás dejar artefactos repo-safe consistentes con el runtime real, marca el alcance como parcial antes de implementar

## 4.7. Si la tarea toca dependencias o tooling

- carga `.agents/skills/dependency-audit/SKILL.md`
- sigue `.agents/workflows/dependency-audit.md`
- trata la revisión como read-only por defecto salvo petición explícita de cambios

## 5. Si el cambio toca backend sensible: pide confirmación antes de editar

Ver `rules/00-operating-mode.md` y `rules/04-supabase-and-data-rules.md`.

## 6. Al cerrar la tarea

- deja claro qué cambió, qué verificaste y qué no pudiste verificar
- si cambió comportamiento, contratos, seguridad, arquitectura, SEO o posicionamiento: actualiza `doc/` y los archivos `.agents/` afectados
- si durante la tarea detectaste un fallo transversal, pregunta antes de cerrar si Martín quiere convertirlo en regla o decisión explícita
- antes de crear o actualizar artefactos en `doc/change-log/`, verifica la fecha real actual del sistema
- crea o actualiza la entrada correspondiente en `doc/change-log/entries/`
- verifica la reciprocidad con `doc/change-log/groups/`
- ejecuta `npm run changes:sync`
- si el cambio tiene impacto documental persistente, sincroniza también el vault
- verifica que `AGENTS.md` siga alineado con `.agents/`
