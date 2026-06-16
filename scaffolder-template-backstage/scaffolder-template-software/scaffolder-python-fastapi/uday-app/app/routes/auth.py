from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.config import settings
from app.schemas.user import UserCreate, Token
from app.models.user import User
from app.services.auth import (
    authenticate_user,
    create_access_token,
    get_password_hash,
    create_user,
    get_current_user
)

router = APIRouter()

@router.post("/register", response_model=Token)
async def register(user: UserCreate, db: Session = Depends(get_db)):
    # Verificar se o usuário já existe
    db_user = await create_user(user, db)
    if not db_user:
        raise HTTPException(
            status_code=400,
            detail="Email já registrado"
        )
    
    # Criar token de acesso
    access_token_expires = timedelta(minutes=settings.JWT_EXPIRATION_TIME)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email ou senha incorretos",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=settings.JWT_EXPIRATION_TIME)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.delete("/delete-profile")
async def delete_profile(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    try:
        # Deletar o usuário do banco de dados
        db.delete(current_user)
        db.commit()
        return {"message": "Perfil excluído com sucesso"}
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Erro ao excluir o perfil"
        )