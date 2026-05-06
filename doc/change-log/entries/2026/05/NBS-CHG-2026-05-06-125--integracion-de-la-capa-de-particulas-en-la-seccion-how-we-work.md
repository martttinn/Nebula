---
change_id: NBS-CHG-2026-05-06-125
date: 2026-05-06
title: Integracion de la capa de particulas en la seccion how we work
group_id: NBS-TSK-2026-111
category: frontend
subcategories:
  - ui-ux-redesign
origin: client-request
complexity: low
scope: local
user_visible: true
release_impacts:
  - frontend-runtime
architecture_layers:
  - components
  - docs
  - web
backend_sensitive: false
files_touched:
  - components/home/how-we-work.tsx
  - DESIGN.md
  - doc/change-log/**
verification:
  - npm run lint
  - npm run build
---

# Resumen corto

La sección `How we work` incorpora la misma capa de partículas ya usada en hero y servicios para reforzar continuidad atmosférica sin abrir una variante visual paralela.

## Contexto / problema

La home ya tenía una capa de partículas lilas reutilizada entre el hero y `services-carousel`, pero el bloque de proceso seguía leyendo una atmósfera más seca y menos conectada con el resto del recorrido visual.

## Cambio realizado

- se importa y monta `HeroParticles` dentro de `components/home/how-we-work.tsx`
- la capa se inserta detrás del contenido y del path, siguiendo el mismo patrón de servicios
- se actualiza `DESIGN.md` para permitir explícitamente esta reutilización dentro de `process-timeline`

## Objetivo

Dar continuidad visual entre secciones y aprovechar una primitive ya consolidada en lugar de crear otra firma atmosférica distinta.

## Impacto arquitectonico

Cambio local de frontend con alineación documental del canon visual. No altera geometría del timeline ni contratos de datos.

## Desglose denso

- la primitive de partículas sigue siendo la misma `HeroParticles`, con sus rutas deterministas y su respeto por `prefers-reduced-motion`
- el contenido principal de proceso mantiene su `z-index` por encima, así que las partículas quedan como fondo atmosférico y no compiten con cards, nodos ni línea
- el cambio no abre CSS nuevo ni una variante específica de partículas solo para proceso

## Validacion

- `npm run lint`
- `npm run build`

## Pendientes / limites

- si más adelante la sección de proceso necesitara una densidad menor o una distribución distinta, convendría parametrizar la primitive en vez de clonar otra versión
- `npm run changes:sync` no puede ejecutarse porque los scripts `changes:*` no existen hoy en `package.json`

## Notas para presupuesto

Refinamiento visual pequeño pero relevante para continuidad de marca y cohesión atmosférica de la home pública.
