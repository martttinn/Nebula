# Nebula Studios Agent System

Este directorio centraliza el sistema de reglas para agentes de IA que trabajen sobre el proyecto.

## Estructura

- `rules/`: reglas base y reglas técnicas del proyecto
- `roles/`: roles principales desde los que encuadrar cada tarea
- `workflows/`: flujos de trabajo para tareas frecuentes
- `skills/`: skills repo-local versionadas junto al proyecto
- `decisions-log.md`: registro de decisiones duraderas
- `../DESIGN.md`: sistema visual canónico del repo
- `../doc/change-log/`: registro repo-only de entregas y grupos

## Carga mínima obligatoria

1. `rules/00-operating-mode.md`
2. `rules/01-project-context.md`

## Selección de rol

Carga después un rol principal:

- `roles/00-role-senior-developer.md`
- `roles/01-role-architecture-audit.md`
- `roles/02-role-performance-audit.md`
- `roles/03-role-security-review.md`
- `roles/04-role-product-strategy.md`
- `roles/05-role-seo-strategy.md`
- `roles/06-role-copywriter.md`
- `roles/07-role-frontend-developer.md`

## Reglas técnicas según área

Carga solo las que apliquen a la tarea:

- `rules/03-nextjs-web-rules.md` — App Router, UI web, runtime y boundaries server/client
- `rules/04-supabase-and-data-rules.md` — datos, backend sensible, auth, contratos y Supabase
- `rules/05-marketing-seo-and-conversion-rules.md` — narrativa pública, SEO técnico, posicionamiento y captación
- `rules/06-testing-release-and-docs-rules.md` — validación, release, documentación y change-log
- `rules/07-code-style-and-implementation-rules.md` — convenciones de implementación y estructura

## Politica canónica de `components/home`

- cada sección pública sustancial de la home vive en su propia carpeta
- el entrypoint público de cada carpeta es `index.tsx`
- las páginas deben consumir la sección por su path canónico de directorio
- `components/home/*.tsx` no es el estado objetivo para secciones complejas; solo se acepta como compatibilidad transitoria en migraciones explícitas
- breakdown preferido dentro de cada sección:
  - `index.tsx`
  - `primitives.tsx`
  - `constants.ts`
  - `types.ts`
  - `content.ts` cuando aplique
  - `geometry.ts` o `path.ts` cuando haya cálculo puro

## Otros recursos

- `workflows/init-context.md` — bootstrap canónico para hilos nuevos cuando Martín use el trigger `init`
- `workflows/cleanup-audit.md` — auditoría canónica de higiene técnica cuando Martín use el trigger `cleanup`
- `workflows/task-start.md` — pasos mínimos antes de empezar una tarea
- `workflows/commit-workflow.md` — secuencia para revisar el worktree, agrupar cambios por semántica/scope y ejecutar commits separados
- `workflows/change-log-update.md` — reglas de creación, reutilización y cierre de entradas del `change-log`
- `workflows/obsidian-vault-sync.md` — flujo para leer y sincronizar el vault, priorizando `filesystem`
- `workflows/dependency-audit.md` — flujo para auditar dependencias, vulnerabilidades y drift
- `skills/dependency-audit/` — skill repo-local para revisiones de salud de dependencias y planificación de upgrades
- `skills/ui-ux-pro-max/` — skill repo-local para diseño, layout, color, motion y UX en superficies premium
- `skills/README.md` — inventario y procedencia de skills repo-local versionadas en el repo
- `decisions-log.md` — registro cronológico de decisiones técnicas y de negocio
- `../DESIGN.md` — fuente de verdad visual para agentes y tooling; debe vivir en raíz
- `../doc/README.md` — índice maestro del árbol documental y precedencia entre fuentes canónicas
- `../doc/change-log/README.md` — contrato del sistema repo-only de logging de cambios

## Regla crítica para documentación

Si el agente crea documentación para una zona del sistema que no conoce con hechos verificados, debe preguntarle primero a Martín por los huecos importantes. Si esa información no se cierra todavía, el documento debe dejarla como pendiente o incompleta, nunca asumirla como canónica.

Regla crítica adicional para backend:

- si una tarea modifica backend real o su contrato operativo, la superficie repo-safe correspondiente debe actualizarse en la misma tarea
- si todavía no existe una capa backend versionada en el repo, el agente debe dejar el límite explícito y no vender una paridad inexistente

Regla crítica adicional para scripts y SQL:

todo script, archivo SQL o artefacto operativo similar nuevo o modificado de forma relevante debe autodescribirse con una cabecera breve que explique qué es y para qué sirve en el proyecto. Si el formato no admite comentarios, esa explicación debe quedar en el artefacto hermano más cercano.

Regla crítica adicional para diseño:

si el repo usa `DESIGN.md`, cualquier cambio que altere de forma reutilizable identidad visual, tokens o componentes base debe reflejarse allí en la misma tarea. `DESIGN.md` no sustituye al código implementado, pero sí define el canon visual al que ese código debe tender.
