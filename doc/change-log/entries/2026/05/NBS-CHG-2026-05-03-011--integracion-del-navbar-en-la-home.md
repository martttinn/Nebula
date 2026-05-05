---
change_id: NBS-CHG-2026-05-03-011
date: 2026-05-03
title: Integración del navbar en la home
group_id: NBS-TSK-2026-011
category: frontend
subcategories:
  - feature
  - layout
origin: client-request
complexity: low
scope: route-level
user_visible: true
release_impacts:
  - frontend-runtime
architecture_layers:
  - routes
  - web
  - docs
backend_sensitive: false
files_touched:
  - app/page.tsx
  - doc/reference/technical-reference.md
  - doc/change-log/**
verification:
  - npm run lint
  - npm run build
  - npm run typecheck
---

# Resumen corto

Se integra el navbar reusable en la home pública de Nebula Studios.

## Contexto / problema

El navbar pill ya existía como primitive global reusable, pero todavía no estaba montado en ninguna superficie real del runtime.

## Cambio realizado

- se importa y renderiza `Navbar` en `app/page.tsx`
- la home pasa a mostrar navegación visible sobre el hero
- se actualiza la referencia técnica para reflejar el estado actual del runtime

## Objetivo

Empezar a usar la primitive global de navegación en la página principal sin convertirla todavía en un shell obligatorio para todo el sitio.

## Impacto arquitectónico

La integración demuestra reutilización real del componente global y mantiene la opción de decidir más adelante si debe vivir en la home solamente o subir al layout raíz.

## Desglose denso

- `app/page.tsx` deja de renderizar únicamente `Hero`
- la navegación se monta como capa fija por encima del hero existente
- no se alteran todavía los destinos por defecto ni la estructura del navbar

## Validación

- `npm run lint`
- `npm run build`
- `npm run typecheck`

## Pendientes / límites

- el navbar sigue teniendo destinos provisionales hasta cerrar la IA final del sitio
- no se ha promovido todavía a `app/layout.tsx`

## Notas para presupuesto

Entrega pequeña de integración visual y estructural, orientada a poner en uso una primitive reusable ya construida.
