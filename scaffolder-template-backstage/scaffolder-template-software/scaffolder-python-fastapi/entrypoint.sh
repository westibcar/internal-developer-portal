#!/bin/sh

# ============ FRONTEND (Nginx) ============
if [ ! -f "/app/app/main.py" ]; then
    echo "=== Iniciando Frontend (Nginx) ==="
    
    # Substituir placeholder __BACKEND_HOST__ pela variável de ambiente
    BACKEND_HOST=${BACKEND_HOST:-backend}
    echo "Backend: $BACKEND_HOST"
    
    sed "s|__BACKEND_HOST__|$BACKEND_HOST|g" /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf
    exec nginx -g "daemon off;"
fi

# ============ BACKEND (FastAPI) ============
echo "=== Iniciando Backend (FastAPI) ==="
echo "Aguardando PostgreSQL..."
while ! nc -z  postgres 5432; do
    sleep 0.5
done
echo "PostgresSQL esta pronto!"

# Incia a aplicação
echo "Iniciando aplicação FastAPI"
exec uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
