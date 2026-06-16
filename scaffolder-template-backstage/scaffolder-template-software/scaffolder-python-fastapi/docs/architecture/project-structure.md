# Estrutura do Projeto

O repositório contém o template e o skeleton da aplicação gerada.

## Layout de alto nível

| Caminho | Finalidade |
|---|---|
| `template-backstage/` | Template do Backstage e conteúdo do skeleton gerado |
| `uday-app/` | Código da aplicação usado pelo template |
| `helm/uday-app/` | Chart de deploy para Kubernetes |
| `argocd/` | Manifesto da aplicação ArgoCD |
| `.github/workflows/` | Workflows de CI/CD do GitHub Actions |
| `Dockerfile.backend` | Build da imagem do backend |
| `Dockerfile.frontend` | Build da imagem do frontend |
| `docker-compose.yaml` | Runtime local com múltiplos containers |
| `nginx.conf` | Configuração de proxy reverso do frontend |
| `entrypoint.sh` | Script compartilhado de inicialização dos containers |

## Árvore de código do backend

| Caminho | Finalidade |
|---|---|
| `uday-app/app/main.py` | Ponto de entrada da aplicação FastAPI |
| `uday-app/app/core/config.py` | Configurações orientadas por ambiente |
| `uday-app/app/core/database.py` | Engine SQLAlchemy e gerenciamento de sessão |
| `uday-app/app/models/` | Modelos SQLAlchemy |
| `uday-app/app/schemas/` | Modelos Pydantic de request e response |
| `uday-app/app/routes/` | Rotas da API |
| `uday-app/app/services/` | Lógica de autenticação e helpers de negócio |
| `uday-app/app/utils/` | Helpers de health check e validação |
| `uday-app/alembic/` | Ambiente e versões de migração |
| `uday-app/frontend/` | Assets estáticos do frontend |

## Arquivos não presentes no repositório

O outline de destino cita `src/`, `tests/`, `templates/`, `skeleton/`, `mkdocs.yml`, `pyproject.toml` e `requirements.txt` na raiz. Este repositório não usa esse layout exato. O código real vive em `uday-app/` e a documentação aqui reflete essa estrutura real.
