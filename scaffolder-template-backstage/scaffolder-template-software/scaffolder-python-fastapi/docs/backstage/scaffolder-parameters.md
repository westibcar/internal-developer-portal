# Parâmetros do Scaffolder

## Parâmetros obrigatórios

| Parâmetro | Tipo | Validação | Padrão | Descrição |
|---|---|---|---|---|
| `appName` | string | regex em kebab-case | nenhum | Nome da aplicação usado nos arquivos gerados |
| `owner` | string | seletor `Group` ou `User` | nenhum | Owner do catálogo do componente gerado |
| `repoUrl` | string | restrição ao host GitHub | nenhum | Local do repositório de destino |
| `namespace` | string | string em minúsculas no estilo DNS | `default` | Namespace Kubernetes / nome lógico de ambiente usado pelo template |

## Parâmetros opcionais

| Parâmetro | Tipo | Validação | Padrão | Descrição |
|---|---|---|---|---|
| `description` | string | texto livre | `Servico FastAPI criado via Backstage Scaffolder` | Descrição legível para humanos |
| `backendPort` | integer | 1-65535 | `8000` | Porta do backend |
| `frontendPort` | integer | 1-65535 | `80` | Porta do frontend |
| `databaseName` | string | identificador no estilo PostgreSQL | `appdb` | Nome do banco |

## Origem dos campos

- `OwnerPicker` para `owner`
- `RepoUrlPicker` para `repoUrl`

## Observação

O template atualmente usa o parâmetro `namespace` como valor gravado em `spec.system` no `catalog-info.yaml` gerado. Isso é um acoplamento importante na customização do template, porque `system` deve representar uma entidade `System` do Backstage, e não um namespace Kubernetes.
