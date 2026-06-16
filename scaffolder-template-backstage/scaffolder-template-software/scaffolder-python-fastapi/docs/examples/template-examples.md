# Exemplos do Template

## Exemplo de entradas no Backstage

| Campo | Exemplo |
|---|---|
| Nome da aplicação | `customer-portal` |
| Descrição | `Portal de autoatendimento do cliente` |
| Owner | `group:default/platform` |
| Namespace | `platform` |
| Porta do backend | `8000` |
| Porta do frontend | `80` |
| Nome do banco | `customer_portal` |

## Saídas esperadas geradas

- Repositório publicado no GitHub
- `catalog-info.yaml` gerado na raiz do repositório
- Backend FastAPI pronto para execução
- Container do frontend Nginx pronto para servir a interface
