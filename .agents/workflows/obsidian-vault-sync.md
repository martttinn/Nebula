---
description: flujo para leer y sincronizar conocimiento persistente en Obsidian cuando una tarea lo requiera
---

## Objetivo

Mantener alineado el conocimiento persistente del vault con el estado real del repo cuando una tarea tenga impacto documental duradero.

## Canal de acceso preferido

- usa `filesystem` como vía por defecto para leer y escribir el vault
- si recurres al MCP, deja indicado qué limitación del `filesystem` lo justificó

## Cuándo ejecutar este workflow

- cambios de arquitectura
- cambios de stack o tooling operativo
- reglas de negocio nuevas o modificadas
- decisiones técnicas o de producto vigentes
- nuevas features o cambios funcionales con impacto documental persistente

## Secuencia obligatoria

1. entra por `filesystem` y lista el root del vault
2. lee `AGENTS.md` del vault
3. localiza la nota del proyecto afectado o la más cercana
4. contrasta el contenido del vault con el código y la documentación canónica del repo
5. clasifica el drift detectado
6. actualiza solo las notas realmente afectadas

## Regla de prioridad

- si hay conflicto entre vault y repo, el código ejecutado y la documentación canónica del repo prevalecen hasta que se reconcilie el conocimiento
- no conviertas el vault en una fuente paralela de verdad para datos no verificados

## Resultado mínimo esperado

- nota o notas afectadas sincronizadas
- límites y pendientes explícitos si no pudiste cerrar toda la reconciliación
- mención breve del canal usado (`filesystem` o fallback MCP)
