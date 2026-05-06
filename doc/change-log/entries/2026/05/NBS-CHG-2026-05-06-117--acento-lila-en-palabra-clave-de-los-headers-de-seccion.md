---
change_id: NBS-CHG-2026-05-06-117
date: 2026-05-06
title: Acento lila en palabra clave de los headers de seccion
group_id: NBS-TSK-2026-103
category: frontend
subcategories:
  - ui-ux-redesign
  - design-system
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
  - components/ui/section-title.tsx
  - components/home/services-carousel.tsx
  - DESIGN.md
  - doc/change-log/**
verification:
  - npm run lint
  - npm run typecheck
  - npm run build
---

# Resumen corto

Los headers principales de seccion pasan a usar una unica palabra en lila de marca mediante una primitive reutilizable, manteniendo el resto del titular en `Silver`.

## Contexto / problema

Martín pidió que los headers de seccion muestren una palabra destacada en el lila de marca. Hasta ahora ese patron no existia como primitive reutilizable y el enfasis cromatico no estaba resuelto como componente del sistema.

## Cambio realizado

- se crea `components/ui/section-title.tsx` como primitive para titulares con texto principal en blanco y una palabra clave en lila
- la cabecera de `Servicios` pasa a renderizar `Nuestros` en blanco y `Servicios` en lila
- `DESIGN.md` documenta el nuevo patron `section-heading` y su regla de uso

## Objetivo

Reforzar la identidad visual de marca en los titulares de seccion y evitar soluciones ad hoc con `span` sueltos en cada bloque.

## Impacto arquitectonico

El cambio introduce una primitive de UI pequena y reutilizable para headings de seccion. No altera datos, routing ni comportamiento backend.

## Desglose denso

- el nuevo componente recibe tres segmentos (`leadingText`, `accentText`, `trailingText`) para resolver tanto headings de dos palabras como frases mas largas
- el color de acento queda fijado al token `text-nebula-lilac`, alineado con el canon visual del repo
- la animacion de entrada local de `Servicios` se mantiene intacta; solo cambia el contenido interno del `h2`
- la regla documental deja claro que solo debe existir una palabra acentuada por heading y que debe recaer en el termino semantico principal

## Validacion

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Pendientes / limites

- futuras secciones pueden adoptar esta primitive sin repetir `span` sueltos ni reglas ad hoc
- `npm run changes:sync` sigue sin poder ejecutarse porque los scripts `changes:*` no existen hoy en `package.json`

## Notas para presupuesto

Refinamiento visual visible en runtime y consolidacion de una primitive reutilizable del sistema de UI para mantener coherencia de marca en secciones publicas.
