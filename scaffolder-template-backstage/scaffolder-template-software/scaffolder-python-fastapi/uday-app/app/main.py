from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
from app.core.config import settings
from app.routes import auth, users, companies
from app.utils.healthcheck import wait_for_db

app = FastAPI(
    title="FastAPI Enterprise",
    description="API empresarial com FastAPI e PostgreSQL",
    version="1.0.0"
)

# Montar diretório de uploads
uploads_path = os.path.join(os.getcwd(), "app/uploads")
print(f"Servindo arquivos estáticos de: {uploads_path}")
app.mount("/uploads", StaticFiles(directory=uploads_path), name="uploads")

# Configuração CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Em produção, especifique os domínios permitidos
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir routers
app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(users.router, prefix="/users", tags=["users"])
app.include_router(companies.router, prefix="/companies", tags=["companies"])

@app.get("/")
async def root():
    return {"message": "Bem-vindo à API Enterprise!"}

@app.get("/health")
async def health_check():
    return {"status": "OK",
            "version": "1.0.0"}

# Esperar o banco de dados estar pronto
print("Waiting for database to be ready...")
wait_for_db()
