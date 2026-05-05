---
description: flujo para preparar mensajes de commit y ejecutar commits a partir del worktree real
---

# Workflow - Commit

## 1. Inspecciona el worktree completo

- revisa `git status --short`
- revisa el diff agregado o al menos un resumen por áreas (`git diff --stat`, `git diff --name-status`)
- no asumas que el commit incluirá solo el último cambio hecho por el agente

## 2. Construye grupos de commit antes de redactar nada

Agrupa el worktree en bloques mínimos coherentes. Cada grupo debe responder a una sola narrativa y un solo scope principal:

- mismo objetivo funcional, fix o refactor
- mismo scope operativo principal
- mismos tests y documentación de soporte de ese cambio
- misma semántica de entrega para el historial Git

Reglas prácticas de agrupación:

- incluye en cada grupo los tests, snapshots o docs que pertenezcan a ese cambio; no los dejes huérfanos en otro commit
- no mezcles feature visible con refactor oportunista, hardening lateral o documentación no ligada a esa misma entrega
- si hay cambios ajenos o anteriores que Martín no ha pedido incluir, déjalos fuera de tus grupos
- si dos cambios tocan la misma carpeta pero resuelven problemas distintos, sepáralos igualmente si el historial quedaría más claro

## 3. Detecta si la separación es segura

Considera el worktree mezclado de forma problemática cuando:

- hay varios grupos claros, pero todavía no están aislados
- conviven frontend, backend sensible, docs y tooling sin una misma entrega lógica
- un mismo archivo contiene cambios de grupos distintos y no puedes separarlos con seguridad sin reescribir ni arriesgar cambios ajenos

Si la separación no es segura:

- dilo explícitamente
- no hagas un commit automático mezclando grupos por comodidad
- explica qué grupos ves y qué archivo o hunk impide separarlos limpiamente
- si Martín no pide otra cosa, propone separar primero o pide criterio antes de commitear

## 4. Si Martín pide solo el mensaje de commit

- no devuelvas un único mensaje por defecto si has detectado varios grupos
- redacta un mensaje por grupo, en el orden recomendado de commit
- sigue el formato reciente usado en el repo
- cada resumen debe cubrir todo lo que entraría en ese grupo, no solo el último diff local

## 5. Si Martín pide que el agente haga el commit

- no hagas un único commit si el worktree contiene varios grupos coherentes
- stagea cada grupo por separado con selección explícita de archivos; evita `git add .` en worktrees mezclados
- antes de cada commit, comprueba que el staged coincide con un solo grupo (`git diff --cached --stat`, `git diff --cached --name-status`)
- usa un mensaje coherente con ese grupo concreto y con el formato del repo
- ejecuta el commit, revisa el estado residual del worktree y luego pasa al siguiente grupo

## 6. Ordena los grupos con criterio

Orden recomendado, salvo dependencia distinta:

- cambios base o de infraestructura que habilitan lo demás
- cambios funcionales o fixes principales
- documentación o gobierno repo-only no ligada a runtime

Matices:

- si tests y documentación forman parte de la misma entrega, viajan con su cambio y no como commit aparte
- si un commit documental solo describe una decisión duradera del sistema, puede vivir como grupo propio

## 7. Qué reportar al final

- hashes creados, uno por grupo y en orden
- resumen corto de qué contiene cada commit
- causa del bloqueo si no se pudo separar o commitear algún grupo
- si hubo que resolver locks, hooks o problemas locales del repo
- si el worktree quedó limpio o qué cambios quedaron fuera

## 8. Objetivo del workflow

La prioridad no es minimizar el número de commits, sino evitar commits mixtos que mezclen semánticas, scopes o cambios ajenos y hagan el historial menos fiable.
