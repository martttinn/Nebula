---
change_id: NBS-CHG-2026-05-19-198
date: 2026-05-19
title: Hover de contacto en el footer
group_id: NBS-TSK-2026-174
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

Se añaden efectos de hover y focus a la información de contacto del footer.

## Contexto / problema

Martín pidió que la información de contacto del footer tuviera efectos de hover. El footer ya mostraba email y teléfono, pero su interacción era demasiado plana respecto al resto del lenguaje visual de Nebula.

## Cambio realizado

- El enlace de email y el de teléfono pasan a funcionar como grupos interactivos.
- El icono activa borde lila, glow contenido, fondo sutil y microelevación visual.
- El texto activa un subrayado fino progresivo.
- El estado `focus-visible` replica la affordance para navegación por teclado.
- `DESIGN.md` recoge que esta microinteracción no debe cambiar el espacio ocupado ni convertir el bloque en card.

## Objetivo

Mejorar la affordance de contacto sin alterar estructura, contenido, rutas ni datos confirmados.

## Impacto arquitectonico

El cambio queda acotado a clases de Tailwind dentro de `components/layout/footer.tsx`. No introduce client component, estado, JavaScript nuevo, dependencias, APIs ni backend.

## Desglose denso

- superficie: columna principal de contacto del footer
- elementos: email y teléfono
- hover: icon glow + subrayado progresivo
- focus: ring accesible y feedback equivalente
- layout: sin cambios de grid ni dimensiones estructurales

## Validacion

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- smoke visual hover desktop en `http://localhost:3001`
- `npm run changes:sync`

## Pendientes / limites

En dispositivos táctiles el hover no es el canal principal de feedback. El enlace mantiene el comportamiento nativo de tap sobre `mailto:` y `tel:`.

## Notas para presupuesto

Pulido visual pequeño, centrado en interacción y percepción de calidad del footer.
