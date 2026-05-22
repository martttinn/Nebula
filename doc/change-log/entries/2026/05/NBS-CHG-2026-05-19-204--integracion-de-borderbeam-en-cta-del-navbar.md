---
change_id: NBS-CHG-2026-05-19-204
date: 2026-05-19
title: Integracion de BorderBeam en CTA del navbar
group_id: NBS-TSK-2026-180
category: frontend
subcategories:
  - navbar
  - cta
  - motion
  - components
origin: client-request
complexity: medium
scope: component-level
user_visible: true
release_impacts:
  - frontend-runtime
  - docs
architecture_layers:
  - app
  - components
  - docs
  - web
backend_sensitive: false
files_touched:
  - components/magicui/border-beam.tsx
  - components/layout/navbar.tsx
  - app/globals.css
  - DESIGN.md
  - doc/reference/technical-reference.md
  - doc/change-log/**
verification:
  - npm run lint
  - npm run typecheck
  - npm run build
  - smoke visual desktop en http://localhost:3001
  - npm run changes:sync
related_decisions:
---

# Resumen corto

El CTA `Contactar` del navbar desktop integra `BorderBeam` de Magic UI como efecto animado de borde.

## Contexto / problema

Martín pidió integrar el efecto de Magic UI en el botón de contacto del navbar, extrayendo el componente tal cual desde el repositorio original y adaptando el proyecto alrededor del componente, no reescribiendo su implementación.

## Cambio realizado

- Se añade `components/magicui/border-beam.tsx` con el componente original de Magic UI.
- Se monta `BorderBeam` dentro del link `Contactar` del navbar desktop.
- Se ajusta el CTA del navbar con `relative isolate overflow-hidden` para que el beam pueda recorrer el borde.
- Se calibra el gradiente del beam con un `backgroundImage` explicito (`#B5B1E3`, `#7B74D4`, `#534AB7`) porque los props originales de Magic UI usan `colorTo` como stop `via` dominante y no como extremo equilibrado.
- Se evita renderizar el beam si `prefers-reduced-motion` está activo.
- Se añaden utilidades CSS literales en `app/globals.css` para compatibilidad entre las clases Tailwind 4 del componente original y el stack actual Tailwind 3.4.x.
- `DESIGN.md` y `technical-reference` documentan el nuevo canon y la procedencia del componente.

## Fuente verificada

- Documentación: `https://magicui.design/docs/components/border-beam`
- Fuente original: `https://raw.githubusercontent.com/magicuidesign/magicui/main/apps/www/registry/magicui/border-beam.tsx`
- Fecha de consulta: `2026-05-19`
- Fiabilidad: documentación oficial y repositorio público original de Magic UI.

## Objetivo

Añadir el efecto pedido al CTA principal de contacto del navbar sin convertirlo en una adaptación local del componente externo.

## Impacto arquitectonico

El cambio queda acotado a la primitive externa copiada, el consumo del navbar, una capa CSS de compatibilidad y documentación. No introduce nuevas dependencias, rutas, APIs, backend ni cambios de datos.

## Desglose denso

- componente externo: `BorderBeam`
- origen: Magic UI
- destino runtime: CTA `Contactar` desktop del navbar
- ajuste necesario: soporte CSS local para utilidades Tailwind 4 usadas por el componente original
- accesibilidad: respeto de `prefers-reduced-motion` desde la shell cliente del navbar

## Validacion

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- smoke visual desktop en `http://localhost:3001`
- comprobacion Playwright del `background-image` inline del beam con los stops `#B5B1E3`, `#7B74D4` y `#534AB7`
- `npm run changes:sync`

## Pendientes / limites

Si el proyecto migra a Tailwind 4, las utilidades CSS de compatibilidad añadidas para `BorderBeam` deben revisarse y retirarse si pasan a ser redundantes.

## Notas para presupuesto

Ajuste visual puntual de CTA con integracion de componente externo y compatibilidad CSS local.
