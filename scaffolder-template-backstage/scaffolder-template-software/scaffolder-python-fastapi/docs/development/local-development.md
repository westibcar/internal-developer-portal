# Desenvolvimento Local

## Caminho mais rápido

```bash
docker compose up --build -d
```

## Desenvolvimento apenas do backend

Se você quiser trabalhar apenas no backend, use Python 3.11, instale as dependências de `uday-app/requirements.txt`, configure as variáveis de ambiente e execute o Uvicorn manualmente.

```bash
cd uday-app
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Variáveis de ambiente

- `DATABASE_URL`
- `SECRET_KEY`
- `JWT_ALGORITHM`
- `JWT_EXPIRATION_TIME`
- `BACKEND_HOST` para o container do frontend

## Verificações úteis

```bash
curl http://localhost:8000/health
curl http://localhost:8000/docs
```
