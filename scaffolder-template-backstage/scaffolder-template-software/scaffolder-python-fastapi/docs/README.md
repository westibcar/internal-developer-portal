# Documentação do Template FastAPI no Backstage

Esta documentação descreve o template FastAPI localizado neste repositório e a aplicação gerada a partir dele. Ela foi organizada para onboarding, manutenção, entrega e integração com o catálogo do Backstage.

## O que este template entrega

- Backend FastAPI estruturado
- Frontend leve em HTML, CSS e JavaScript servido por Nginx
- Persistência em PostgreSQL com migrações Alembic
- Autenticação baseada em JWT
- Cadastro e listagem de empresas
- Gestão de perfil e upload de foto
- Suporte a Docker, Helm, ArgoCD e GitHub Actions

## Onde começar

- [Visão geral do projeto](getting-started/overview.md)
- [Visão geral do sistema](architecture/system-overview.md)
- [Visão geral do template Backstage](backstage/template-overview.md)
- [Visão geral da API](api/overview.md)
- [Desenvolvimento local](development/local-development.md)

## Mapa da documentação

| Área | Páginas |
|---|---|
| Começando | [visão geral](getting-started/overview.md), [pré-requisitos](getting-started/prerequisites.md), [instalação](getting-started/installation.md), [início rápido](getting-started/quick-start.md) |
| Arquitetura | [visão geral do sistema](architecture/system-overview.md), [estrutura do projeto](architecture/project-structure.md), [decisões de design](architecture/design-decisions.md), [diagramas](architecture/diagrams.md) |
| Backstage | [visão geral do template](backstage/template-overview.md), [parâmetros](backstage/scaffolder-parameters.md), [catalog-info](backstage/catalog-info.md), [ciclo de vida](backstage/template-lifecycle.md) |
| API | [visão geral](api/overview.md), [autenticação](api/authentication.md), [endpoints](api/endpoints.md), [exemplos](api/request-response-examples.md), [erros](api/error-handling.md), [OpenAPI](api/openapi-reference.md) |
| Desenvolvimento | [desenvolvimento local](development/local-development.md), [padrões de código](development/coding-standards.md), [testes](development/testing.md), [debug](development/debugging.md), [troubleshooting](development/troubleshooting.md) |
| Deploy | [ambientes](deployment/environments.md), [Docker](deployment/docker.md), [Kubernetes](deployment/kubernetes.md), [Helm](deployment/helm.md), [CI/CD](deployment/cicd.md) |
| Segurança | [autenticação](security/authentication.md), [autorização](security/authorization.md), [gestão de segredos](security/secrets-management.md), [boas práticas](security/best-practices.md) |
| Operações | [monitoramento](operations/monitoring.md), [logging](operations/logging.md), [métricas](operations/metrics.md), [alertas](operations/alerts.md) |
| Exemplos | [exemplos de uso](examples/usage-examples.md), [exemplos de API](examples/api-examples.md), [exemplos do template](examples/template-examples.md) |
| Referência | [glossário](glossary.md) |

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

## Observações

O repositório não contém todos os arquivos citados no outline de destino, como `mkdocs.yml`, `pyproject.toml` ou uma pasta `tests/` na raiz do template. Esta documentação reflete apenas o código e a configuração realmente presentes no projeto.
