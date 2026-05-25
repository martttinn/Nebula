---
change_id: NBS-CHG-2026-05-25-224
date: 2026-05-25
title: Adición de vídeo demo de proyecto
group_id: NBS-TSK-2026-200
category: frontend
subcategories:
  - assets
  - portfolio
  - visual-system
origin: client-request
complexity: low
scope: local
user_visible: true
release_impacts:
  - docs
  - frontend-runtime
architecture_layers:
  - components
  - docs
backend_sensitive: false
files_touched:
  - videofn.MP4
  - doc/change-log/entries/2026/05/NBS-CHG-2026-05-25-224--adicion-de-video-demo-de-proyecto.md
  - doc/change-log/groups/2026/NBS-TSK-2026-200.md
verification:
  - file videofn.MP4
  - npm run changes:sync
related_decisions:
---

# Resumen corto

Se añade `videofn.MP4` como asset de vídeo local.

## Contexto / problema

Tras el primer commit y push apareció un nuevo vídeo sin trackear en el worktree. Martín pidió commitear y pushear todo el worktree, por lo que se incorpora en una segunda entrega.

## Cambio realizado

Se versiona `videofn.MP4` y se registra la entrega en el change-log repo-local.

## Objetivo

Dejar disponible el asset audiovisual para una futura integración de demo de proyecto.

## Impacto arquitectonico

No hay cambio arquitectónico. El vídeo no está referenciado todavía por ningún componente.

## Desglose denso

- `videofn.MP4` es un contenedor MP4 de 11 MB aproximadamente
- el archivo se encuentra en la raíz del repo en este commit
- para uso público en Next.js habrá que moverlo a `public/` o definir una estrategia explícita de serving

## Validacion

- `file videofn.MP4`
- `npm run changes:sync`

## Pendientes / limites

Pendiente ubicar el vídeo en una ruta pública estable antes de reproducirlo dentro de mockups 3D o HTML.

## Notas para presupuesto

Alta de asset de vídeo para futuras demos de portfolio.
