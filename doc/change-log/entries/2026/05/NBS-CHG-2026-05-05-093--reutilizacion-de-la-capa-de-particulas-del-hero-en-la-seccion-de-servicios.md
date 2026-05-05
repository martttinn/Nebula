---
change_id: NBS-CHG-2026-05-05-093
group_id: NBS-TSK-2026-093
date: 2026-05-05
title: Reutilizacion de la capa de particulas del hero en la seccion de servicios
type: ui
status: done
owner: Codex
tags:
  - home
  - services
  - hero
  - particles
  - ui
---

# Contexto

Martín pidió que la sección de servicios utilizara las mismas partículas ya presentes en el hero, evitando crear una nueva variante.

## Cambio realizado

- se importa la primitive `HeroParticles` dentro del `services-carousel`
- se monta en la capa sticky desktop de la sección
- se monta también en el framing móvil para conservar continuidad visual entre breakpoints
- se documenta explícitamente que servicios reutiliza la misma atmósfera del hero

## Objetivo

Mantener una continuidad visual clara entre hero y servicios sin duplicar lógica ni abrir otra familia de partículas.

## Impacto

La home gana cohesión atmosférica y el sistema reutiliza una primitive visual existente en lugar de introducir otra capa decorativa distinta.

## Validación

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Riesgos / seguimiento

- conviene revisar visualmente en desktop y móvil que la densidad de partículas no compita con las cards ni con el heading de servicios
