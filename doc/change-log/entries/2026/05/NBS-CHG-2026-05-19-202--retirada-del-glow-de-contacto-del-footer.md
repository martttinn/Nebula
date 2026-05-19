---
change_id: NBS-CHG-2026-05-19-202
date: 2026-05-19
title: Retirada del glow de contacto del footer
group_id: NBS-TSK-2026-178
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

Se elimina el glow restante del hover en la información de contacto del footer.

## Contexto / problema

Después de retirar el subrayado y el brillo blanco interno, Martín pidió eliminar también el glow del efecto hover de email y teléfono.

## Cambio realizado

- Se retira la sombra luminosa del wrapper del icono en `hover` y `focus-visible`.
- Se mantiene el borde activo, el fondo lila sutil, el cambio de color y la escala ligera.
- `DESIGN.md` deja explícito que el contacto del footer no debe usar glow ni sombra luminosa.

## Objetivo

Dejar la interacción de contacto sobria, limpia y sin halos.

## Impacto arquitectonico

El cambio queda acotado a clases Tailwind de `components/layout/footer.tsx` y documentación visual. No introduce dependencias, estado, rutas, APIs ni backend.

## Desglose denso

- superficie: columna de contacto del footer
- elementos afectados: email y teléfono
- eliminado: `box-shadow` de hover/focus en el icono
- conservado: borde, fondo, color, escala y foco visible

## Validacion

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- smoke visual hover desktop en `http://localhost:3001`
- `npm run changes:sync`

## Pendientes / limites

No quedan sombras luminosas en el hover de la información de contacto. Los botones sociales mantienen sus propios hovers porque pertenecen a otra superficie visual.

## Notas para presupuesto

Pulido visual pequeño y acotado a una microinteracción concreta.
