---
change_id: NBS-CHG-2026-05-04-079
group_id: NBS-TSK-2026-079
date: 2026-05-04
title: Conversion de la banda de benefits en un stage sticky de frases secuenciales
type: ui
status: done
owner: Codex
tags:
  - home
  - benefits
  - scroll
  - motion
  - ui
---

# Contexto

La banda de propuesta de valor seguía resuelta como una secuencia vertical de frases con algo de runway final. Martín pidió un patrón más controlado: una única frase en pantalla, sección sticky y aparición / desaparición de los statements conforme avanza el scroll.

## Cambio realizado

- `components/home/value-proposition-statements.tsx` deja de apilar frases en vertical y pasa a renderizar un stage sticky de `100svh`
- cada frase ocupa su propio tramo de scroll compartido, entra desde abajo, se asienta en el centro y desaparece hacia arriba antes de dar paso a la siguiente
- el coloreado palabra a palabra sigue activo, pero ahora vive solo dentro del tramo visible de cada statement
- desaparece el spacer final usado como runway artificial
- `components/home/value-proposition-section.tsx` retira el padding exterior para que la sección no añada aire muerto por encima o por debajo del sticky
- se mantiene un fallback `prefers-reduced-motion` con frases estáticas apiladas para no superponer todo el copy en contextos sin animación
- `DESIGN.md`, referencia técnica y `decisions-log` se alinean con el nuevo comportamiento

## Objetivo

Hacer que benefits funcione como una escena editorial autosuficiente entre hero y servicios, con más control del foco y una lectura más premium y secuencial.

## Impacto

La home deja de mostrar varias frases repartidas por altura y pasa a dirigir la atención a una sola idea por vez. La sección ya no depende del contenido posterior para que la última frase pueda completarse.

## Validación

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Riesgos / seguimiento

- el tiempo percibido por frase puede necesitar calibración fina en runtime real según sensibilidad de scroll y densidad visual del resto de la home
- si más adelante se añaden más frases, conviene revisar la altura total del stage sticky para no alargar en exceso la banda
