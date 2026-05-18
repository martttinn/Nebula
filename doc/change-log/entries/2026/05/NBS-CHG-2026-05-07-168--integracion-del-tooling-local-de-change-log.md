---
change_id: NBS-CHG-2026-05-07-168
date: 2026-05-07
title: Integracion del tooling local de change-log
group_id: NBS-TSK-2026-139
category: infra
subcategories:
  - tooling
  - docs
  - developer-experience
origin: internal-improvement
complexity: medium
scope: repo-wide
user_visible: false
release_impacts:
  - developer-tooling
  - docs
architecture_layers:
  - tooling
  - docs
  - workflows
backend_sensitive: false
files_touched:
  - package.json
  - doc/change-log/config.json
  - scripts/change-log-lib.js
  - scripts/create-change-entry.js
  - scripts/create-change-group.js
  - scripts/validate-change-log.js
  - scripts/build-change-log-index.js
  - .agents/rules/01-project-context.md
  - doc/reference/technical-reference.md
  - doc/change-log/**
verification:
  - npm run changes:validate
  - npm run changes:index
  - npm run changes:sync
  - npm run lint
  - npm run typecheck
  - npm run build
related_decisions:
---

# Resumen corto

Nebula Studios incorpora tooling local de `change-log` para crear grupos y entradas, validar consistencia e indexar el histórico desde scripts npm adaptados al repositorio real.

## Contexto / problema

El repo documentaba desde hace tiempo comandos `changes:*`, pero `package.json` no los exponía y el árbol de `doc/change-log/` había acumulado drift operativo. Además, Nebula no comparte exactamente la misma forma histórica que Future Nova App: conviven entradas modernas y legacy, y existen IDs duplicados antiguos que impedían portar un validador estricto sin adaptación.

## Cambio realizado

- se revisa el tooling ya existente en `/Users/martin/Documents/Nebula Studios/Apps/FutureNova-App/scripts`
- se porta la librería base y los comandos de creación, validación e indexación al repo de Nebula
- el port se vuelve `config-driven` a partir de `doc/change-log/config.json`, sustituyendo supuestos específicos del proyecto origen
- el validador se adapta para aceptar tanto el esquema moderno como entradas legacy del histórico de Nebula
- los IDs históricos duplicados dejan de bloquear la sincronización y pasan a reportarse como warnings
- se corrige el desajuste real entre la entrada `NBS-CHG-2026-05-07-152` y su grupo correspondiente
- se actualizan contexto operativo y referencia técnica para dejar trazado que `changes:*` ya existe en este repo

## Objetivo

Cerrar el gap entre documentación y tooling real, dejar el `change-log` ejecutable dentro del repo y reducir el coste manual de mantener entradas, grupos e índice derivados.

## Impacto arquitectonico

Cambio transversal de tooling y workflows internos. El repo gana un subsistema JS repo-local en `scripts/` que formaliza la creación y validación del `change-log` sin tocar runtime público ni backend.

## Desglose denso

- la base compartida se encapsula en `scripts/change-log-lib.js`
- `package.json` expone ya `changes:entry:new`, `changes:group:new`, `changes:validate`, `changes:index` y `changes:sync`
- el generador de índice se vuelve tolerante al histórico legacy y ya no emite categorías `undefined` para entradas antiguas
- la adaptación evita una migración masiva del árbol: primero hace compatible la herramienta con la realidad del repo y después deja abierta una limpieza posterior más segura
- la propia tarea se dogfoodea creando los grupos `138` y `139` y esta entrada `154` con los scripts nuevos

## Validacion

- `npm run changes:validate`
- `npm run changes:index`
- `npm run changes:sync`
- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Pendientes / limites

- el validador no reescribe automáticamente el histórico legacy; solo lo valida de forma compatible
- los IDs duplicados antiguos siguen existiendo y conviene resolverlos en una tarea de limpieza específica, no mezclados con esta integración
- `design:lint` sigue siendo una expectativa documental en parte del sistema de agentes, pero no un script real de `package.json`

## Notas para presupuesto

Entrega interna de complejidad media y alto retorno operativo: no cambia la web pública, pero reduce drift, automatiza mantenimiento documental y deja un workflow verificable reutilizable para tareas futuras.
