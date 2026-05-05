---
change_id: NBS-CHG-2026-05-04-062
date: 2026-05-04
title: Retirada de StarBorder del CTA Contactar del navbar
group_id: NBS-TSK-2026-062
category: frontend
subcategories:
  - refactor
  - hardening
origin: client-request
complexity: low
scope: local
user_visible: true
release_impacts:
  - frontend-runtime
architecture_layers:
  - components
  - web
  - docs
backend_sensitive: false
files_touched:
  - components/layout/navbar.tsx
  - components/ui/button.tsx
  - components/ui/star-border.tsx
  - components/ui/star-border.module.css
  - DESIGN.md
  - .agents/decisions-log.md
  - doc/reference/technical-reference.md
  - doc/change-log/**
verification:
  - npm run lint
  - npm run typecheck
  - npm run build
---

# Resumen corto

El CTA `Contactar` del navbar deja de usar `StarBorder`, pasa a apoyarse en la primitive estándar `Button` y la primitive específica del borde animado se elimina del repo.

## Contexto / problema

Martín pidió eliminar `StarBorder`. En el estado actual del repo, esa primitive solo tenía un consumo runtime: el CTA desktop `Contactar` del navbar. Mantenerla sin más usos convertía el efecto en deuda visual y técnica innecesaria.

## Cambio realizado

- `components/layout/navbar.tsx` sustituye `StarBorder` por `Button`
- el CTA conserva composición outlined transparente en reposo y hover blanco con texto negro
- se eliminan `components/ui/star-border.tsx` y `components/ui/star-border.module.css`
- se alinea la documentación viva y el `decisions-log` con el nuevo estado

## Objetivo

Simplificar la UI pública y retirar una primitive especializada que ya no aportaba suficiente valor frente a su coste de mantenimiento.

## Impacto arquitectónico

La capa de botones se simplifica alrededor de una única primitive reusable pública. El navbar pierde una dependencia visual específica y el catálogo UI reduce superficie muerta.

## Desglose denso

- el CTA de desktop sigue siendo el único botón del navbar, pero ahora usa `components/ui/button.tsx`
- el estilo resultante mantiene shell transparente, borde claro y microescala suave en hover
- al desaparecer el único consumer runtime, `StarBorder` se elimina del repo en vez de quedar como primitive huérfana
- `DESIGN.md` deja de tratar `button-star-border` como primitive vigente

## Validación

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Pendientes / límites

- no se ha ejecutado `npm run changes:sync` porque los scripts `changes:*` siguen documentados pero no existen en `package.json`

## Notas para presupuesto

Refactor visual pequeño pero real: combina simplificación de runtime público, retirada de código sin uso y alineación documental de la librería UI.
