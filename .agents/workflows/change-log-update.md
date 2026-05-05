---
description: flujo para crear, reutilizar y cerrar entradas del change log canónico del repo
---

# Workflow - Change Log Update

## 0. Verifica fecha real y prepara el árbol

Antes de crear, mover o actualizar cualquier entrada o grupo del `change-log`:

- comprueba la fecha real actual del sistema
- usa esa fecha para decidir `date`, `date_start`, `date_end` y la carpeta destino
- si falta el año actual en `doc/change-log/groups/YYYY/`, créalo antes de continuar
- si falta el año o el mes actual en `doc/change-log/entries/YYYY/MM/`, créalos antes de continuar

## 1. Decide si hace falta una entrada nueva

Crea una entrada nueva cuando:

- la entrega tiene objetivo distinto al de una entrada ya abierta
- el cambio introduce una feature, fix, refactor o rediseño con entidad propia
- el alcance ya no cabe razonablemente dentro de la narrativa de una entrada existente

Reutiliza una entrada existente cuando:

- sigues iterando sobre la misma entrega lógica
- el objetivo, la justificación y el grupo facturable siguen siendo los mismos
- solo estás ampliando validación, cerrando flecos o completando el mismo cambio

## 2. Clasifica la entrada

### category

- `frontend`
- `backend`
- `fullstack`
- `infra`
- `docs`

### origin

- `client-request`
- `internal-improvement`
- `operational-fix`

### complexity

- `low`
- `medium`
- `high`

### scope

- `local`
- `cross-cutting`
- `systemic`

## 3. Rellena Notas para presupuesto

Incluye como mínimo:

- por qué el cambio tiene peso facturable
- si el valor es visible al usuario o principalmente estructural
- si hay mezcla de feature, deuda técnica, hardening o tooling

## 4. Cierra la reciprocidad

- la entrada debe apuntar a un `group_id` existente
- el grupo debe listar ese `change_id` en `change_ids`
- no cierres el grupo si `npm run changes:validate` falla

## 5. Si la entrega toca backend real

- deja explícito qué superficie backend se actualizó
- si todavía no existe una capa repo-safe equivalente, documenta el límite
- no redactes una entrada backend como cerrada si hay drift consciente no resuelto en el scope tocado

## 6. Sincroniza el índice

Al terminar:

1. `npm run changes:validate`
2. `npm run changes:index`
3. o directamente `npm run changes:sync`

## 7. Si faltan hechos para documentar la entrega

- no cierres la narrativa con hechos asumidos
- pregunta a Martín los huecos relevantes antes de dar por buena la entrada o la documentación asociada
- si Martín prefiere no responder todavía, deja el punto marcado como `pendiente`, `incompleto` o `por confirmar`
