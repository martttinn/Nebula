---
change_id: NBS-CHG-2026-05-19-203
date: 2026-05-19
title: Ajuste de redes sociales del footer
group_id: NBS-TSK-2026-179
category: frontend
subcategories:
  - navigation
  - ui
  - copy
origin: client-request
complexity: low
scope: component-level
user_visible: true
release_impacts:
  - frontend-runtime
  - docs
architecture_layers:
  - components
  - data
  - docs
  - web
backend_sensitive: false
files_touched:
  - lib/site.ts
  - components/layout/footer.tsx
  - doc/reference/domain-reference.md
  - doc/change-log/**
verification:
  - npm run lint
  - npm run typecheck
  - npm run build
  - smoke visual desktop en http://localhost:3001
  - smoke visual móvil en http://localhost:3001
  - npm run changes:sync
related_decisions:
---

# Resumen corto

El footer queda con botones sociales solo para Instagram y LinkedIn.

## Contexto / problema

Martín aclaró que los botones sociales que deben aparecer son únicamente Instagram y LinkedIn, y confirmó el perfil de Instagram como `https://www.instagram.com/nebula_software_sudios/`. La iteración anterior también mostraba GitHub.

## Cambio realizado

- Se elimina `github` de `siteConfig.social`.
- Se actualiza `siteConfig.social.instagram` al perfil confirmado, normalizando la URL sin el parámetro `utm_source`.
- Se elimina el botón de GitHub del footer.
- Se elimina el icono SVG local de GitHub al quedarse sin uso.
- `domain-reference` documenta que los canales sociales visibles en footer son Instagram y LinkedIn.

## Objetivo

Alinear el footer con los canales sociales realmente pedidos, sin añadir salidas externas no deseadas.

## Impacto arquitectonico

El cambio queda acotado a configuración compartida, footer y documentación de dominio. No introduce rutas, APIs, estado cliente, backend ni cambios de layout.

## Desglose denso

- botones conservados: Instagram y LinkedIn
- botón retirado: GitHub
- Instagram: `https://www.instagram.com/nebula_software_sudios/`
- fuente canónica: `siteConfig.social`
- ubicación: columna principal del footer

## Validacion

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- smoke visual desktop en `http://localhost:3001`
- smoke visual móvil en `http://localhost:3001`
- `npm run changes:sync`

## Pendientes / limites

Si se quiere añadir otro canal social en el futuro, debe confirmarse explícitamente antes de versionarlo.

## Notas para presupuesto

Ajuste menor de contenido visual y limpieza de configuración.
