---
change_id: NBS-CHG-2026-05-06-126
date: 2026-05-06
title: Gradiente de marca en bucle para la linea de how we work
group_id: NBS-TSK-2026-112
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

La línea SVG de `How we work` pasa a usar un gradiente de marca en bucle con `Haze`, `Silver` y `Lilac`, manteniendo un glow que hereda automáticamente el color real del tramo activo.

## Contexto / problema

El trazo principal del timeline seguía resolviéndose con un gradiente lineal simple de una sola pasada, menos rico y menos alineado con el lenguaje cromático del sitio. Además, el halo debía quedar claramente ligado a la tonalidad real de cada segmento y no como un resplandor plano independiente.

## Cambio realizado

- se añade `PROCESS_SILVER_RGB` en `components/home/how-we-work.tsx`
- el `linearGradient` del stroke se reconfigura con `gradientUnits="userSpaceOnUse"` y `spreadMethod="repeat"` para crear un ciclo cromático repetido
- el loop de color combina `Haze`, `Silver` y `Lilac`
- se actualiza `DESIGN.md` para explicitar que el stroke puede usar gradiente de marca en bucle y que el glow debe nacer del propio stroke coloreado

## Objetivo

Dar más riqueza cromática al recorrido del timeline sin romper la identidad de marca y asegurando que el glow acompañe el color exacto del tramo donde aparece.

## Impacto arquitectonico

Cambio local de frontend con alineación documental del canon visual. No altera geometría del path ni layout de la sección.

## Desglose denso

- el glow ya se resolvía a partir de `SourceGraphic`, así que al colorear el stroke con un gradiente repetido el halo hereda automáticamente la misma cromática local
- la repetición del gradiente se resuelve en espacio de usuario, no por caja relativa del SVG, para que el ciclo sea más controlable sobre el ancho real del stage
- no se introduce una segunda capa de glow coloreada por separado

## Validacion

- `npm run lint`
- `npm run build`

## Pendientes / limites

- si más adelante se quiere que la frecuencia del loop cambie según viewport, convendría extraer el ancho de ciclo a una constante dedicada de diseño
- `npm run changes:sync` no puede ejecutarse porque los scripts `changes:*` no existen hoy en `package.json`

## Notas para presupuesto

Refinamiento visual pequeño pero visible sobre una primitive protagonista del timeline público y con alineación del canon visual del repo.
