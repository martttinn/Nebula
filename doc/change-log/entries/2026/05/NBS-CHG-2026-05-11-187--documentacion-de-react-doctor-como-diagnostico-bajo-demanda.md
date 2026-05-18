---
change_id: NBS-CHG-2026-05-11-187
date: 2026-05-11
title: Documentacion de React Doctor como diagnostico bajo demanda
group_id: NBS-TSK-2026-163
category: docs
subcategories:
  - tooling
  - developer-experience
  - diagnostics
origin: client-request
complexity: low
scope: cross-cutting
user_visible: false
release_impacts:
  - docs
  - developer-tooling
architecture_layers:
  - docs
  - tooling
  - workflows
backend_sensitive: false
files_touched:
  - README.md
  - AGENTS.md
  - .agents/decisions-log.md
  - .agents/rules/01-project-context.md
  - .agents/rules/06-testing-release-and-docs-rules.md
  - .agents/workflows/dependency-audit.md
  - .agents/skills/dependency-audit/SKILL.md
  - .agents/roles/02-role-performance-audit.md
  - doc/reference/technical-reference.md
  - doc/change-log/**
verification:
  - npm view react-doctor version description bin repository --json
  - npm run changes:sync
related_decisions:
  - React Doctor queda documentado como diagnóstico React bajo demanda
---

# Resumen corto

Nebula documenta React Doctor como diagnóstico bajo demanda para salud React/Next.js mediante `npx react-doctor@latest`, sin instalarlo en el proyecto.

## Contexto / problema

Martín pidió incluir `react-doctor` en la documentación del proyecto, el sistema de agentes y la plantilla `agents-plantilla`. Como el uso pedido es `npx react-doctor@latest`, el cambio debía quedar como tooling operativo bajo demanda, no como nueva dependencia persistida en `package.json`.

## Cambio realizado

- se verificó en npm que `react-doctor` existe, que la versión consultada es `0.1.6` y que expone el binario `react-doctor`
- `README.md` añade el comando de diagnóstico React
- `doc/reference/technical-reference.md` incorpora React Doctor en la foto operativa del stack
- `.agents/rules/01-project-context.md` y `.agents/rules/06-testing-release-and-docs-rules.md` documentan cuándo usarlo
- `.agents/workflows/dependency-audit.md`, `.agents/skills/dependency-audit/SKILL.md` y `.agents/roles/02-role-performance-audit.md` lo integran como señal complementaria
- `AGENTS.md` y `.agents/decisions-log.md` dejan la regla visible para agentes

## Objetivo

Dar a los agentes y a la documentación una referencia única para usar React Doctor en auditorías de seguridad, rendimiento, corrección, accesibilidad, bundle y arquitectura React/Next.js.

## Impacto arquitectonico

No cambia runtime ni manifiestos. El impacto es documental y operativo: React Doctor queda como herramienta diagnóstica bajo demanda y sus hallazgos requieren revisión antes de convertirse en cambios.

## Desglose denso

- comando canónico: `npx react-doctor@latest`
- paquete verificado: `react-doctor`
- versión consultada: `0.1.6`
- modo de uso: diagnóstico complementario, no sustituto de `lint`, `typecheck` o `build`
- persistencia: no se instala ni se fija en `package.json`

## Validacion

- `npm view react-doctor version description bin repository --json`
- `npm run changes:sync`

## Pendientes / limites

No se ejecutó `npx react-doctor@latest` contra el repo en esta entrega porque el alcance pedido era documentar la herramienta, no auditar el código actual.

## Notas para presupuesto

Actualización documental y de sistema de agentes con impacto en calidad operativa y diagnóstico futuro, sin cambios de runtime.
