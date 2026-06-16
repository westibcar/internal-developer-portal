# Visão Geral do Template

O template é uma definição do Backstage Scaffolder que gera um repositório de serviço baseado em FastAPI com artefatos de deploy e uma entidade de catálogo correspondente.

## Identidade do template

| Campo | Valor |
|---|---|
| Tipo | `Template` |
| Nome no metadata | `fastapi-service-template` |
| Título | `FastAPI Service Template` |
| Tipo do template | `service` |
| Owner | `user:guest` |

## O que ele gera

- Um serviço de backend em `uday-app/app`
- Um frontend estático em `uday-app/frontend`
- Migrações de banco em `uday-app/alembic`
- Um `catalog-info.yaml` gerado
- Arquivos de Docker e deploy

## Fluxo do Scaffolder

1. Coleta os parâmetros do template.
2. Renderiza o skeleton a partir de `template-backstage/content`.
3. Publica o repositório gerado.
4. Registra o componente gerado no Backstage.

## Ações utilizadas

- `fetch:template`
- `publish:github`
- `catalog:register`
