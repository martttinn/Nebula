---
change_id: NBS-CHG-2026-05-19-201
date: 2026-05-19
title: Limpieza del hover de contacto del footer
group_id: NBS-TSK-2026-177
category: frontend
subcategories:
  - hover
  - interaction
  - ui
origin: client-request
complexity: low
scope: component-level
user_visible: true
release_impacts:
  - frontend-runtime
  - docs
architecture_layers:
  - components
  - docs
  - web
backend_sensitive: false
files_touched:
  - components/layout/footer.tsx
  - DESIGN.md
  - doc/change-log/**
verification:
  - npm run lint
  - npm run typecheck
  - npm run build
  - smoke visual hover desktop en http://localhost:3001
  - npm run changes:sync
related_decisions:
---

# Resumen corto

Se elimina la línea bajo email/teléfono y el brillo blanco interno del icono en el hover de contacto del footer.

## Contexto / problema

Martín pidió retirar dos detalles visuales del hover de contacto: la línea que aparecía debajo del correo/teléfono y el glow blanco que aparecía dentro del icono al interactuar.

## Cambio realizado

- El texto de email y teléfono deja de renderizar el pseudo-elemento de subrayado progresivo.
- El icono deja de montar la capa radial blanca interna en hover/focus.
- Se mantiene el feedback de borde, fondo lila sutil, color y movimiento ligero.
- `DESIGN.md` se actualiza para que el canon del footer no vuelva a pedir subrayado ni brillo blanco interno.

## Objetivo

Dejar la microinteracción más limpia y menos ruidosa sin perder affordance de enlace.

## Impacto arquitectonico

El cambio queda acotado a clases y markup de `components/layout/footer.tsx` más documentación visual. No introduce estado, JavaScript, dependencias, rutas ni backend.

## Desglose denso

- superficie: columna de contacto del footer
- elementos afectados: email y teléfono
- eliminado: subrayado bajo texto
- eliminado: capa radial blanca sobre icono
- conservado: hover de color, borde activo, fondo sutil y foco visible

## Validacion

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- smoke visual hover desktop en `http://localhost:3001`
- `npm run changes:sync`

## Pendientes / limites

No se elimina la sombra lila del icono porque la petición especificó el glow blanco. Si la sombra lila también molesta visualmente, debe retirarse explícitamente.

## Notas para presupuesto

Pulido visual pequeño de microinteracción, sin impacto funcional.
