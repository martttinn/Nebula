---
change_id: NBS-CHG-2026-05-03-005
date: 2026-05-03
title: Desacoplamiento temporal de Supabase del runtime público durante la fase frontend
group_id: NBS-TSK-2026-005
category: infra
subcategories:
  - hardening
  - docs
  - developer-experience
origin: client-request
complexity: low
scope: cross-cutting
user_visible: false
release_impacts:
  - server-runtime
architecture_layers:
  - backend
  - docs
  - web
backend_sensitive: true
files_touched:
  - package.json
  - package-lock.json
  - eslint.config.mjs
  - .eslintrc.json
  - README.md
  - .env.example
  - app/page.tsx
  - components/home/grid-scan.tsx
  - components/home/grid-scan-shell.tsx
  - .agents/rules/01-project-context.md
  - .agents/decisions-log.md
  - doc/reference/technical-reference.md
  - doc/change-log/**
verification:
  - npm run lint
  - npm run build
  - npm run typecheck
related_decisions:
  - "2026-05-03 — Supabase queda aparcado fuera del runtime público hasta cerrar el frontend"
---

# Resumen corto

Se desconecta temporalmente Supabase del runtime público para poder iterar sobre el frontend de Nebula Studios sin dependencia efectiva de auth, cookies o variables de entorno de esa capa.

## Contexto / problema

Aunque el repo ya tenía un bootstrap moderno de Supabase, la única integración activa en runtime seguía interceptando requests públicas para preparar sesión y cookies de Supabase. Eso obligaba a mantener infraestructura mental y operativa de backend en una fase donde la prioridad real es cerrar primero la superficie pública.

## Cambio realizado

- se retira por completo el puente runtime de Supabase para que no exista `proxy` o `middleware` activo
- el runtime público pasa a responder sin conectar Supabase
- se corrige `npm run lint` para que use `eslint` directo y vuelva a ser compatible con `next@16`
- se migra la configuración de lint a `eslint.config.mjs` y se alinea el repo con `eslint@9`
- se corrige la integración de `GridScan` para que `dynamic(..., { ssr: false })` viva en una isla cliente compatible con Next.js 16
- `README.md`, `.env.example`, reglas de contexto y referencia técnica dejan explícito que el bootstrap sigue presente pero aparcado
- se registra la decisión operativa para evitar que otro agente vuelva a tratar Supabase como capa activa por error

## Objetivo

Permitir trabajo rápido sobre el frontend sin borrar la base de Supabase ya preparada para la futura fase backend.

## Impacto arquitectónico

El cambio separa dos estados que antes estaban mezclados:

- bootstrap disponible para evolución futura
- runtime público actual sin dependencia real de Supabase

Esto reduce fricción en desarrollo y evita presentar auth o conexión backend como si ya fueran parte del producto actual.

## Desglose denso

- no se elimina `lib/supabase/**` ni `supabase/**`
- no se tocan scripts del CLI ni la base de migraciones
- la desconexión afecta solo al puente runtime que interceptaba requests públicas
- la validación descubre y corrige además un drift previo: el script `next lint` ya no servía con la versión actual de Next.js del repo
- la validación descubre además un segundo drift: `ssr: false` ya no puede declararse en `app/page.tsx` al ser un Server Component en Next 16
- se aprovecha la actualización documental para reflejar la realidad actual del repo y dejar claro que la futura reconexión será una tarea separada

## Validación

- `npm run lint`
- `npm run build`
- `npm run typecheck`

## Pendientes / límites

- no se ha reconfigurado todavía una estrategia de reactivación; eso se hará cuando el frontend se dé por cerrado
- `lib/supabase/**` permanece como bootstrap, pero sin cobertura de uso real hasta la futura integración

## Notas para presupuesto

Entrega de foco y saneamiento operativo: el valor está en reducir complejidad activa sin tirar trabajo previo, manteniendo el repo preparado para conectar backend más adelante.
