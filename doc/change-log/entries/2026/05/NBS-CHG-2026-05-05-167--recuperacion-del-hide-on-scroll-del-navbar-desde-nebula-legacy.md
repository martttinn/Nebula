---
change_id: NBS-CHG-2026-05-05-167
group_id: NBS-TSK-2026-145
date: 2026-05-05
title: Recuperacion del hide on scroll del navbar desde nebula-legacy
type: ui
status: done
owner: Codex
tags:
  - navbar
  - navigation
  - motion
  - responsive
  - ui
---

# Contexto

Martín pidió que el navbar actual recuperase el mismo comportamiento de `hide on scroll down / reappear on scroll up` usado en `nebula-legacy`, manteniendo el shell visual y el menú responsive ya integrados en la web pública nueva.

## Cambio realizado

- se convierte `components/layout/navbar.tsx` en componente cliente para observar `window.scrollY`
- se replica la regla base de `nebula-legacy`: el navbar se mantiene visible cerca del top, reaparece al remontar y se oculta al seguir descendiendo más allá del umbral
- se anima la traslación vertical del shell con `framer-motion`
- se eleva el estado abierto del menú responsive desde `StaggeredMenu` hasta `Navbar` para impedir que la cabecera desaparezca mientras el panel móvil o tablet está abierto
- se actualizan `DESIGN.md`, `doc/reference/technical-reference.md` y `.agents/decisions-log.md` para reflejar el comportamiento recuperado

## Objetivo

Reducir la presencia visual del navbar durante la lectura en scroll manteniendo una recuperación inmediata al remontar y una experiencia consistente en móvil, tablet y desktop.

## Impacto

La navegación global se comporta de forma más contenida y más alineada con el patrón histórico de Nebula, sin introducir una segunda solución distinta para la versión responsive.

## Validación

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Riesgos / seguimiento

- no se ha hecho revisión visual manual en navegador dentro de esta tarea, por lo que el ajuste fino de timing y distancia de ocultación debe validarse después en runtime real
