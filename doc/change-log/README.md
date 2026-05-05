# Change Log

Subsistema canónico y repo-only para registrar entregas lógicas realizadas en Nebula Studios.

## Objetivo

- registrar qué se entregó realmente, no qué commits existen
- permitir auditoría posterior por `task` o `sprint`
- servir como base para presupuestación, seguimiento y cierre de alcance sin depender del vault

## Configuración

La configuración vive en `doc/change-log/config.json`.

Campos mínimos:

- `projectName`
- `projectCode`
- `customerDefault`
- enums permitidos para clasificación

Configuración actual del proyecto:

- `projectName`: `Nebula Studios`
- `projectCode`: `NBS`

## Estructura

```text
doc/change-log/
├── README.md
├── config.json
├── index.md
├── entries/
│   └── YYYY/
│       └── MM/
│           └── <PROJECT_CODE>-CHG-YYYY-MM-DD-NNN--slug.md
└── groups/
    └── YYYY/
        ├── <PROJECT_CODE>-SPR-YYYY-NNN.md
        └── <PROJECT_CODE>-TSK-YYYY-NNN.md
```

## Reglas cerradas

- cada entrega lógica repo-tracked debe vivir en exactamente una entrada
- cada entrada debe pertenecer a exactamente un grupo facturable
- cada grupo puede ser `sprint` o `task`
- `index.md` es derivado y se genera por script; no se edita a mano
- este sistema no sustituye `.agents/decisions-log.md`
- antes de operar sobre el subsistema, se debe verificar la fecha real actual del sistema

## Contrato de entradas

Frontmatter obligatorio:

- `change_id`
- `date`
- `title`
- `group_id`
- `category`
- `subcategories`
- `origin`
- `complexity`
- `scope`
- `user_visible`
- `release_impacts`
- `architecture_layers`
- `backend_sensitive`
- `files_touched`
- `verification`
- `related_decisions` opcional

Secciones obligatorias del cuerpo:

- `# Resumen corto`
- `## Contexto / problema`
- `## Cambio realizado`
- `## Objetivo`
- `## Impacto arquitectónico`
- `## Desglose denso`
- `## Validación`
- `## Pendientes / límites`
- `## Notas para presupuesto`

## Contrato de grupos

Frontmatter obligatorio:

- `group_id`
- `group_type`
- `title`
- `date_start`
- `date_end`
- `status`
- `customer`
- `change_ids`

Secciones obligatorias del cuerpo:

- `# Resumen`
- `## Objetivo del grupo`
- `## Cambios incluidos`
- `## Impacto en arquitectura / producto`
- `## Validación agregada`
- `## Riesgos o arrastres`
- `## Notas para presupuesto`

## Scripts

- `npm run changes:group:new`
- `npm run changes:entry:new`
- `npm run changes:validate`
- `npm run changes:index`
- `npm run changes:sync`

## Flujo mínimo

1. verifica la fecha real actual del sistema
2. si falta `groups/YYYY/` o `entries/YYYY/MM/` para esa fecha, crea los directorios antes de escribir
3. identifica el `group_id` activo antes de empezar
4. si no existe, crea el grupo primero
5. crea una entrada nueva solo si la entrega lógica es distinta de una ya abierta
6. si sigues trabajando sobre la misma entrega, actualiza la misma entrada
7. al cerrar la tarea, ejecuta `npm run changes:sync`
