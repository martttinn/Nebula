---
change_id: NBS-CHG-2026-05-03-010
date: 2026-05-03
title: Creación del directorio public para assets estáticos
group_id: NBS-TSK-2026-010
category: frontend
subcategories:
  - structure
  - docs
origin: client-request
complexity: low
scope: repo-wide
user_visible: false
release_impacts:
  - frontend-runtime
architecture_layers:
  - web
  - docs
backend_sensitive: false
files_touched:
  - public/README.md
  - doc/reference/technical-reference.md
  - doc/change-log/**
verification:
  - no aplica validación funcional específica; cambio estructural y documental
---

# Resumen corto

Se crea el directorio `public/` y se documenta como ubicación canónica para assets estáticos públicos del proyecto.

## Contexto / problema

El repo todavía no tenía una carpeta `public/` explícita, pese a que el frontend va a necesitar almacenar logos, imágenes e iconos públicos.

## Cambio realizado

- se crea `public/`
- se añade un `README.md` interno para dejar clara su finalidad
- se actualiza la referencia técnica para reflejar esta estructura

## Objetivo

Evitar dispersión futura de assets y dejar el repo alineado con la convención estándar de Next.js para ficheros públicos.

## Impacto arquitectónico

La estructura del proyecto gana una convención repo-safe para servir assets estáticos desde la raíz pública.

## Desglose denso

- el directorio queda preparado para imágenes, logotipos, iconos, favicons y descargables
- el cambio no altera runtime ni build
- la documentación deja explícito el uso esperado de la carpeta

## Validación

- no aplica validación funcional específica; cambio estructural y documental

## Pendientes / límites

- todavía no se han añadido assets reales dentro de `public/`

## Notas para presupuesto

Cambio pequeño de estructura y documentación para ordenar la futura incorporación de recursos estáticos.
