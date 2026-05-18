---
change_id: NBS-CHG-2026-05-07-153
date: 2026-05-07
title: Integracion dev-only de Remotion
group_id: NBS-TSK-2026-137
category: infra
subcategories:
  - tooling
  - frontend
origin: client-request
complexity: medium
scope: cross-cutting
user_visible: false
release_impacts:
  - developer-tooling
  - docs
architecture_layers:
  - tooling
  - components
  - docs
backend_sensitive: false
files_touched:
  - package.json
  - package-lock.json
  - .gitignore
  - eslint.config.mjs
  - remotion/**
  - .agents/decisions-log.md
  - doc/reference/technical-reference.md
  - doc/change-log/**
verification:
  - npm run video:render -- NebulaShowcase renders/nebula-showcase.mp4
  - npm run video:still -- NebulaShowcase renders/nebula-poster.png --frame 0
  - npm run lint
  - npm run typecheck
  - npm run build
---

# Resumen corto

Nebula Studios integra Remotion como subsistema local `dev-only`, aislado del runtime público de Next.js y listo para Studio y renders locales de vídeo.

## Contexto / problema

Martín quiere generar vídeos del proyecto desde el mismo repo sin contaminar la web pública ni hipotecar una futura evolución a un sistema más profesional. El repo no tenía todavía ninguna infraestructura específica de render de vídeo ni una frontera clara entre UI pública y composiciones audiovisuales.

## Cambio realizado

- se instalan `remotion`, `@remotion/cli` y `@remotion/google-fonts`
- se añaden scripts npm para Studio, render de vídeo y render de still
- se crea el árbol `remotion/` con `Root`, entrypoint, composición `NebulaShowcase`, tokens, fuentes y helpers de assets
- se añade una excepción mínima de ESLint para `scripts/**/*.js`, alineada con el runtime CommonJS actual del tooling del `change-log`
- se registra la decisión en `.agents/decisions-log.md`
- se actualiza la referencia técnica para reflejar el nuevo subsistema

## Objetivo

Habilitar una base mínima pero escalable para trabajo de vídeo local dentro del repo, manteniendo una separación estricta entre web pública y rendering audiovisual.

## Impacto arquitectonico

Cambio de infraestructura y arquitectura local. No crea rutas públicas, no altera el build de Next y no intenta reutilizar componentes acoplados a `next/image`, `next/font` o lógica de scroll del sitio.

## Desglose denso

- el sistema de vídeo queda encapsulado en `remotion/`
- las tipografías Nebula se cargan dentro de Remotion con `@remotion/google-fonts`, no con `next/font`
- los assets públicos del repo se reutilizan vía `staticFile()`
- la primera composición sirve como smoke test real del pipeline y como base para futuras plantillas

## Validacion

- `npm run video:render -- NebulaShowcase renders/nebula-showcase.mp4`
- `npm run video:still -- NebulaShowcase renders/nebula-poster.png --frame 0`
- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Pendientes / limites

- la integración es deliberadamente `dev-only`; no incluye player embebido, cloud rendering ni rutas públicas
- el siguiente paso natural, si crece el sistema, sería abrir más composiciones o evolucionar a templates reusables antes de pensar en un workspace dedicado
- el subsistema sigue naciendo con una única composición utilitaria y todavía no formaliza presets de render, naming de salidas ni un pipeline de assets más amplio

## Notas para presupuesto

Integración técnica con valor estratégico: añade una nueva capacidad de producción audiovisual al repo manteniendo bajo el riesgo de acoplamiento con la web pública.
