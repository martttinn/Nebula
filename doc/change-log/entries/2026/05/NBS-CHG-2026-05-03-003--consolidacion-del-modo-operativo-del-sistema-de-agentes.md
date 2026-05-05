---
change_id: NBS-CHG-2026-05-03-003
date: 2026-05-03
title: Consolidación del modo operativo del sistema de agentes en una sola regla
group_id: NBS-TSK-2026-003
category: docs
subcategories:
  - refactor
  - ops
origin: client-request
complexity: low
scope: cross-cutting
user_visible: false
release_impacts:
  - none
architecture_layers:
  - docs
  - tooling
backend_sensitive: false
files_touched:
  - AGENTS.md
  - .agents/README.md
  - .agents/rules/00-operating-mode.md
  - .agents/rules/02-agent-operating-rules.md
  - .agents/workflows/init-context.md
  - .agents/workflows/task-start.md
  - .agents/decisions-log.md
  - doc/change-log/**
verification:
  - rg -n "02-agent-operating-rules|rules/00-operating-mode.md" AGENTS.md .agents doc
  - revisión manual de coherencia documental
related_decisions:
  - "2026-05-03 — El modo operativo base del sistema de agentes se consolida en una sola regla"
---

# Resumen corto

Se elimina la duplicidad entre las dos reglas base que estaban definiendo el comportamiento operativo del agente y se condensa todo el modo operativo en `rules/00-operating-mode.md`.

## Contexto / problema

El sistema de agentes mantenía dos reglas base con solape real:

- `00-operating-mode.md` definía identidad, principios y criterios de decisión
- `02-agent-operating-rules.md` volvía a definir protocolos operativos, límites y confirmaciones

Eso elevaba el riesgo de drift y hacía menos clara la secuencia mínima de carga del sistema.

## Cambio realizado

- se integra el contenido operativo útil de `02-agent-operating-rules.md` dentro de `00-operating-mode.md`
- se elimina `02-agent-operating-rules.md`
- se simplifica la carga mínima obligatoria a dos reglas base: `00-operating-mode.md` y `01-project-context.md`
- se actualizan `AGENTS.md`, `.agents/README.md`, `workflows/init-context.md` y `workflows/task-start.md`
- se registra la decisión en `.agents/decisions-log.md`

## Objetivo

Dejar una única fuente de verdad para el modo operativo del agente y reducir ambigüedad documental en el bootstrap del repo.

## Impacto arquitectónico

No cambia el runtime del producto, pero sí la arquitectura documental del sistema de agentes:

- menos superficie duplicada
- menos puntos de mantenimiento
- bootstrap más claro para agentes humanos o automáticos

## Desglose denso

- la regla `00-operating-mode.md` pasa a ser dueña tanto de identidad/principios como de protocolos de actuación, confirmación y límites de edición
- `AGENTS.md` y `.agents/README.md` dejan de presentar una tercera regla base inexistente o redundante
- los workflows de arranque quedan alineados con la nueva carga mínima

## Validación

- `rg -n "02-agent-operating-rules|rules/00-operating-mode.md" AGENTS.md .agents doc`
- revisión manual de la secuencia de carga en `AGENTS.md`, `.agents/README.md`, `.agents/workflows/init-context.md` y `.agents/workflows/task-start.md`

## Pendientes / límites

- no se ha sincronizado el vault de Obsidian en esta pasada porque su worktree está sucio con cambios ajenos y cualquier edición allí exigiría una operación separada y su propio commit/push

## Notas para presupuesto

Entrega corta pero estructural: reduce deuda documental y endurece la gobernanza del sistema de agentes sin tocar el runtime público.
