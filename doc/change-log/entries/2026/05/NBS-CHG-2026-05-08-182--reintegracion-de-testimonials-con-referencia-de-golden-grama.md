---
change_id: NBS-CHG-2026-05-08-182
date: 2026-05-08
title: Reintegracion de testimonials con referencia de Golden Grama
group_id: NBS-TSK-2026-158
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
  - DESIGN.md
  - .agents/decisions-log.md
  - doc/reference/**
  - doc/change-log/**
verification:
  - npm run changes:sync
  - npm run lint
  - npm run typecheck
  - npm run build
related_decisions:
---

# Resumen corto

`Testimonials` vuelve a la home de Nebula con una implementación nueva que toma de Golden Grama el flujo sticky de cards apiladas y mantiene la estética propia de Nebula.

## Contexto / problema

Después de retirar la primitive previa, Martín pidió reintroducir la sección tomando como referencia de comportamiento la surface de cards apiladas de Golden Grama, pero sin arrastrar su paleta ni su tratamiento visual. El reto era conservar las reseñas reales ya aprobadas y devolver el bloque al sistema de Nebula.

## Cambio realizado

- se crea una nueva `TestimonialsSection` en `components/home/testimonials/index.tsx`
- la composición desktop adopta una stage sticky completa: `header + primera card` quedan fijados en viewport y cada card posterior entra desde abajo para deslizarse por encima de la anterior y apilarse dentro del mismo stage
- el pinning desktop deja de depender de `position: sticky` puro dentro del shell y pasa a resolverse con una fase `before/active/after` y un wrapper fijado explícitamente
- el fondo atmosférico desktop queda anclado al mismo stage para que no derive mientras las cards permanecen fijadas
- el stack deja visible un pequeño labio superior de la card previa cuando entra la siguiente, reforzando la sensación de apilamiento físico
- la compresión de la card previa se adelanta y se cierra antes de que la nueva complete del todo su trayectoria, evitando que el encogido siga progresando una vez la card entrante ya está prácticamente asentada
- la geometría interna de cada card se fija en tres bandas estables: marca superior, quote centrado y firma inferior; la segunda reseña se sintetiza para respetar esa caja sin perder valor
- se elimina el separador dashed horizontal del bloque superior de identidad para limpiar el chrome de la card
- se elimina por completo la etiqueta visible `Reseña verificada` para dejar la columna derecha más limpia sin alterar la posición del quote ni de la firma
- se retiran también la firma inferior visible y la comilla decorativa para dejar la columna derecha reducida al quote
- se reduce el tamaño y el peso tipográfico del quote para darle una presencia más contenida dentro de la card
- la estética vuelve al sistema Nebula: `Void/Navy`, `Lilac`, `Syne + Inter`, grid sutil y chrome consistente con el resto de la home
- `archive.ts` pasa a servir de fuente repo-safe para las tres reseñas verificadas
- la sección se reintegra en `app/page.tsx` justo después de `Projects showcase`
- se alinean `DESIGN.md`, referencias y decisiones al nuevo estado real

## Objetivo

Recuperar la prueba social visible con una surface nueva, más alineada con la referencia compositiva que Martín marcó, sin perder el contenido validado ni dejar drift documental.

## Impacto arquitectonico

La carpeta `components/home/testimonials/` vuelve a tener surface activa, pero ya no arrastra la primitive anterior. La nueva implementación concentra la UI en `index.tsx`, conserva los datos en `archive.ts` y materializa una stage sticky completa en desktop, en vez de un simple listado o reveal por cards independientes. El pinning ya no descansa sobre `position: sticky` puro dentro del shell, sino sobre una fase explícita de scroll con wrapper fijado al viewport durante el tramo activo.

## Validacion

- `npm run changes:sync`
- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Pendientes / limites

- Golden Grama no expone una sección standalone de testimonials en su home; la referencia útil y verificable ha sido el patrón sticky de `ServicesClient`, no una primitive de prueba social lista para copiar 1:1
- la verificación visual interactiva en navegador queda pendiente en este hilo si Martín quiere afinar el encaje con el resto de la home

## Notas para presupuesto

Integración visible y con dirección visual clara: recuperación de una sección pública desde una referencia interna concreta, incluyendo extracción de motion y lenguaje compositivo, más sincronización documental completa.
