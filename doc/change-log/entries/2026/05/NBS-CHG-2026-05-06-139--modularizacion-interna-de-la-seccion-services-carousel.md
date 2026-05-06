---
change_id: NBS-CHG-2026-05-06-139
date: 2026-05-06
title: Modularizacion interna de la seccion services carousel
group_id: NBS-TSK-2026-125
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
  - components/home/services-carousel/**
  - doc/reference/technical-reference.md
  - doc/change-log/**
verification:
  - npm run lint
  - npm run typecheck
  - npm run build
---

# Resumen corto

La sección `services-carousel` deja de vivir en un único archivo y pasa a una carpeta modular con entrypoint estable, geometría del arco extraída, hook de scroll aislado y primitives visuales separadas.

## Contexto / problema

La sección de servicios combinaba en un solo archivo la configuración del carrusel, el cálculo geométrico del arco, el seguimiento de scroll, el chrome visual de las cards, la variante desktop sticky y la variante mobile. Eso elevaba el acoplamiento interno y hacía menos evidente dónde tocar cada tipo de cambio.

## Cambio realizado

- se sustituye `components/home/services-carousel.tsx` por la carpeta `components/home/services-carousel/`
- `index.tsx` mantiene la API pública `ServicesCarouselSection` y concentra la orquestación general
- `constants.ts` agrupa valores canónicos de runway, fondo y geometría
- `geometry.ts` extrae `computeArcTransforms` y `getActiveIndex`
- `use-section-scroll-progress.ts` encapsula el cálculo de progreso de scroll local
- `primitives.tsx` reúne heading, chrome, contenido y variantes de card
- `types.ts` centraliza el contrato de transforms
- `utils.ts` mantiene las utilidades cromáticas y de redondeo
- `doc/reference/technical-reference.md` se actualiza para reflejar la nueva estructura

## Objetivo

Dejar una base más mantenible para iterar sobre el carrusel de servicios sin mezclar cambios de motion, layout, geometría y chrome visual en un mismo archivo.

## Impacto arquitectonico

Refactorización local de frontend. El consumo desde `app/page.tsx` sigue intacto y el catálogo estático de `data/services.ts` no cambia.

## Desglose denso

- el import público `@/components/home/services-carousel` permanece estable
- la geometría del arco queda desacoplada del árbol JSX y es más fácil de revisar de forma aislada
- el hook de scroll deja de convivir con el markup principal y puede evolucionar sin ensuciar la superficie de la sección
- la referencia técnica deja de apuntar a un archivo ya inexistente

## Validacion

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Pendientes / limites

- no se ha automatizado una regresión visual del carrusel; la comprobación final de composición y motion sigue siendo manual
- `DESIGN.md` no requiere cambios porque no se ha alterado el canon visual de la sección
- `npm run changes:sync` no puede ejecutarse porque los scripts `changes:*` no existen hoy en `package.json`

## Notas para presupuesto

Refactorización técnica de mantenimiento orientada a reducir fricción en futuras iteraciones de una de las secciones visualmente más complejas de la home pública.
