---
change_id: NBS-CHG-2026-05-11-185
date: 2026-05-11
title: Ajuste de copy del CTA final de contacto
group_id: NBS-TSK-2026-161
category: frontend
subcategories:
  - copy
  - cta
origin: client-request
complexity: low
scope: component-local
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
  - DESIGN.md
  - .agents/rules/01-project-context.md
  - .agents/decisions-log.md
  - components/home/testimonials/cta.ts
  - components/home/testimonials/index.tsx
  - doc/reference/**
  - doc/change-log/**
verification:
  - npm run lint
  - npm run changes:sync
related_decisions:
---

# Resumen corto

Se ajusta el copy visible y el estado interactivo del CTA final de la home dentro de la última card de `testimonials`.

## Contexto / problema

Martín eligió una variante de copy más directa para el cierre comercial de la home, orientada a transformar procesos de negocio en un sistema digital. Después pidió que el botón fuese clicable, pero sin establecer todavía ninguna ruta de redirección. En una iteración posterior pidió retirar el subtítulo para dejar el cierre más sintético.

## Cambio realizado

- `components/home/testimonials/cta.ts` actualiza eyebrow, title y button label del CTA final.
- `components/home/testimonials/index.tsx` retira el párrafo de subtítulo y ajusta el margen del botón bajo el título.
- `components/home/testimonials/index.tsx` retira el estado `disabled` del botón y lo deja como `button` clicable sin `Link` ni navegación asociada.
- Se registra la entrega como ajuste de copy independiente del grupo original de integración del CTA, que ya estaba cerrado.

## Objetivo

Elevar la claridad comercial del cierre de la home con un mensaje más alineado con consultoría, análisis de procesos y construcción de software mantenible.

## Impacto arquitectonico

No hay impacto arquitectónico. La constante de copy sigue viviendo en el owner local de la sección `components/home/testimonials/`, y el botón continúa sin acoplarse a una ruta mientras no exista el flujo real de contacto.

## Desglose denso

- eyebrow: `Siguiente paso`
- title: `Transforma tu negocio en un sistema.`
- subtitle: eliminado
- button label: `Solicitar consultoría`
- button behavior: clicable, sin ruta de redirección

## Validacion

- `npm run lint`
- `npm run changes:sync`

## Pendientes / limites

El botón queda clicable pero sin acción de navegación. Si se activa un canal real de contacto o una página `/contacto`, hará falta una iteración específica sobre ruta, feedback y conversión.

## Notas para presupuesto

Ajuste visible de copy y affordance del CTA con valor de conversión, acotado a la card final y sin cambio estructural del runtime.
