---
change_id: NBS-CHG-2026-05-06-102
group_id: NBS-TSK-2026-102
date: 2026-05-06
title: Sustitucion del carrusel movil de servicios por una lista vertical
type: ui
status: done
owner: Codex
tags:
  - mobile
  - services
  - responsive
  - ui
---

# Contexto

En móvil, la sección de servicios seguía usando un carrusel horizontal. Aunque visualmente encajaba, añadía fricción de navegación y competía con el scroll vertical natural del documento.

## Cambio realizado

- se extrae un shell visual compartido para las cards de servicios
- desktop mantiene el arco sticky actual
- móvil reemplaza el carrusel horizontal por una lista vertical de cards completas
- se conservan iconos 3D, CTA `Ver más`, `BorderGlow` y partículas del hero
- se actualiza el canon visual y la referencia técnica para reflejar el nuevo patrón responsive

## Objetivo

Permitir que la sección de servicios en móvil se recorra con scroll vertical nativo, sin depender de gestos horizontales ocultos para descubrir el catálogo completo.

## Impacto

La experiencia móvil gana claridad y reduce fricción. Todas las cards quedan visibles en secuencia vertical, mientras desktop preserva la variante diferencial en arco.

## Validación

- `npm run typecheck`
- `npm run build`

## Riesgos / seguimiento

- conviene revisar la densidad vertical final en pantallas pequeñas para asegurarse de que el stack mantiene suficiente aire entre cards
