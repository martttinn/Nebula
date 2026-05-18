---
change_id: NBS-CHG-2026-05-09-183
date: 2026-05-09
title: Integracion del CTA final dentro de testimonials con GridDistortion exacto de React Bits
group_id: NBS-TSK-2026-159
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
  - docs
  - web
backend_sensitive: false
files_touched:
  - app/page.tsx
  - components/home/testimonials/**
  - components/GridDistortion.tsx
  - components/GridDistortion.css
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
  - El cierre `#contacto` se integra como última card de `testimonials` con `GridDistortion` exacto de React Bits
---

# Resumen corto

La home de Nebula integra el CTA final como última card de `testimonials`, usando `GridDistortion` exacto de React Bits como fondo y manteniendo el botón desactivado hasta que exista la página de contacto.

## Contexto / problema

La navegación pública ya incluía enlaces internos hacia `/#contacto`, pero el runtime no ofrecía todavía un cierre comercial convincente y el intento inicial como sección autónoma al final de la home duplicaba superficies. Martín pidió integrar esa card dentro del carrusel de reseñas y mantener `GridDistortion` exactamente como viene en React Bits, sin adaptar el componente importado, pero conservando honestidad funcional mientras la página de contacto siga pendiente.

## Cambio realizado

- el CTA pasa a vivir dentro de `components/home/testimonials/` como cuarta card del stack y última card visible del flujo
- la shell cliente carga `components/GridDistortion.tsx` mediante `dynamic(..., { ssr: false })`, sin editar el código importado del registry
- `app/page.tsx` deja de renderizar una sección `FinalCtaSection` independiente
- `TestimonialsSection` adopta ahora `#contacto` como ancla de la sección y conserva `#testimonios` como identificador interno del bloque
- el fondo usa ya el asset local `public/backgrounds/cta-background.png`
- el botón único se muestra desactivado y acompañado de copy que deja claro que el canal comercial real sigue pendiente
- se actualizan `DESIGN.md`, contexto de proyecto, referencia técnica, referencia de dominio y `decisions-log`
- se verifica además que `three` permanezca en `0.180.x` como única versión efectiva para evitar drift con `postprocessing`

## Objetivo

Cerrar la home con un CTA visible y coherente con la identidad Nebula sin abrir una sección adicional fuera del flujo de reseñas, recuperar la navegación interna hacia contacto y dejar el sistema preparado para sustituir más adelante el estado desactivado por una página o flujo real.

## Impacto arquitectonico

La home no gana ya una sección autónoma nueva; el cambio vive dentro de la carpeta canónica `components/home/testimonials/`, que amplía su stage sticky y su lista móvil con una cuarta card comercial. La integración aprovecha el componente exacto importado desde React Bits y conserva la responsabilidad de copy, shell y wiring dentro de la familia `testimonials`.

## Desglose denso

- `app/page.tsx` vuelve a cerrar en `TestimonialsSection`
- `components/home/testimonials/index.tsx` amplía el stack desktop a cuatro cards, extiende el runway de scroll y añade una variante CTA como último panel
- `components/home/testimonials/cta.ts` centraliza copy e `imageSrc` local
- `components/home/testimonials/grid-distortion-shell.tsx` encapsula la carga cliente del fondo exacto de React Bits sin modificar el componente base
- `components/GridDistortion.tsx` y `components/GridDistortion.css` quedan como primitive importada del registry, consumida sin cambios
- `DESIGN.md` fija ya que la última card de `testimonials` funciona como cierre comercial y mantiene la restricción de botón desactivado mientras no exista página de contacto
- `.agents/rules/01-project-context.md`, `doc/reference/technical-reference.md` y `doc/reference/domain-reference.md` reflejan el nuevo estado real del runtime público
- `.agents/decisions-log.md` registra la decisión duradera sobre el cierre `#contacto` integrado en `testimonials`

## Validacion

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm run changes:sync`

## Pendientes / limites

- el botón se mantiene desactivado porque la página `/contacto` aún no existe
- la verificación visual interactiva en navegador queda pendiente si Martín quiere afinar proporciones, opacidad o copy final de la card

## Notas para presupuesto

Feature visible de landing premium con integración externa controlada, resolución de dependencia visual sin drift de versiones y actualización transversal de documentación operativa del repo.
