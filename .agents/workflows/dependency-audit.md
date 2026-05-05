---
description: flujo para auditar dependencias, vulnerabilidades, drift y compatibilidad del stack
---

# Workflow - Dependency Audit

## 1. Carga de contexto

Antes de auditar:

- lee `package.json`, lockfile y config del framework
- revisa `README.md`, `AGENTS.md` y `rules/01-project-context.md`
- confirma si el usuario pide solo informe o también cambios

## 2. Alcance por defecto

- la auditoría es **read-only** salvo petición explícita de implementación
- no ejecutes `npm audit fix` ni upgrades globales por inercia
- distingue runtime, dev tooling y dependencias transitorias

## 3. Superficies mínimas a revisar

- `package.json`
- lockfile
- configuración del framework o bundler
- scripts de validación y build
- librerías críticas del runtime

## 4. Verificación local y actualizada

Cuando el entorno y la red lo permitan:

1. inspecciona versiones instaladas
2. revisa paquetes outdated
3. revisa advisories o deprecations
4. usa fuentes oficiales o primarias para compatibilidad

## 5. Diagnóstico

Separa siempre:

- hechos verificados
- riesgo real
- ruido o hallazgos sin impacto práctico
- cambios recomendables ahora vs después

## 6. Plan de corrección

Si el usuario pide corregir además de auditar:

- agrupa cambios por oleadas pequeñas
- separa majors o cambios de runtime crítico
- evita mezclar upgrade, refactor y feature en el mismo paso

## 7. Validación mínima tras cambios

Tras cualquier cambio de dependencias:

- ejecuta validación proporcional al repo real
- no presentes como verificado un script que no existe o que no pudiste ejecutar

## 8. Documentación y cierre

- si cambia la foto real del stack, actualiza `rules/01-project-context.md`
- registra la entrega en `doc/change-log/`
- si solo auditaste y Martín no pidió persistirlo, evita tocar docs sin necesidad
