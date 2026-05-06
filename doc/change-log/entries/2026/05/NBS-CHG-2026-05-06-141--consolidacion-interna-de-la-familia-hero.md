---
change_id: NBS-CHG-2026-05-06-141
date: 2026-05-06
title: Consolidacion interna de la familia hero
group_id: NBS-TSK-2026-127
category: frontend
subcategories:
  - refactor
origin: client-request
complexity: medium
scope: local
user_visible: false
release_impacts:
  - frontend-runtime
architecture_layers:
  - components
  - docs
  - web
backend_sensitive: false
files_touched:
  - components/home/hero/**
  - components/home/hero.tsx
  - components/home/hero-lead.tsx
  - components/home/hero-particles.tsx
  - components/home/hero-particles.module.css
  - components/home/grid-scan.tsx
  - components/home/grid-scan-shell.tsx
  - components/home/grid-scan-fallback.tsx
  - components/home/how-we-work.tsx
  - components/home/services-carousel.tsx
  - components/home/value-proposition-section.tsx
  - components/home/value-proposition-statements.tsx
  - components/home/value-proposition-ornaments.module.css
  - doc/reference/technical-reference.md
  - doc/change-log/**
verification:
  - npm run lint
  - npm run typecheck
  - npm run build
---

# Resumen corto

La familia `hero` pasa a una carpeta canónica propia y, además, se reintroducen wrappers finos en rutas antiguas para que los imports públicos y los tabs abiertos del editor no queden rotos tras la reorganización.

## Contexto / problema

Aunque el hero ya tenía varias piezas separadas, seguía distribuido como una colección de archivos sueltos en la raíz de `components/home/`. Además, tras modularizar otras secciones, las rutas antiguas eliminadas podían dejar falsos errores prácticos en el editor si alguna pestaña o import residual seguía apuntando a esos paths.

## Cambio realizado

- se crea `components/home/hero/` como carpeta canónica con:
  - `index.tsx` para la shell del hero
  - `lead.tsx` para la secuencia tipográfica y los CTAs
  - `particles.tsx` y `particles.module.css` para la atmósfera de partículas
  - `grid-scan.tsx`, `grid-scan-shell.tsx` y `grid-scan-fallback.tsx` para la isla WebGL y su fallback
- `components/home/hero.tsx` pasa a ser una fachada estable que reexporta desde la carpeta nueva
- se restauran wrappers finos en rutas antiguas del hero y de las otras secciones ya modularizadas (`how-we-work`, `services-carousel`, `value-proposition`) para mantener compatibilidad operativa
- `doc/reference/technical-reference.md` se actualiza para apuntar al boundary canónico del hero

## Objetivo

Cerrar la reorganización de las secciones principales de la home con un hero coherente a nivel de estructura interna, sin romper imports públicos ni ergonomía de trabajo en el editor.

## Impacto arquitectonico

Refactorización local de frontend. La home sigue importando `@/components/home/hero` y el comportamiento visual del hero permanece igual.

## Desglose denso

- la carpeta `hero/` se convierte en la fuente de verdad para futuras iteraciones de shell, lead, grid scan y partículas
- las rutas antiguas quedan disponibles como fachada de compatibilidad, lo que reduce falsos errores durante la transición
- `grid-scan` conserva la implementación runtime exacta ya validada, incluida la configuración requerida por `postprocessing`
- la referencia técnica deja de tratar piezas del hero como archivos sueltos y pasa a describir la familia como una unidad

## Validacion

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Pendientes / limites

- no existe regresión visual automatizada del hero; la comprobación final de intro, CTAs, partículas y grid scan sigue siendo manual
- `DESIGN.md` no requiere cambios porque no se altera el canon visual del hero
- `npm run changes:sync` no puede ejecutarse porque los scripts `changes:*` no existen hoy en `package.json`

## Notas para presupuesto

Refactorización estructural de cierre sobre la home pública, con valor técnico doble: boundary más limpio del hero y compatibilidad práctica durante la transición de paths.
