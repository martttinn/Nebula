# Nebula Studios Agent System

> Estado documental:
>
> - Documento canónico de bootstrap para agentes.
> - Si `AGENTS.md` y `.agents/**` discrepan, prevalecen las reglas específicas en `.agents/`.
> - `DESIGN.md` define el canon visual reutilizable y debe leerse cuando la tarea toque UI, branding o motion.

Este repositorio usa un sistema modular para agentes en `.agents/`. La estructura activa es:

```text
DESIGN.md
.agents/
├── README.md
├── decisions-log.md
├── skills/
│   ├── README.md
│   ├── dependency-audit/
│   └── ui-ux-pro-max/
├── roles/
│   ├── 00-role-senior-developer.md
│   ├── 01-role-architecture-audit.md
│   ├── 02-role-performance-audit.md
│   ├── 03-role-security-review.md
│   ├── 04-role-product-strategy.md
│   ├── 05-role-seo-strategy.md
│   ├── 06-role-copywriter.md
│   └── 07-role-frontend-developer.md
├── rules/
│   ├── 00-operating-mode.md
│   ├── 01-project-context.md
│   ├── 03-nextjs-web-rules.md
│   ├── 04-supabase-and-data-rules.md
│   ├── 05-marketing-seo-and-conversion-rules.md
│   ├── 06-testing-release-and-docs-rules.md
│   └── 07-code-style-and-implementation-rules.md
└── workflows/
    ├── init-context.md
    ├── cleanup-audit.md
    ├── task-start.md
    ├── commit-workflow.md
    ├── dependency-audit.md
    ├── change-log-update.md
    └── obsidian-vault-sync.md
```

## Qué contiene cada parte

- `.agents/README.md`: mapa resumido del sistema y de su carga mínima.
- `.agents/decisions-log.md`: decisiones duraderas de arquitectura, producto, SEO, diseño y operación.
- `.agents/skills/`: skills repo-local versionadas junto al proyecto.
- `.agents/rules/`: reglas base obligatorias y reglas técnicas del repo.
- `.agents/roles/`: rol principal desde el que debe encuadrarse cada tarea.
- `.agents/workflows/`: flujos operativos para tareas frecuentes.
- `DESIGN.md`: sistema visual canónico para agentes y humanos.
- `doc/change-log/`: registro canónico repo-only de entregas lógicas.
- `doc/reference/`: referencia técnica y de dominio mínima del proyecto.

## Orden obligatorio de lectura

Todo agente debe cargar siempre estas reglas base:

1. `.agents/rules/00-operating-mode.md`
2. `.agents/rules/01-project-context.md`

Después debe cargar un rol principal según la tarea:

- `.agents/roles/00-role-senior-developer.md`
- `.agents/roles/01-role-architecture-audit.md`
- `.agents/roles/02-role-performance-audit.md`
- `.agents/roles/03-role-security-review.md`
- `.agents/roles/04-role-product-strategy.md`
- `.agents/roles/05-role-seo-strategy.md`
- `.agents/roles/06-role-copywriter.md`
- `.agents/roles/07-role-frontend-developer.md`

Y por último las reglas técnicas aplicables:

- `.agents/rules/03-nextjs-web-rules.md`
- `.agents/rules/04-supabase-and-data-rules.md`
- `.agents/rules/05-marketing-seo-and-conversion-rules.md`
- `.agents/rules/06-testing-release-and-docs-rules.md`
- `.agents/rules/07-code-style-and-implementation-rules.md`

Si la tarea toca UI, branding, motion, diseño de componentes, landings o sistema visual, carga además `DESIGN.md`.

## Recursos complementarios

- `.agents/workflows/task-start.md`: secuencia mínima antes de empezar cualquier tarea.
- `.agents/workflows/init-context.md`: bootstrap read-only cuando Martín use el trigger `init`.
- `.agents/workflows/cleanup-audit.md`: auditoría read-only de higiene técnica cuando Martín use el trigger `cleanup`.
- `.agents/workflows/commit-workflow.md`: cómo revisar el worktree, separar grupos semánticos y commitear.
- `.agents/workflows/dependency-audit.md`: cómo auditar dependencias sin convertir la auditoría en un upgrade automático.
- `.agents/workflows/change-log-update.md`: reglas para crear, reutilizar y cerrar entradas del `change-log`.
- `.agents/workflows/obsidian-vault-sync.md`: flujo obligatorio cuando una tarea tenga impacto documental persistente fuera del repo.
- `.agents/skills/README.md`: inventario y procedencia de skills repo-local.
- `.agents/decisions-log.md`: memoria operativa duradera del proyecto.
- `DESIGN.md`: fuente de verdad visual para colores, tipografía, espaciado, composición y primitives reutilizables.
- `doc/README.md`: índice maestro del árbol documental del repo.
- `doc/reference/technical-reference.md`: referencia técnica mínima del proyecto.
- `doc/reference/domain-reference.md`: invariantes y contratos de dominio.
- `doc/change-log/README.md`: contrato del subsistema de logging repo-only.

## Cómo seleccionar rol

- Usa `00-role-senior-developer` para implementar, refactorizar, depurar o extender código.
- Usa `01-role-architecture-audit` para revisar boundaries, modularidad, deuda estructural o planes de evolución.
- Usa `02-role-performance-audit` para analizar coste de render, bundle, hidratación, jank o cuellos de botella.
- Usa `03-role-security-review` para auth, secretos, permisos, exposición de datos o backend sensible.
- Usa `04-role-product-strategy` para priorización, alcance, MVP y trade-offs negocio/tech.
- Usa `05-role-seo-strategy` para SEO técnico, semántica, entidades, captación orgánica y conversión.
- Usa `06-role-copywriter` para copy comercial, hooks, landings, anuncios, emails, CTAs y piezas centradas en conversión.
- Usa `07-role-frontend-developer` para interfaces premium, motion, diseño de sistemas visuales, interacciones avanzadas y frontend de alto impacto.

Si una tarea mezcla varios roles, elige uno como principal y usa los demás solo como apoyo.

## Trigger `init`

- Si Martín escribe exactamente `init` o lo usa de forma inequívoca como comando de arranque, ejecuta `.agents/workflows/init-context.md` antes de proponer o implementar nada.
- Ese bootstrap es read-only por defecto: sirve para cargar contexto del repo, del posible backend live y del vault, no para editar superficies sensibles.
- Si alguna fuente no está disponible, continúa con las demás y reporta el bloqueo con fecha exacta y alcance afectado.

## Trigger `cleanup`

- Si Martín escribe exactamente `cleanup` o lo usa de forma inequívoca como comando de higiene, ejecuta `.agents/workflows/cleanup-audit.md` antes de proponer borrados o refactors de saneamiento.
- Esa auditoría es read-only por defecto: sirve para detectar basura probable, drift factual, duplicación estructural y tooling degradado antes de tocar superficies reales.
- Si `cleanup` llega solo, devuelve el informe y espera la siguiente instrucción.
- Si `cleanup` llega con un objetivo concreto, primero completa la auditoría y después continúa solo con la limpieza segura directamente relacionada con ese objetivo.

## Reglas duras

- Si hay ambigüedad funcional, de UX, de naming, SEO o de negocio que cambie comportamiento real, pregunta antes de asumir.
- Si el agente documenta una zona sin hechos verificados, debe dejar huecos como `pendiente` o `por confirmar`; no debe inventar canon.
- Si Martín pide un mensaje de commit o que el agente haga un commit, sigue `.agents/workflows/commit-workflow.md`.
- Si una tarea toca backend sensible, auth, contratos de datos o secretos, pide confirmación explícita antes de editar.
- Si una tarea crea o cambia una capa backend real, el repo debe reflejar ese estado de forma repo-safe en el mismo scope tocado; no se da por cerrada una tarea con drift consciente entre runtime real y artefactos versionados.
- Si existe `DESIGN.md` y la tarea toca UI o branding, el agente debe cargarlo y tratar sus tokens YAML como valores normativos y su prose como guía de intención.
- Si una tarea cambia identidad visual, tokens, shapes, spacing, tipografía, componentes base o guardrails de diseño reutilizables, `DESIGN.md` debe actualizarse en la misma tarea.
- Si una tarea debe leer o escribir en el vault de Obsidian, prioriza siempre `filesystem`; usa el MCP de Obsidian solo como fallback.
- Los comentarios de código y comentarios internos del repo deben escribirse en español por defecto, salvo coherencia local o requisito externo.
- Si el agente detecta un fallo claro o un patrón evitable, debe preguntar a Martín si quiere convertirlo en una regla o decisión duradera.
- Si una tarea, documento o propuesta menciona dependencias concretas, el agente debe comprobar primero si están instaladas en el proyecto actual; si faltan y serían necesarias, debe preguntar a Martín cuáles quiere instalar antes de tocar manifiestos o lockfiles.
- Si una tarea revela una primitive o shell base reutilizable, el agente debe evaluar extraerla antes de duplicar estructura.
- En `components/home/`, cada sección pública sustancial debe vivir en su carpeta canónica con `index.tsx` como entrypoint; las páginas deben consumir ese path de directorio y no mantener wrappers indefinidos en la raíz.
- Las fachadas de compatibilidad en `components/home/*.tsx` solo se permiten como transición explícita; deben retirarse al cerrar la migración salvo instrucción contraria de Martín.
- Todo script, SQL o artefacto operativo similar nuevo o modificado de forma relevante debe incluir una cabecera breve que explique qué es y para qué sirve.
- Si el worktree está sucio, nunca reviertas de forma global: aísla primero tus cambios de los ajenos.

## Notas operativas

- Este repo es hoy una web pública de marketing para Nebula Studios, centrada en posicionamiento premium, claridad técnica y captación cualificada.
- No existe a fecha `2026-05-03` una capa backend live verificada ni un canal comercial live conectado.
- Sí existe un bootstrap repo-safe de Supabase (`lib/supabase/**` + `supabase/**`) para evolución futura, pero no debe confundirse con un backend funcional ya desplegado.
- React Doctor forma parte del stack operativo como diagnóstico bajo demanda vía `npx react-doctor@latest`; no está instalado en `package.json` y sus hallazgos deben verificarse antes de convertirlos en cambios.
- Las herramientas bajo demanda vía `npx <paquete>@...` no deben confundirse con dependencias instaladas; si el uso pasa a requerir integración persistente, hay que confirmarlo antes con Martín.
- Si una tarea toca la superficie pública, trata SEO, semántica, conversión, accesibilidad y rendimiento como requisitos funcionales, no como extras.
- `DESIGN.md` debe vivir en la raíz del repo para maximizar discoverability entre herramientas y agentes; no lo escondas dentro de `doc/`.
- Si `DESIGN.md` y la UI actual divergen, trátalo como drift explícito: el código describe el runtime actual y `DESIGN.md` el objetivo visual canónico.
- Si la documentación y el código discrepan, toma el código ejecutado como verdad operativa y deja constancia de la discrepancia.
