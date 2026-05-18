---
description: flujo para auditar dependencias, vulnerabilidades, drift y compatibilidad del stack
---

# Workflow - Dependency Audit

## 1. Carga de contexto

Antes de auditar:

- lee `package.json`, lockfile y config del framework
- revisa `README.md`, `AGENTS.md` y `rules/01-project-context.md`
- extrae las dependencias, paquetes y herramientas concretas mencionadas por la tarea o la documentación afectada
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
- dependencias mencionadas en la tarea, README, documentación técnica o sistema de agentes

## 4. Verificación local y actualizada

Cuando el entorno y la red lo permitan:

1. inspecciona versiones instaladas
2. compara cada dependencia mencionada contra el manifiesto y lockfile del proyecto actual
3. revisa paquetes outdated
4. revisa advisories o deprecations
5. usa fuentes oficiales o primarias para compatibilidad
6. en scopes React/Next.js, usa `npx react-doctor@latest` como diagnóstico complementario de seguridad, rendimiento, corrección, accesibilidad, bundle y arquitectura

Si una dependencia mencionada no está instalada:

- márcala como `mencionada/no instalada`
- no la incorpores al stack real ni al código runtime por inferencia
- pregunta a Martín cuáles quiere instalar antes de modificar `package.json`, lockfile o equivalente
- si su uso previsto es `npx <paquete>@...`, documenta que es tooling bajo demanda y no dependencia persistida

## 5. Diagnóstico

Separa siempre:

- hechos verificados
- dependencias instaladas vs mencionadas/no instaladas
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
- si usaste `react-doctor`, separa sus hallazgos entre evidencia accionable, ruido y recomendaciones pendientes de validación manual

## 8. Documentación y cierre

- si cambia la foto real del stack, actualiza `rules/01-project-context.md`
- registra la entrega en `doc/change-log/`
- si solo auditaste y Martín no pidió persistirlo, evita tocar docs sin necesidad
