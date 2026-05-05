---
change_id: NBS-CHG-2026-05-04-061
date: 2026-05-04
title: Implantación del comando `cleanup` en el sistema de agentes
group_id: NBS-TSK-2026-061
category: docs
subcategories:
  - refactor
  - ops
origin: client-request
complexity: medium
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
  - .agents/workflows/task-start.md
  - .agents/workflows/cleanup-audit.md
  - .agents/decisions-log.md
  - doc/change-log/**
verification:
  - revisión manual de coherencia documental
---

# Resumen corto

El sistema de agentes de Nebula Studios gana el trigger `cleanup`, definido como auditoría read-only de higiene técnica previa a cualquier saneamiento real del repo.

## Contexto / problema

`init` ya cubría el bootstrap fiable del hilo, pero faltaba un comando explícito para auditar deuda higiénica y distinguir entre basura probable, legacy aparcado y drift documental o registral. Durante esta sesión se verificaron además varios tipos de drift reales que justifican ese flujo: referencias a `data/` y `scripts/` que no existen en el árbol, tooling `changes:*` documentado pero no expuesto, entradas duplicadas por `change_id` y exports sin consumo runtime claro.

## Cambio realizado

- se crea `workflows/cleanup-audit.md` como workflow canónico del trigger
- se añade `cleanup` a `rules/00-operating-mode.md`
- se integra `cleanup` en `workflows/task-start.md`
- se documenta el trigger nuevo en `AGENTS.md` y `.agents/README.md`
- se registra la decisión operativa en `.agents/decisions-log.md`

## Objetivo

Dar a Martín una orden semántica clara para pedir una auditoría profunda de higiene del repo sin implicar todavía borrados o refactors destructivos.

## Impacto arquitectónico

El cambio afecta al subsistema de gobernanza del repo. A partir de ahora, los agentes deben tratar la limpieza como una disciplina auditada y clasificada, no como una intuición oportunista durante cualquier task.

## Desglose denso

- el workflow obliga a inspeccionar repo, docs, dependencias, boundaries, registros y tooling antes de recomendar borrados
- los hallazgos deben clasificarse por tipo, severidad, confianza, coste y validación previa necesaria
- el comando distingue explícitamente `basura probable` de `legacy aparcado`, evitando que el frontend-only actual lleve a borrar prematuramente la base futura de Supabase o librerías/activos que siguen siendo estratégicos
- el flujo replica el patrón de `init`: si `cleanup` llega solo, se responde con informe; si llega acompañado de objetivo, la auditoría precede a cualquier limpieza directa del scope pedido

## Validación

- revisión manual de coherencia entre reglas, workflow y bootstrap del sistema de agentes

## Pendientes / límites

- no se ha ejecutado `npm run changes:validate`, `npm run changes:index` ni `npm run changes:sync` porque esos scripts siguen documentados pero no existen en `package.json`
- esta entrega implanta el comando, pero no ejecuta todavía una limpieza real de la codebase

## Notas para presupuesto

Entrega estructural orientada a gobernanza técnica, reducción de riesgo y mantenibilidad del sistema de agentes. Mezcla modelado de workflow, criterios de auditoría y alineación documental cross-cutting.
