---
change_id: NBS-CHG-2026-05-05-096
group_id: NBS-TSK-2026-096
date: 2026-05-05
title: Capa ornamental sincronizada para la banda sticky de benefits
type: feature
status: done
owner: Codex
tags:
  - home
  - benefits
  - motion
  - design
  - ui
---

# Contexto

Martín pidió añadir `abstract-icons` decorativos en la sección de benefits, con dos imágenes por frase, sincronizadas con el stage sticky actual: entrada conjunta con la frase, deriva lenta tipo espacio y salida por desvanecimiento al cambiar de statement.

## Cambio realizado

- se asignan dos assets concretos de `public/abstract-icons` a cada frase de la banda
- se integra una capa ornamental repo-local en `value-proposition-statements.tsx`
- la entrada de cada icono se resuelve con `pop-in`, la permanencia con deriva lenta y la salida con `fade`
- se extrae la deriva a `value-proposition-ornaments.module.css` para no mezclar esta lógica con la primitive de partículas del hero
- se recalibra la primera pareja ornamental con assets más luminosos, mayor presencia inicial y precarga reforzada para que no se pierda al entrar en la primera frase
- la capa ornamental se estabiliza finalmente con `next/image` usando imports estáticos locales, `sizes` explícito y carga eager en esta familia concreta de assets decorativos
- se actualizan `DESIGN.md`, la referencia técnica y el `decisions-log`

## Objetivo

Reforzar la atmósfera espacial de la banda de benefits manteniendo el copy como protagonista y sin introducir ciclos de opacidad autónomos que compitan con el scroll.

## Impacto

Cada frase del stage sticky queda ahora acompañada por dos masas visuales lilas detrás del titular, con comportamiento coordinado y coherente con el lenguaje dark-tech de Nebula.

## Validación

- `npx eslint components/home/value-proposition-statements.tsx`
- `npm run typecheck`
- `npm run build`

## Riesgos / seguimiento

- puede hacer falta ajustar posiciones o tamaños tras revisión visual fina en móvil y desktop
