---
change_id: NBS-CHG-2026-05-04-055
date: 2026-05-04
title: Unificación de todos los botones sobre la primitive de animate-ui
group_id: NBS-TSK-2026-055
category: frontend
subcategories:
  - components
  - motion
  - tooling
origin: client-request
complexity: medium
scope: systemic
user_visible: true
release_impacts:
  - frontend-runtime
architecture_layers:
  - components
  - web
  - docs
  - tooling
backend_sensitive: false
files_touched:
  - components/animate-ui/**
  - components/ui/button.tsx
  - components/ui/star-border.tsx
  - DESIGN.md
  - .agents/decisions-log.md
  - doc/reference/technical-reference.md
  - package.json
  - package-lock.json
  - doc/change-log/**
verification:
  - npm run lint
  - npm run typecheck
  - npm run build
related_decisions:
  - "2026-05-04 — Todas las buttons reutilizables comparten una primitive motion de animate-ui"
---

# Resumen corto

Se adopta la primitive de botones de `animate-ui` como base técnica común para la primitive pública `Button` y para `StarBorder`, unificando la interacción de todos los botones reutilizables del proyecto.

## Contexto / problema

El repo tenía dos caminos distintos para interacción de botones: una primitive clásica para CTAs estándar y una shell específica para el CTA premium del navbar. Martín pidió usar la nueva primitive importada por `shadcn` como base de todos los botones del proyecto.

## Cambio realizado

- se ejecuta `npx shadcn@latest add @animate-ui/components-buttons-button`
- se reencuadra el wrapper generado de `animate-ui` al styling Nebula conservando `hoverScale` y `tapScale`
- `components/ui/button.tsx` pasa a ser un re-export del wrapper compartido
- `StarBorder` se monta ahora sobre la misma primitive motion para unificar la base interactiva del navbar
- se actualizan documentación técnica y decisiones duraderas

## Objetivo

Centralizar la microinteracción de botones sin reescribir el lenguaje visual existente ni duplicar lógica entre primitives.

## Impacto arquitectónico

La unificación reduce drift entre botones estándar y premium. La capa visual sigue separada por wrappers, pero la base técnica de interacción queda consolidada en `components/animate-ui/primitives/buttons/button.tsx`.

## Desglose denso

- el wrapper generado por `animate-ui` se adapta a las variants Nebula ya existentes para evitar regresiones visuales en el hero
- `StarBorder` conserva su shell y sus gradientes, pero delega la interacción base en la nueva primitive motion
- se mantiene compatibilidad con imports existentes desde `@/components/ui/button`

## Validación

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Pendientes / límites

- no se ha hecho todavía una revisión visual automatizada del navbar y del hero en navegador en esta sesión
- la adopción introduce la dependencia `motion`; si el proyecto amplía mucho esta familia, convendrá auditar bundle y coherencia con `framer-motion`

## Notas para presupuesto

Refactor reusable de alcance transversal con impacto en interacción, tooling y documentación técnica.
