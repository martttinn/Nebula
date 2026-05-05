---
change_id: NBS-CHG-2026-05-03-033
date: 2026-05-03
title: Corrección del recorte visible del pulso de `StarBorder`
group_id: NBS-TSK-2026-033
category: frontend
subcategories:
  - components
  - bugs
  - motion
origin: client-request
complexity: low
scope: cross-cutting
user_visible: true
release_impacts:
  - frontend-runtime
architecture_layers:
  - components
  - web
  - docs
backend_sensitive: false
files_touched:
  - components/ui/star-border.module.css
  - doc/change-log/**
verification:
  - npm run lint
  - npm run build
  - npm run typecheck
---

# Resumen corto

Se corrige el recorte de las bandas visibles del pulso de `StarBorder`, que había quedado invertido y ocultaba por completo la animación superior e inferior.

## Contexto / problema

Tras acotar el pulso al perímetro exterior, el recorte de las capas superior e inferior se aplicó sobre el lado equivocado de cada gradiente, dejando visible la zona que estaba fuera del contenedor y ocultando la que realmente entraba en pantalla.

## Cambio realizado

- se invierte el `clip-path` de `gradientTop`
- se invierte el `clip-path` de `gradientBottom`

## Objetivo

Recuperar la visibilidad del pulso lila manteniendo la corrección previa que evita que el destello invada el interior transparente del botón.

## Impacto arquitectónico

Bugfix visual localizado sobre la primitive reusable `StarBorder`, sin cambios de API ni de integración.

## Validación

- `npm run lint`
- `npm run build`
- `npm run typecheck`

## Pendientes / límites

- la validación hecha aquí es estática; si quieres, el siguiente paso razonable es comprobación visual en navegador del CTA real del navbar

## Notas para presupuesto

Corrección visual menor sobre primitive reusable.
