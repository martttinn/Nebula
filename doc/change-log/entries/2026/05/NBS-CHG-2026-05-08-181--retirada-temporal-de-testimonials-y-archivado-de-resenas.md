---
change_id: NBS-CHG-2026-05-08-181
date: 2026-05-08
title: Retirada temporal de testimonials y archivado de reseñas
group_id: NBS-TSK-2026-157
category: frontend
subcategories:
  - feature
origin: client-request
complexity: medium
scope: cross-cutting
user_visible: true
release_impacts:
  - frontend-runtime
  - docs
architecture_layers:
  - app
  - components
  - docs
  - web
backend_sensitive: false
files_touched:
  - app/page.tsx
  - components/home/testimonials/**
  - DESIGN.md
  - .agents/decisions-log.md
  - doc/reference/**
  - doc/change-log/**
verification:
  - npm run changes:sync
  - npm run lint
  - npm run typecheck
  - npm run build
related_decisions:
---

# Resumen corto

La sección pública `testimonials` desaparece completamente de la home y las reseñas verificadas pasan a un archivo de contenido preparado para su futura reintegración.

## Contexto / problema

Martín decidió no seguir iterando sobre la sección actual de `testimonials` y pidió retirarla por completo para reconstruirla desde cero. Borrarla sin más habría supuesto perder el contenido ya aprobado o dejar documentación afirmando que la home todavía mostraba esa surface.

## Cambio realizado

- se elimina `TestimonialsSection` del runtime de `app/page.tsx`
- se retira la implementación visual previa de `components/home/testimonials/index.tsx`
- el antiguo catálogo activo se sustituye por `components/home/testimonials/archive.ts`, que conserva las tres reseñas verificadas como archivo repo-safe
- se actualizan `DESIGN.md`, `technical-reference`, `domain-reference` y `decisions-log` para reflejar que la home ya no monta esta sección

## Objetivo

Dejar la home libre de una surface que va a rediseñarse desde cero, sin perder las citas reales ya confirmadas ni dejar drift entre runtime y documentación.

## Impacto arquitectonico

Se simplifica el árbol público de la home y se convierte `components/home/testimonials/` en una carpeta de archivo de contenido mientras no exista una nueva primitive activa. No cambia ningún contrato backend ni se toca la capa de datos futura.

## Validacion

- `npm run changes:sync`
- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Pendientes / limites

- la home queda temporalmente sin prueba social visible
- la futura reconstrucción deberá definir desde cero la nueva primitive de `testimonials`

## Notas para presupuesto

Trabajo visible y estructural: desmontaje de una sección pública completa, preservación del contenido aprobado y alineación documental de varias capas del repo.
