---
change_id: NBS-CHG-2026-05-09-184
date: 2026-05-09
title: Integracion del footer de marca y navegacion compartida
group_id: NBS-TSK-2026-160
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
  - data
  - docs
  - web
backend_sensitive: false
files_touched:
  - app/page.tsx
  - components/layout/footer.tsx
  - components/layout/brand-lockup.tsx
  - components/layout/navbar.tsx
  - components/layout/navbar-staggered-menu.tsx
  - data/navigation.ts
  - DESIGN.md
  - .agents/rules/01-project-context.md
  - .agents/decisions-log.md
  - doc/reference/**
  - doc/change-log/**
verification:
  - npm run lint
  - npm run typecheck
  - npm run build
  - npm run changes:sync
related_decisions:
  - El footer público adopta cierre de marca + navegación con catálogo compartido
---

# Resumen corto

La home de Nebula añade un footer de marca + navegación al final del documento, con links públicos compartidos con el navbar y destinos legales visibles pero desactivados.

## Contexto / problema

La web no tenía ningún footer implementado. Martín pidió diseñar un cierre de marca + navegación, reutilizar los mismos links del navbar y añadir `Términos y condiciones` y `Política de privacidad`, pero sin inventar todavía páginas legales publicadas.

## Cambio realizado

- se crea `components/layout/footer.tsx` como nuevo cierre público de la home
- se extrae `components/layout/brand-lockup.tsx` para reutilizar el mismo lockup de marca en navbar y footer
- se crea `data/navigation.ts` como fuente de verdad para la navegación pública y los links legales
- `components/layout/navbar.tsx` y `components/layout/navbar-staggered-menu.tsx` pasan a consumir ese catálogo compartido
- el footer se integra al final de `app/page.tsx`
- los links legales se muestran visibles pero desactivados, con affordance explícita de estado no operativo
- se actualizan `DESIGN.md`, contexto de proyecto, referencias y `decisions-log`

## Objetivo

Cerrar la home con una surface clara y premium que refuerce marca y navegación sin añadir ruido visual, y dejar la estructura preparada para que los destinos legales puedan activarse más adelante sin refactor de shells globales.

## Impacto arquitectonico

Navbar y footer dejan de duplicar enlaces a mano y pasan a depender de un catálogo compartido en `data/navigation.ts`. El lockup de marca también deja de vivir embebido en `navbar.tsx`, lo que reduce drift visual entre shells globales y simplifica futuras extensiones.

## Desglose denso

- `components/layout/footer.tsx` compone un cierre de dos zonas: marca/claim/copyright a la izquierda y navegación/legales a la derecha, con degradación a composición centrada en móvil
- `components/layout/brand-lockup.tsx` concentra la primitive del símbolo oscuro + palabra `Nebula`
- `data/navigation.ts` centraliza `PUBLIC_NAV_LINKS`, `PUBLIC_NAV_CTAS` y `FOOTER_LEGAL_LINKS`
- `navbar.tsx` deja de declarar sus arrays internos y pasa a consumir el catálogo compartido
- `navbar-staggered-menu.tsx` también adopta el tipo compartido `PublicNavLink`
- el footer usa los mismos links públicos del navbar y añade dos placeholders legales desactivados
- `DESIGN.md` formaliza el footer como surface canónica del sistema visual
- referencias y `change-log` quedan alineados con el nuevo estado real del runtime

## Validacion

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm run changes:sync`

## Pendientes / limites

- `Precios`, `Nosotros` y `Blog` siguen apuntando a anclas futuras ya existentes en navbar; el footer mantiene ese mismo estado a propósito
- `Términos y condiciones` y `Política de privacidad` siguen siendo placeholders visibles mientras sus rutas no existan
- la comprobación visual interactiva en navegador queda pendiente si Martín quiere afinar densidad, espaciado o jerarquía final del footer

## Notas para presupuesto

Entrega visible con valor estructural: diseño e integración del footer, consolidación de navegación compartida y preparación de destinos legales futuros sin publicar falsas rutas.
