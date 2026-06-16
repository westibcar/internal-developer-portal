# Documentação do Template FastAPI no Backstage

Esta página funciona como a entrada principal da documentação do template e da aplicação gerada.

## Comece por aqui

- [Visão geral do projeto](getting-started/overview.md)
- [Visão geral do sistema](architecture/system-overview.md)
- [Visão geral do template Backstage](backstage/template-overview.md)
- [Visão geral da API](api/overview.md)
- [Desenvolvimento local](development/local-development.md)

## O que este template entrega

- Backend FastAPI estruturado
- Frontend leve em HTML, CSS e JavaScript servido por Nginx
- Persistência em PostgreSQL com migrações Alembic
- Autenticação baseada em JWT
- Cadastro e listagem de empresas
- Gestão de perfil e upload de foto
- Suporte a Docker, Helm, ArgoCD e GitHub Actions

## Mapa rápido

| Área | Conteúdo |
|---|---|
| Começando | [overview](getting-started/overview.md), [prerequisites](getting-started/prerequisites.md), [installation](getting-started/installation.md), [quick-start](getting-started/quick-start.md) |
| Arquitetura | [system-overview](architecture/system-overview.md), [project-structure](architecture/project-structure.md), [design-decisions](architecture/design-decisions.md), [diagrams](architecture/diagrams.md) |
| Backstage | [template-overview](backstage/template-overview.md), [scaffolder-parameters](backstage/scaffolder-parameters.md), [catalog-info](backstage/catalog-info.md), [template-lifecycle](backstage/template-lifecycle.md) |
| API | [overview](api/overview.md), [authentication](api/authentication.md), [endpoints](api/endpoints.md), [request-response-examples](api/request-response-examples.md), [error-handling](api/error-handling.md), [openapi-reference](api/openapi-reference.md) |
| Desenvolvimento | [local-development](development/local-development.md), [coding-standards](development/coding-standards.md), [testing](development/testing.md), [debugging](development/debugging.md), [troubleshooting](development/troubleshooting.md) |
| Deploy | [environments](deployment/environments.md), [docker](deployment/docker.md), [kubernetes](deployment/kubernetes.md), [helm](deployment/helm.md), [cicd](deployment/cicd.md) |
| Segurança | [authentication](security/authentication.md), [authorization](security/authorization.md), [secrets-management](security/secrets-management.md), [best-practices](security/best-practices.md) |
| Operações | [monitoring](operations/monitoring.md), [logging](operations/logging.md), [metrics](operations/metrics.md), [alerts](operations/alerts.md) |
| Exemplos | [usage-examples](examples/usage-examples.md), [api-examples](examples/api-examples.md), [template-examples](examples/template-examples.md) |
| Referência | [glossary](glossary.md) |

## Fatos principais

| Item | Valor |
|---|---|
| Tipo do template | `Template` |
| Tipo do catálogo gerado | `Component` |
| Tipo do componente gerado | `service` |
| Backend em execução | FastAPI + Uvicorn |
| Frontend em execução | Site estático via Nginx |
| Banco de dados | PostgreSQL 15 |
| Ferramenta de migração | Alembic |
| Autenticação | JWT Bearer |
| CI/CD | GitHub Actions + ArgoCD |
