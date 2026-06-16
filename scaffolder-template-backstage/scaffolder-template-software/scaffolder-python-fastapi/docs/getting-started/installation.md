# Instalação

## Caminho de instalação local

O repositório foi projetado para rodar localmente com Docker Compose.

```bash
docker compose up --build -d
```

## O que esse comando sobe

- PostgreSQL
- Container de migração do banco
- Container do backend FastAPI
- Container do frontend Nginx

## Caminho de instalação no Backstage

Para usar o template no Backstage, registre o arquivo `template-backstage/template.yaml` no catálogo e garanta que o catálogo consiga ler o skeleton do template em `template-backstage/content`.

## Depois da instalação

Abra o frontend na porta configurada e a API do backend diretamente na porta `8000` se ela for exposta fora do proxy do frontend.
