---
description: bootstrap canónico de contexto para hilos nuevos cuando Martín use el trigger `init`
---

# Workflow - Init Context

## Objetivo

Convertir `init` en un arranque operativo fiable para un hilo nuevo de Nebula Studios. El resultado esperado es que el agente quede contextualizado con:

- estado real del repo
- contexto documental mínimo
- estado del posible backend live, si existe
- estado del vault de Obsidian

## Alcance y límites

- por defecto es **read-only**
- no autoriza editar backend, vault ni otras superficies sensibles solo por haber corrido `init`
- si detectas drift o huecos, repórtalos; solo corrígelos después si Martín lo pide

## Secuencia obligatoria

### 1. Carga mínima del sistema de agentes

Lee siempre:

1. `rules/00-operating-mode.md`
2. `rules/01-project-context.md`
3. `roles/01-role-architecture-audit.md` como rol principal por defecto

Carga además:

- `rules/03-nextjs-web-rules.md`
- `rules/05-marketing-seo-and-conversion-rules.md`
- `rules/06-testing-release-and-docs-rules.md`

Si el objetivo adjunto al hilo ya deja claro que después tocarás implementación, carga también `roles/00-role-senior-developer.md` y `rules/07-code-style-and-implementation-rules.md`.

### 2. Inspección mínima del repo

Antes de concluir nada:

1. revisa el worktree real (`git status`)
2. inspecciona la estructura top-level del repo
3. contrasta `package.json`, `tsconfig.json`, `next.config.mjs` y `tailwind.config.cjs`
4. localiza las superficies dueñas del sistema:
   - `app/`
   - `components/`
   - `data/`
   - `lib/`
   - `.agents/`
   - `DESIGN.md`
   - `doc/`
   - `scripts/`
5. lee la documentación mínima:
   - `README.md`
   - `AGENTS.md`
   - `DESIGN.md`
   - `doc/README.md`
   - `doc/reference/technical-reference.md`
   - `doc/reference/domain-reference.md`
   - `.agents/decisions-log.md`

### 3. Verificación opcional pero obligatoria si hay backend real

Si el repo o la tarea apuntan a un backend live real:

1. usa el canal primario adecuado, con preferencia por MCP o fuente oficial cuando aplique
2. verifica fecha exacta, estado real y superficie afectada
3. no simules contexto backend si no hay evidencia accesible

Si no hay backend repo-local ni evidencia de backend live para el scope del hilo, dilo explícitamente.

### 4. Verificación del vault

Entra por `filesystem` y sigue este mínimo:

1. lista el root del vault
2. lee `AGENTS.md` del vault
3. localiza la nota del proyecto Nebula Studios o la más cercana por nombre
4. contrasta el vault contra:
   - código real del repo
   - documentación canónica del repo
   - backend verificado si aplica

Si detectas drift, clasifícalo como:

- factual
- operativo
- histórico tolerable
- pendiente de verificación

### 5. Salida esperada tras `init`

La respuesta al usuario debe dejar claro:

1. qué verificaste realmente en repo, backend live si aplica y vault
2. fecha exacta de la verificación
3. drift detectado o ausencia de drift relevante
4. drift visual entre `DESIGN.md` y la UI actual, si aplica
5. riesgos o límites de verificación
6. qué contexto quedó cargado para el resto del hilo
