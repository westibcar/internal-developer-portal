# Pré-requisitos

## Ferramentas obrigatórias

- Docker
- Docker Compose
- Git
- Uma instância do Backstage com o Scaffolder habilitado
- Acesso ao host do repositório Git de destino

## Ferramentas recomendadas

- Python 3.11 para trabalho local no backend
- Um navegador moderno para testar o frontend e o Swagger UI
- kubectl e Helm para validação de deploy

## O que o repositório já inclui

O template já inclui:

- código-fonte do backend FastAPI em `uday-app/app`
- assets estáticos do frontend em `uday-app/frontend`
- migrações Alembic em `uday-app/alembic`
- Dockerfiles para backend e frontend
- chart Helm em `helm/uday-app`
- workflows GitHub Actions em `.github/workflows`
