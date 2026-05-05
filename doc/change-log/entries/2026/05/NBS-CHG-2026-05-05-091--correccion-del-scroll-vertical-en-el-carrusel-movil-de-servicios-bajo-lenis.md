---
change_id: NBS-CHG-2026-05-05-091
group_id: NBS-TSK-2026-091
date: 2026-05-05
title: Correccion del scroll vertical en el carrusel movil de servicios bajo Lenis
type: fix
status: done
owner: Codex
tags:
  - mobile
  - services
  - scroll
  - lenis
---

# Contexto

En móvil, al intentar hacer scroll vertical sobre la zona del carrusel de servicios, el documento dejaba de desplazarse. El carrusel tenía un opt-out total de `Lenis`, adecuado para preservar scroll anidado, pero demasiado agresivo para una superficie que debía conservar swipe horizontal local y permitir scroll vertical del documento.

## Cambio realizado

- se reemplaza `data-lenis-prevent` por `data-lenis-prevent-touch` en el shell móvil del carrusel
- se documenta el criterio correcto: usar opt-out granular por tipo de input cuando una superficie táctil necesita convivir con el scroll raíz

## Objetivo

Permitir que el usuario desplace la página en vertical aunque inicie el gesto sobre el carrusel móvil, sin perder el swipe horizontal nativo entre cards.

## Impacto

La experiencia móvil deja de atascarse en una sección crítica de la home y el smooth scroll global mantiene mejor compatibilidad con scrolls anidados táctiles.

## Validación

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Riesgos / seguimiento

- si aparecen más sliders o superficies táctiles anidadas, deben evaluarse con la misma lógica antes de aplicar bloqueos totales de `Lenis`
