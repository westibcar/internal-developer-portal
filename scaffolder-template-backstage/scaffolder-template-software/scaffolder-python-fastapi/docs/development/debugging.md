# Depuração

## Debug do backend

O ponto de entrada do backend é `uday-app/app/main.py`. Você pode executá-lo com reload do Uvicorn e inspecionar os logs no container ou no terminal.

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Debug do frontend

Abra as ferramentas de desenvolvedor do navegador e inspecione as chamadas de rede para `/api/*`. O frontend mantém o token JWT em `localStorage`, então o estado de autenticação pode ser verificado ali.

## Debug de containers

- Inspecione os logs do backend se o startup do banco falhar
- Inspecione os logs do Nginx no frontend se o proxy falhar
- Verifique a lógica de `entrypoint.sh` quando um container iniciar o caminho de serviço errado
