---
change_id: NBS-CHG-2026-05-04-070
date: 2026-05-04
title: Normalizacion de transforms SSR del carrusel de servicios para evitar hydration mismatch
group_id: NBS-TSK-2026-070
category: frontend
subcategories:
  - services
  - hydration
  - ssr
origin: client-request
complexity: low
scope: local
user_visible: false
release_impacts:
  - frontend-runtime
architecture_layers:
  - components
  - web
  - docs
backend_sensitive: false
files_touched:
  - components/home/services-carousel.tsx
  - doc/change-log/**
verification:
  - npm run lint
  - npm run build
---

# Resumen corto

El carrusel de servicios normaliza sus valores iniciales de transform y opacidad para reducir el riesgo de hydration mismatch entre SSR y cliente.

## Contexto / problema

El warning reportado mostraba discrepancias entre el HTML SSR y las props iniciales del cliente en `opacity`, `transform`, `zIndex` y `willChange` de varias `ServiceCard`. La causa observable mas probable era el uso de floats largos en los transforms calculados antes de la hidratacion.

## Cambio realizado

- se crea `roundTo` para limitar precision numerica de los valores usados por el carrusel
- `computeArcTransforms` pasa a devolver `x`, `y`, `rotation`, `scale` y `opacity` ya normalizados
- la microescala de `whileHover` tambien se redondea para mantener consistencia

## Objetivo

Hacer que servidor y cliente partan de valores iniciales equivalentes al serializar los estilos de Framer Motion.

## Impacto arquitectonico

El ajuste queda encapsulado en `components/home/services-carousel.tsx` y no altera la estructura del carrusel ni su progresion funcional.

## Validacion

- `npm run lint`
- `npm run build`

## Pendientes / limites

- no se ha verificado todavia en navegador local que el warning de consola haya desaparecido por completo

## Notas para presupuesto

Correccion tecnica localizada de hidratacion en runtime.
