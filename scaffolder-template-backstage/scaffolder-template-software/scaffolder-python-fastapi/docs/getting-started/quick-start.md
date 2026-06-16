# Início Rápido

## Subir a stack

```bash
docker compose up --build -d
```

## Verificar a saúde

```bash
curl http://localhost:8000/health
```

## Abrir a aplicação

- Frontend: `http://localhost`
- Backend: `http://localhost:8000`
- Swagger UI: `http://localhost:8000/docs`

## Criar um usuário

Use o formulário de cadastro no frontend ou chame a API diretamente por meio de [exemplos de API](../examples/api-examples.md).

## Criar uma empresa

Faça login e depois use o formulário de empresa no frontend ou chame `POST /companies/` com um bearer token válido.
