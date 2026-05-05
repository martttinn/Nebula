---
change_id: NBS-CHG-2026-05-03-002
date: 2026-05-03
title: Normalización de Supabase para Next.js y bootstrap local de migraciones
group_id: NBS-TSK-2026-002
category: infra
subcategories:
  - hardening
  - schema
  - ops
origin: client-request
complexity: medium
scope: cross-cutting
user_visible: false
release_impacts:
  - server-runtime
architecture_layers:
  - data
  - backend
  - docs
  - tooling
  - web
backend_sensitive: true
files_touched:
  - package.json
  - package-lock.json
  - .env.example
  - lib/supabase/**
  - supabase/**
  - middleware.ts
  - lib/site.ts
  - app/robots.ts
  - README.md
  - AGENTS.md
  - .agents/**
  - doc/reference/technical-reference.md
  - doc/change-log/**
verification:
  - npm run lint
  - npm run build
  - npm run typecheck
related_decisions:
  - "2026-05-03 — Supabase queda bootstrappeado en el repo con CLI, env moderno y carpeta de migraciones"
---

# Resumen corto

Se audita la integración actual de Supabase, se alinea el patrón SSR con la guía vigente para Next.js y se introduce el directorio `supabase/` versionado con soporte básico de migraciones.

## Contexto / problema

El repo ya tenía `@supabase/ssr` y utilidades en `lib/supabase/**`, pero la instalación estaba incompleta para un flujo serio de 2026: no existía `supabase/config.toml`, no había carpeta de migraciones, el script de tipos apuntaba a un `project id` hardcodeado y la capa SSR seguía usando directamente `NEXT_PUBLIC_SUPABASE_ANON_KEY` sin helper de entorno ni adaptación al patrón más reciente de Supabase.

## Cambio realizado

- se añade Supabase CLI como dependencia de desarrollo y se inicializa `supabase/config.toml`
- se crean `supabase/seed.sql` y `supabase/migrations/` para versionado repo-safe
- se normalizan `lib/supabase/client.ts`, `server.ts` y `middleware.ts`
- se introduce `lib/supabase/env.ts` para priorizar `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` con fallback transitorio a `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- se introduce `lib/supabase/types.ts` como bootstrap tipado hasta generar tipos reales
- se actualiza `.env.example` y `package.json` con scripts operativos
- se corrige `lib/site.ts` para que `robots.ts` y `sitemap.ts` puedan compilar

## Objetivo

Dejar una base coherente con los estándares actuales de Supabase para Next.js y con el patrón que ya siguen otros proyectos locales donde las migraciones sí están versionadas.

## Impacto arquitectónico

El repo pasa de tener una integración de Supabase parcial y no versionable a disponer de:

- capa SSR preparada para cliente, servidor y middleware
- punto único de lectura de variables públicas de Supabase
- directorio `supabase/` listo para trabajo local y futuras migraciones
- scripts de CLI suficientes para arrancar, parar, consultar estado y generar tipos

## Desglose denso

- frente a `web-leones`, este repo ahora converge en helper de entorno, cliente SSR moderno y versionado de migraciones, aunque sigue sin un esquema real generado
- frente a `trabajo_pis`, se evita seguir anclado al patrón antiguo basado solo en `anon key`
- se mantiene compatibilidad con env legacy para no romper proyectos que aún no hayan migrado a publishable keys
- se deja explícito en documentación que esta base no equivale todavía a un backend live ni a auth activada en producción

## Validación

- `npm run lint`
- `npm run build`
- `npm run typecheck`

## Pendientes / límites

- no se ha vinculado ningún proyecto Supabase remoto en este scope
- no existe todavía una primera migración SQL real, solo la carpeta preparada para versionarla
- no se han ejecutado `supabase start` ni comandos contra Docker en esta tarea
- el tooling documentado de `change-log` sigue ausente en `package.json`, así que el índice se ha actualizado manualmente

## Notas para presupuesto

Entrega estructural orientada a evitar deuda futura: mezcla auditoría técnica, hardening de integración, bootstrap de tooling y corrección de drift documental mínimo.
