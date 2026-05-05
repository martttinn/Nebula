---
change_id: NBS-CHG-2026-05-04-087
group_id: NBS-TSK-2026-087
date: 2026-05-04
title: Recalibracion del layout interno de las cards del carrusel de servicios
type: ui
status: done
owner: Codex
tags:
  - home
  - services
  - layout
  - ui
---

# Contexto

Tras hacer las cards más grandes, el CTA `Ver más` seguía demasiado pegado al borde inferior e incluso se veía recortado en algunas cards. Martín pidió mantener el incremento de tamaño, pero ajustando correctamente el contenido interno para que todo siguiera siendo visible y legible.

## Cambio realizado

- se aumenta la altura útil de la card para dar más aire real al cierre
- se recalibran título, icono central y columna media para que la jerarquía siga respirando sin empujar el footer
- se refuerza el padding inferior y se estabiliza la franja de cierre para que el CTA quede claramente dentro de la card
- se eleva ligeramente el bloque del carrusel dentro del stage para evitar que el pie de la composición quede demasiado bajo
- se mantiene el truncado temprano de la descripción para que el copy largo no pueda volver a romper el layout
- se actualiza `DESIGN.md` para fijar que cuando una card crece deben recalibrarse también sus piezas internas

## Objetivo

Conservar una card más grande y más premium sin sacrificar legibilidad ni visibilidad del footer.

## Impacto

La sección gana más presencia en desktop y el contenido interior vuelve a sentirse proporcionado con el nuevo tamaño del contenedor.

## Validación

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Riesgos / seguimiento

- conviene revisar visualmente en desktop medio que la nueva apertura del arco no empuje demasiado las cards laterales fuera de foco
