---
change_id: NBS-CHG-2026-05-07-150
date: 2026-05-07
title: Integracion segura de tech-stack-icons con wrappers optimizados
group_id: NBS-TSK-2026-136
category: frontend
subcategories:
  - dependencies
  - performance
  - ui-foundation
origin: client-request
complexity: medium
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
  - package.json
  - package-lock.json
  - components/ui/tech-stack-icon.tsx
  - components/ui/lazy-tech-stack-icon.tsx
  - components/ui/tech-stack-icon.types.ts
  - components/home/projects-showcase/index.tsx
  - .agents/rules/01-project-context.md
  - doc/reference/technical-reference.md
  - doc/change-log/**
verification:
  - npm run lint
  - npm run typecheck
  - npm run build
---

# Resumen corto

Se instala `tech-stack-icons` y se encapsula su consumo detrás de wrappers propios para evitar imports directos de un paquete monolítico en Client Components críticos.

## Contexto / problema

Martín pidió incorporar `tech-stack-icons` al proyecto, pero la librería publica un único bundle con todo el catálogo de iconos. Importarla de forma ingenua en una isla cliente arrastraría una cantidad de JavaScript desproporcionada para un caso de uso de pocos iconos.

## Cambio realizado

- se instala `tech-stack-icons@3.7.1`
- se crea `components/ui/tech-stack-icon.tsx` como wrapper server-first con semántica accesible
- se crea `components/ui/lazy-tech-stack-icon.tsx` como fallback cliente usando `next/dynamic` y activación diferida por `IntersectionObserver`
- se sustituye el texto plano del `stack principal` en `components/home/projects-showcase/index.tsx` por badges con icono + label para `Next.js`, `TypeScript` y `Supabase`
- se actualiza la foto de stack en `.agents/rules/01-project-context.md`
- se documenta la convención de consumo en `doc/reference/technical-reference.md`

## Objetivo

Dejar la dependencia instalada y lista para uso real sin comprometer rendimiento por defecto ni abrir una convención peligrosa para futuras secciones de la home.

## Impacto arquitectonico

El repo gana una primitive reusable de iconografía tecnológica y formaliza una estrategia dual: server-first para el camino recomendado y lazy client-only para casos excepcionales donde la superficie necesite vivir dentro de un Client Component. Además, la sección pública de proyectos ya consume esa base en runtime real.

## Desglose denso

- la investigación previa confirmó que `tech-stack-icons` expone un único `dist/index.js` y no una colección granular de submódulos
- el paquete pesa aproximadamente `8.3 MB` descomprimido y en torno a `2.7 MB` gzip en distribución, por lo que `optimizePackageImports` no resuelve el problema
- la ruta server-first usa `import "server-only"` para provocar error de build si alguien intenta llevar ese wrapper a cliente
- la ruta cliente difiere la descarga del paquete hasta que el icono entra cerca del viewport, reduciendo el coste del path crítico aunque sin convertir el paquete en ligero
- `projects-showcase` usa ahora la ruta cliente diferida porque la sección entera vive dentro de un Client Component con lógica de scroll y pinning
- un intento inicial de externalizar el paquete en `next.config.mjs` chocó con Turbopack durante `next build`, así que el estado final validado descarta esa optimización y se queda con wrappers + lazy loading como estrategia segura
- la documentación técnica deja explícito que el paquete no debe importarse directamente desde islands cliente críticas

## Validacion

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Pendientes / limites

- el fallback cliente sigue siendo costoso si se usa de forma intensiva, así que para lists grandes o iconografía reiterada conviene preferir la ruta server-first o snapshot local
- `npm audit --omit=dev` sigue reportando dos advisories moderados ya existentes en `next` y `postcss`, fuera del alcance de esta integración
- `npm run changes:sync` no puede ejecutarse porque el repo sigue sin exponer scripts `changes:*` en `package.json`

## Notas para presupuesto

Entrega estructural de complejidad media: mezcla investigación de empaquetado, integración de dependencia, hardening de rendimiento y formalización documental de una convención reusable para futuros casos de uso.
