---
change_id: NBS-CHG-2026-05-03-027
date: 2026-05-03
title: Uso del símbolo dark como icono del sitio
group_id: NBS-TSK-2026-027
category: frontend
subcategories:
  - branding
  - metadata
  - assets
origin: client-request
complexity: low
scope: route-local
user_visible: true
release_impacts:
  - frontend-runtime
architecture_layers:
  - web
  - docs
backend_sensitive: false
files_touched:
  - app/icon.svg
  - app/favicon.ico
  - doc/reference/technical-reference.md
  - doc/change-log/**
verification:
  - npm run build
---

# Resumen corto

La web pública pasa a usar el símbolo oficial oscuro de Nebula como icono del sitio mediante la convención `app/icon.svg` de Next.js.

## Contexto / problema

Martín pidió reemplazar el favicon heredado por el símbolo de marca `nebula-dark.svg`.

## Cambio realizado

- se elimina `app/favicon.ico`
- se añade `app/icon.svg` con el símbolo oficial oscuro
- se actualiza la referencia técnica para reflejar la convención real activa

## Objetivo

Alinear el icono visible del sitio con la identidad de marca ya usada en la navegación y en los assets públicos.

## Impacto arquitectónico

El cambio migra la metadata de icono desde un asset `ico` heredado a la convención moderna file-based de Next.js para SVG.

## Validación

- `npm run build`

## Pendientes / límites

- no se ha añadido en este cambio un `apple-icon` específico

## Notas para presupuesto

Ajuste pequeño de branding y metadata sin impacto funcional en navegación o contenido.
