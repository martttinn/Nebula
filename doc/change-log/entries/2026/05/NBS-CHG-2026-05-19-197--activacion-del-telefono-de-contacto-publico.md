---
change_id: NBS-CHG-2026-05-19-197
date: 2026-05-19
title: Activacion del telefono de contacto publico
group_id: NBS-TSK-2026-173
category: frontend
subcategories:
  - conversion
  - copy
  - docs
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
  - DESIGN.md
  - .agents/decisions-log.md
  - .agents/rules/01-project-context.md
  - AGENTS.md
  - doc/reference/domain-reference.md
  - doc/reference/technical-reference.md
  - doc/change-log/**
verification:
  - npm run lint
  - npm run typecheck
  - npm run build
  - smoke visual desktop en http://localhost:3001
  - smoke visual móvil en http://localhost:3001
  - npm run changes:sync
related_decisions:
  - El contacto público usa datos directos versionados
---

# Resumen corto

Se activa `+34 622 028 550` como teléfono público de contacto y se muestra en el footer junto al email confirmado.

## Contexto / problema

Martín confirmó el teléfono operativo de contacto. El footer ya tenía una columna de marca/contacto con email, pero el teléfono todavía no estaba centralizado ni visible como canal directo.

## Cambio realizado

- `lib/site.ts` añade `contactPhone` y `contactPhoneHref` con formato `tel:+34622028550`.
- `components/layout/footer.tsx` renderiza email y teléfono como enlaces directos dentro de la columna de contacto.
- La documentación de diseño, dominio, contexto operativo y referencia técnica recoge el teléfono confirmado.
- Se mantiene el CTA final de `#contacto` por email mientras no exista página de contacto, formulario o calendario.

## Objetivo

Exponer el teléfono real sin duplicar literals ni simular una capa de captación avanzada todavía inexistente.

## Impacto arquitectonico

El cambio queda acotado a configuración compartida, footer y documentación. No añade estado cliente, rutas nuevas, API, Supabase, middleware ni tratamiento de datos de leads.

## Desglose denso

- dato visible: `+34 622 028 550`
- href activo: `tel:+34622028550`
- fuente canónica: `siteConfig.contactPhone/contactPhoneHref`
- superficie visible: columna principal del footer
- canales pendientes: formulario, calendario, CRM y backend de captación

## Validacion

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- smoke visual desktop en `http://localhost:3001`
- smoke visual móvil en `http://localhost:3001`
- `npm run changes:sync`

## Pendientes / limites

`tel:` depende del dispositivo y navegador del usuario. No hay tracking de llamadas, atribución, feedback de contacto ni persistencia repo-local de leads.

## Notas para presupuesto

Entrega menor de contacto público con impacto directo en conversión básica, sin coste de backend ni integraciones externas.
