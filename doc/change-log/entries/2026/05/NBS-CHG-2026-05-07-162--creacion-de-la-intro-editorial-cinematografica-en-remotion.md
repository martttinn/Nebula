---
change_id: NBS-CHG-2026-05-07-162
date: 2026-05-07
title: Creacion de la intro editorial cinematografica en Remotion
group_id: NBS-TSK-2026-147
category: frontend
subcategories:
  - feature
  - branding
  - motion
  - visual-direction
origin: client-request
complexity: medium
scope: local
user_visible: false
release_impacts:
  - developer-tooling
  - docs
architecture_layers:
  - components
  - tooling
  - docs
backend_sensitive: false
files_touched:
  - remotion/Root.tsx
  - remotion/compositions/NebulaEditorialIntro.tsx
  - remotion/compositions/NebulaShowcase.tsx
  - remotion/useNebulaVideoFonts.ts
  - doc/reference/technical-reference.md
  - doc/change-log/**
verification:
  - npx remotion compositions remotion/index.ts
  - npm run video:still -- NebulaEditorialIntro renders/nebula-editorial-intro-open.png --frame 42
  - npm run video:still -- NebulaEditorialIntro renders/nebula-editorial-intro-middle.png --frame 176
  - npm run video:still -- NebulaEditorialIntro renders/nebula-editorial-intro-close.png --frame 314
  - npm run video:render -- NebulaEditorialIntro renders/nebula-editorial-intro.mp4
  - npm run lint
  - npm run typecheck
  - npm run build
  - npm run changes:sync
---

# Resumen corto

Nebula Studios gana su primera composición editorial cinematográfica en Remotion, separada del runtime web y pensada como intro de branding del negocio y de la home.

## Contexto / problema

El repo ya tenía Remotion integrado como subsistema local, pero solo disponía de una composición base de smoke test. Faltaba una pieza real de presentación que trasladara el lenguaje visual de Nebula a un formato audiovisual usable.

## Cambio realizado

- se crea `NebulaEditorialIntro` como nueva composición en `1920x1080`, `30fps` y `360` frames
- la pieza estructura la narrativa en tres actos: promesa principal, capacidades del estudio y cierre de marca
- se reutilizan fuentes, tokens y assets públicos del repo sin importar componentes web acoplados a `next/image`, `next/font` o lógica scroll-driven
- se extrae `useNebulaVideoFonts` para no duplicar la carga segura de tipografías entre composiciones
- se actualiza `remotion/Root.tsx` y la referencia técnica del repo

## Objetivo

Generar una intro editorial cinematográfica alineada con el posicionamiento premium de Nebula Studios y preparada para evolucionar más adelante a variantes con audio, voiceover o parametrización.

## Impacto arquitectonico

Cambio local al subsistema `remotion/`. No altera el runtime público de Next.js ni introduce rutas nuevas o dependencias de producción adicionales.

## Desglose denso

- la apertura resuelve el claim principal del negocio con tipografía `Syne`, base `Void`, acento `Lilac` y un planeta hero como pieza visual dominante
- el tramo medio traduce el catálogo real de servicios del repo a un bloque editorial de capacidades, reutilizando copy verificado desde `data/services.ts`
- el cierre de marca consolida el lockup y la propuesta de valor sobre una composición sobria, espacial y técnica
- el movimiento se controla por frame con `interpolate()` y `spring()`, sin dependencia de interacción o scroll

## Validacion

- `npx remotion compositions remotion/index.ts`
- `npm run video:still -- NebulaEditorialIntro renders/nebula-editorial-intro-open.png --frame 42`
- `npm run video:still -- NebulaEditorialIntro renders/nebula-editorial-intro-middle.png --frame 176`
- `npm run video:still -- NebulaEditorialIntro renders/nebula-editorial-intro-close.png --frame 314`
- `npm run video:render -- NebulaEditorialIntro renders/nebula-editorial-intro.mp4`
- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm run changes:sync`

## Pendientes / limites

- la v1 no incluye audio, voiceover ni diseño parametrizable
- si la pieza evoluciona a uso comercial recurrente, el siguiente paso sensato es extraer copy configurable y presets de timing antes de multiplicar composiciones derivadas

## Notas para presupuesto

Pieza creativa funcional con coste contenido: convierte la capacidad técnica recién instalada en un activo audiovisual real de branding, sin contaminar la arquitectura pública del sitio.
