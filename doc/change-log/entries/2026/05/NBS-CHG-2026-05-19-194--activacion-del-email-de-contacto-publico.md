---
change_id: NBS-CHG-2026-05-19-194
date: 2026-05-19
title: Activacion del email de contacto publico
group_id: NBS-TSK-2026-170
category: frontend
subcategories:
  - cta
  - conversion
  - docs
origin: client-request
complexity: low
scope: cross-cutting
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
  - AGENTS.md
  - DESIGN.md
  - .agents/decisions-log.md
  - .agents/rules/01-project-context.md
  - components/home/testimonials/index.tsx
  - lib/site.ts
  - doc/reference/domain-reference.md
  - doc/reference/technical-reference.md
  - doc/change-log/**
verification:
  - npm run lint
  - npm run typecheck
  - npm run build
  - npm run changes:sync
related_decisions:
  - 2026-05-19 — El contacto público usa email directo versionado
---

# Resumen corto

Se activa `hola@somosnebula.com` como email público de contacto y el CTA final de la home abre ese canal mediante `mailto:`.

## Contexto / problema

Martín confirmó el correo de contacto del estudio. Hasta ahora el cierre `#contacto` vivía integrado como última card de `testimonials`, pero el botón final era solo una affordance visual porque no existían página `/contacto`, formulario ni canal comercial versionado.

## Cambio realizado

- `lib/site.ts` añade `contactEmail` y `contactHref` para centralizar el dato público.
- `components/home/testimonials/index.tsx` convierte el botón `Solicitar consultoría` en enlace `mailto:hola@somosnebula.com`.
- `DESIGN.md`, `.agents/rules/01-project-context.md`, `.agents/decisions-log.md`, `AGENTS.md` y `doc/reference/**` se actualizan para reflejar que existe email directo, pero no formulario, calendario, CRM ni backend de captación.

## Objetivo

Dar al visitante un siguiente paso operativo y honesto sin sobredimensionar la arquitectura ni fingir un flujo avanzado que todavía no existe.

## Impacto arquitectonico

El cambio mantiene el runtime como landing pública estática. No introduce rutas, API, Supabase, middleware ni tratamiento de datos de leads. La única nueva fuente canónica es `siteConfig.contactEmail/contactHref`, consumida por la card final de contacto.

## Desglose denso

- email confirmado: `hola@somosnebula.com`
- href activo: `mailto:hola@somosnebula.com`
- navegación principal: se mantiene en `/#contacto` para llevar al usuario al cierre comercial dentro de la home
- CTA final: abre el cliente de correo desde la última card de `testimonials`
- documentación: deja de presentar el email como pendiente y conserva como pendientes formulario, calendario, CRM y página de contacto

## Validacion

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm run changes:sync`

## Pendientes / limites

`mailto:` depende del cliente de correo del usuario y no aporta métricas, estado de envío ni persistencia. Si se quiere medir conversión o cualificar leads, hará falta una iteración específica con página de contacto, formulario validado, consentimiento, protección anti-spam y/o calendario.

## Notas para presupuesto

Entrega de bajo coste y alto impacto comercial relativo: activa el contacto real y corrige documentación asociada sin tocar backend sensible ni añadir dependencias.
