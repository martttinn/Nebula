---
change_id: NBS-CHG-2026-05-03-001
date: 2026-05-03
title: Bootstrap de la web de marketing de Nebula Studios con sistema de agentes integrado
group_id: NBS-TSK-2026-001
category: frontend
subcategories:
  - feature
  - ui-ux-redesign
  - ops
origin: client-request
complexity: high
scope: systemic
user_visible: true
release_impacts:
  - frontend-runtime
architecture_layers:
  - routes
  - components
  - data
  - docs
  - tooling
  - seo
  - web
backend_sensitive: false
files_touched:
  - AGENTS.md
  - DESIGN.md
  - README.md
  - app/layout.tsx
  - app/page.tsx
  - app/globals.css
  - app/robots.ts
  - app/sitemap.ts
  - components/**
  - data/site.ts
  - lib/**
  - .agents/**
  - doc/**
  - scripts/**
verification:
  - npm run lint
  - npm run typecheck
  - npm run build
  - npm run changes:sync
related_decisions:
  - "2026-05-03 — Nebula Studios adopta AGENTS.md + DESIGN.md + .agents/ como sistema canónico"
---

# Resumen corto

Se crea la base inicial del proyecto Nebula Studios sobre Next.js 14, se integra el sistema repo-local de agentes y se implementa la primera versión pública de la landing de marketing.

## Contexto / problema

El proyecto necesitaba arrancar con una base limpia y consistente tanto a nivel runtime como a nivel operativo. No bastaba con un scaffold vacío: la intención era nacer ya con identidad visual, gobierno documental y reglas de trabajo alineadas con otros proyectos web del entorno.

## Cambio realizado

- scaffold del repo sobre Next.js 14 con App Router
- integración de `AGENTS.md`, `.agents/`, `DESIGN.md`, `doc/change-log/` y scripts asociados
- adaptación del sistema de agentes al contexto específico de Nebula Studios
- construcción de la homepage inicial con hero, servicios, enfoque, proceso y siguiente paso
- integración de metadata base, `robots.ts`, `sitemap.ts`, tokens visuales y primitives UI reutilizables

## Objetivo

Dejar una base sólida para continuar el desarrollo posterior sin drift entre código, branding, documentación y sistema de agentes.

## Impacto arquitectónico

El cambio fija:

- la estructura base del repo
- la separación entre rutas, componentes, datos y utilidades
- el contrato visual reutilizable en `DESIGN.md`
- el contrato operativo de agentes y change-log para futuras iteraciones

## Desglose denso

- se fusiona el patrón de `agents-plantilla` con la especialización web vista en otros proyectos del workspace
- se sustituyen las referencias genéricas heredadas por reglas y roles concretos para un sitio público con foco SEO y frontend premium
- se elimina el histórico de plantilla del `change-log` para arrancar el repositorio limpio
- se crea una primera landing pública honesta: fuerte en posicionamiento, sin inventar métricas ni conectar falsas integraciones comerciales

## Validación

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm run changes:sync`

## Pendientes / límites

- falta definir dominio productivo final
- falta conectar el canal comercial real
- no existe backend ni autenticación en esta base inicial

## Notas para presupuesto

Entrega de alto valor estructural: combina setup técnico, diseño base, documentación operativa y narrativa pública inicial.
