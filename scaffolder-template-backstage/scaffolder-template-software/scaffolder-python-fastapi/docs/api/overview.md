# Visão Geral da API

## Visão geral

O backend expõe uma aplicação FastAPI com APIs JSON para autenticação, gestão de perfil de usuário e operações estilo CRUD para empresas.

## URLs base

- Backend direto: `http://localhost:8000`
- Via proxy do frontend: `http://localhost/api`

## Documentação automática do FastAPI

O FastAPI expõe automaticamente:

- Swagger UI em `/docs`
- ReDoc em `/redoc`
- JSON OpenAPI em `/openapi.json`

## Modelo de autenticação

A API usa tokens JWT bearer. As rotas protegidas validam o token, resolvem o usuário atual e consultam o PostgreSQL via sessões SQLAlchemy.
