---
change_id: NBS-CHG-2026-05-05-097
date: 2026-05-05
title: Activacion de bordes debug en how we work
group_id: NBS-TSK-2026-097
category: frontend
subcategories:
  - ui-ux-redesign
  - internal-debug
origin: client-request
complexity: low
scope: local
user_visible: true
release_impacts:
  - frontend-runtime
architecture_layers:
  - components
  - web
  - docs
backend_sensitive: false
files_touched:
  - components/home/how-we-work.tsx
  - doc/change-log/**
verification:
  - npm run lint
  - npm run typecheck
  - npm run build
---

# Resumen corto

La seccion `How we work` activa ahora bordes de debug visibles por capas para inspeccionar layout, canal SVG y cajas reales de las cards en desktop y mobile.

## Contexto / problema

La seccion ya estaba integrada en la home, pero hacia falta ver con claridad los limites reales de cada contenedor para ajustar visualmente la composicion y depurar alineaciones.

## Cambio realizado

- se añade un flag local `DEBUG_BORDERS = true` en `components/home/how-we-work.tsx`
- se define una helper `debugOutline()` basada en `outline` para no alterar medidas ni provocar reflow
- se aplican guias visuales sobre la section, el wrapper azul principal a ancho completo, la cabecera, el wrapper desktop, el grid, las celdas laterales, el canal central, el SVG y las cards de desktop y mobile
- el wrapper desktop del timeline deja de limitarse a `max-w-[900px]` y pasa a ocupar `100%` del ancho util disponible
- se retiran contenedores debug lila redundantes del propio timeline para reducir ruido visual durante la inspeccion

## Objetivo

Tener una lectura inmediata de la estructura espacial de la seccion sin convertir el debug en cambios de layout permanentes ni tocar otras zonas de la home.

## Impacto arquitectonico

El cambio queda encapsulado en el propio componente y no introduce dependencias, hooks nuevos ni contratos adicionales.

## Desglose denso

- los bordes usan `outline` con colores distintos por capa para diferenciar shell, grid, celdas, canal y cards
- el debug queda aislado a `HowWeWorkSection` mediante un flag local sencillo de desactivar
- la geometria base no cambia porque `outline` no consume espacio en layout
- el timeline desktop ya no vive dentro de un wrapper adicional estrecho, de modo que el borde azul principal puede leerse sobre todo el ancho util de la seccion

## Validacion

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Pendientes / limites

- los bordes debug quedan activos en runtime hasta que se desactive el flag
- `npm run changes:sync` sigue sin poder ejecutarse porque los scripts `changes:*` no existen hoy en `package.json`

## Notas para presupuesto

Ajuste interno visible de frontend para depuracion visual de layout en una seccion publica concreta.
