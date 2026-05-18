---
change_id: NBS-CHG-2026-05-11-188
date: 2026-05-11
title: Verificacion obligatoria de dependencias mencionadas
group_id: NBS-TSK-2026-164
category: docs
subcategories:
  - tooling
  - developer-experience
  - hardening
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
  - AGENTS.md
  - .agents/decisions-log.md
  - .agents/rules/00-operating-mode.md
  - .agents/rules/06-testing-release-and-docs-rules.md
  - .agents/workflows/task-start.md
  - .agents/workflows/dependency-audit.md
  - .agents/skills/dependency-audit/SKILL.md
  - doc/change-log/**
verification:
  - npm run changes:sync
related_decisions:
  - Las dependencias mencionadas deben verificarse contra el proyecto actual antes de instalarse o usarse como stack
---

# Resumen corto

El sistema de agentes exige ahora comprobar si las dependencias mencionadas están instaladas en el proyecto actual antes de tratarlas como stack o usarlas en implementación.

## Contexto / problema

Martín pidió que el sistema de agentes verificase todas las dependencias mencionadas y, si no están instaladas, preguntase cuáles quiere instalar. La regla evita confundir documentación, propuestas o tooling bajo demanda con dependencias reales del runtime.

## Cambio realizado

- `rules/00-operating-mode.md` añade un protocolo específico para dependencias mencionadas
- `workflows/task-start.md` incorpora la comprobación al inicio de tareas que mencionen paquetes o herramientas
- `rules/06-testing-release-and-docs-rules.md` refuerza la diferencia entre comandos, tooling bajo demanda y dependencias instaladas
- `workflows/dependency-audit.md` y `skills/dependency-audit/SKILL.md` obligan a comparar paquetes citados contra manifiesto y lockfile
- `AGENTS.md` expone la regla en el bootstrap raíz
- `.agents/decisions-log.md` registra la decisión duradera

## Objetivo

Reducir drift de stack y evitar instalaciones implícitas: si una dependencia citada no está instalada y hace falta para el cambio, el agente debe pedir confirmación a Martín antes de tocar `package.json`, lockfile o equivalente.

## Impacto arquitectonico

No hay impacto de runtime. El impacto es de gobernanza operativa del agente y del protocolo de auditoría de dependencias.

## Desglose denso

- fuente de verificación: `package.json`, lockfile y configuración equivalente del gestor real
- clasificación nueva: `mencionada/no instalada`
- parada obligatoria: preguntar a Martín qué instalar antes de modificar manifiestos
- excepción explícita: herramientas bajo demanda vía `npx <paquete>@...` no se tratan como dependencias instaladas

## Validacion

- `npm run changes:sync`

## Pendientes / limites

No se instalaron dependencias; el cambio es documental y operativo.

## Notas para presupuesto

Endurecimiento transversal del sistema de agentes para controlar drift de dependencias y decisiones de instalación.
