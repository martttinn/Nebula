---
change_id: NBS-CHG-2026-05-03-018
date: 2026-05-03
title: Integración de `StarBorder` en el CTA `Contactar` del navbar
group_id: NBS-TSK-2026-018
category: frontend
subcategories:
  - ui
  - motion
  - design-system
origin: client-request
complexity: medium
scope: cross-cutting
user_visible: true
release_impacts:
  - frontend-runtime
architecture_layers:
  - components
  - web
  - docs
backend_sensitive: false
files_touched:
  - components/ui/star-border.tsx
  - components/ui/star-border.module.css
  - components/layout/navbar.tsx
  - DESIGN.md
  - .agents/decisions-log.md
  - doc/reference/technical-reference.md
  - doc/change-log/**
verification:
  - npm run lint
  - npm run build
  - npm run typecheck
---

# Resumen corto

Se integra la primitive `StarBorder` en el CTA `Contactar` del navbar con una adaptación cromática coherente con la identidad de Nebula.

## Contexto / problema

Martín pidió integrar el efecto `StarBorder` de React Bits en el botón `Contactar`, pero adaptándolo a la paleta y al tono premium del proyecto en vez de usar el estilo original genérico.

## Cambio realizado

- se crea una primitive reusable `StarBorder` en `components/ui/`
- el efecto se adapta a una base oscura con brillo `lilac / haze`
- el CTA `Contactar` del navbar deja de usar el botón plano estándar y pasa a usar `StarBorder`
- se documenta el nuevo primitive como recurso de uso controlado

## Objetivo

Aumentar la jerarquía visual del CTA principal del navbar sin romper la sobriedad dark-tech del sistema.

## Impacto arquitectónico

Se añade una primitive reusable de motion para CTAs premium y se integra en una superficie pública ya existente.

## Desglose denso

- el componente original se adapta a `TypeScript + CSS module` para encajar limpio en Next.js
- se conserva el API base `as / className / color / speed / thickness`
- la animación respeta `prefers-reduced-motion`
- el CTA secundario `Explorar` no se altera y sigue usando la primitive `Button`

## Validación

- `npm run lint`
- `npm run build`
- `npm run typecheck`

## Pendientes / límites

- el efecto está optimizado para superficies oscuras; reutilizarlo sobre fondos claros exigiría una variante visual distinta

## Notas para presupuesto

Integración de primitive reusable de motion con adaptación visual a marca y aplicación localizada en CTA prioritario.
