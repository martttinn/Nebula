---
change_id: NBS-CHG-2026-05-21-215
date: 2026-05-21
title: Stack sticky movil en testimonials
group_id: NBS-TSK-2026-191
category: frontend
subcategories:
  - ui
  - mobile
  - motion
  - visual-system
origin: client-request
complexity: medium
scope: component-level
user_visible: true
release_impacts:
  - frontend-runtime
  - docs
architecture_layers:
  - components
  - docs
  - web
backend_sensitive: false
files_touched:
  - components/home/testimonials/index.tsx
  - DESIGN.md
  - doc/change-log/**
verification:
  - check rojo/verde de eliminacion de lista movil simple
  - npm run lint
  - npm run typecheck
  - npm run build
  - Verificacion visual mobile/desktop con Playwright
  - npm run changes:sync
related_decisions:
---

# Resumen corto

Testimonials pasa a usar el mismo stack sticky en mobile/tablet y desktop, con ajustes compactos para que las cards se apilen dentro del viewport movil.

## Contexto / problema

La implementacion previa tenia dos experiencias distintas: desktop usaba un stage sticky con cards apiladas y mobile renderizaba una lista vertical convencional. Martin pidio que en version movil las cards de testimonials se apilaran igual que en desktop.

## Cambio realizado

- Se elimina el path movil basado en `MobileTestimonialCard` y `MobileFinalCtaCard`.
- Se renombra el stage a una primitive responsive compartida.
- Se anaden constantes compactas de escala y labio para `<1024px`.
- Se adapta la superficie de card para conservar lectura en viewport pequeno sin perder la composicion Nebula.
- `DESIGN.md` queda alineado con el nuevo canon: mobile/tablet tambien usan stack sticky.

## Objetivo

Unificar la coreografia de prueba social para que el usuario perciba el mismo apilado progresivo en todos los dispositivos, evitando que mobile degrade a una lista simple.

## Impacto arquitectonico

Cambio local en una isla cliente de `components/home/testimonials/`. Reduce duplicacion de render responsive y mantiene el contenido, el CTA final, el lazy loading del GridDistortion y las dependencias existentes.

## Desglose denso

`StickyTestimonialsStage` ocupa ahora toda la responsabilidad responsive del stage. Un hook local detecta viewports compactos mediante `matchMedia` y ajusta `stackLipSize` y `stackScaleStep` sin alterar la timeline de reveal. Las cards reutilizan la misma surface en todos los breakpoints, con padding, radios y tipografia mas contenidos en base mobile y recuperando el footprint amplio en desktop.

## Validacion

- Check rojo inicial: fallo esperado porque mobile seguia usando lista simple.
- Check verde posterior: mobile ya no conserva el render `lg:hidden` de lista.
- `npm run lint`
- `npm run typecheck`
- `npm run build`
- Verificacion visual mobile/desktop con Playwright
- `npm run changes:sync`

## Pendientes / limites

`npm run design:lint` no existe en el `package.json` real, aunque las reglas documentales lo mencionan. La sincronizacion con Obsidian queda pendiente si el vault mantiene cambios no relacionados que impidan una edicion segura.

## Notas para presupuesto

Ajuste responsive de motion y UI en seccion publica de prueba social, con reduccion de duplicacion y actualizacion documental.
