from typing import List
from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from fastapi.staticfiles import StaticFiles
import os
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.user import User
from app.schemas.user import UserUpdate, UserResponse
from app.services.auth import get_current_user

router = APIRouter()
router.mount("/uploads", StaticFiles(directory="app/uploads"), name="uploads")

@router.get("/me", response_model=UserResponse)
async def read_user_me(current_user: User = Depends(get_current_user)):
    return current_user

@router.put("/me", response_model=UserResponse)
async def update_user_me(
    user_update: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    try:
        update_data = user_update.model_dump(exclude_unset=True, exclude_none=True)
        for key, value in update_data.items():
            setattr(current_user, key, value)
        
        db.commit()
        db.refresh(current_user)
        return current_user
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Erro ao atualizar usuário: {str(e)}"
        )

@router.post("/me/upload-photo")
async def upload_profile_photo(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    try:
        # Validar tipo do arquivo
        content_type = file.content_type
        if not content_type.startswith('image/'):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="O arquivo deve ser uma imagem"
            )

        # Criar diretório de uploads se não existir
        upload_dir = os.path.join("app", "uploads")
        os.makedirs(upload_dir, exist_ok=True)
        
        # Gerar nome único para o arquivo
        file_extension = os.path.splitext(file.filename)[1].lower()
        if file_extension not in ['.jpg', '.jpeg', '.png', '.gif']:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Formato de arquivo não suportado. Use JPG, PNG ou GIF"
            )

        file_name = f"{current_user.id}_profile{file_extension}"
        file_path = os.path.join(upload_dir, file_name)
        
        try:
            # Salvar arquivo
            file_content = await file.read()
            with open(file_path, "wb") as file_object:
                file_object.write(file_content)
        except IOError as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Erro ao salvar arquivo: {str(e)}"
            )
        
        try:
            # Atualizar caminho da foto no banco
            current_user.foto_perfil = file_name  # Salvamos apenas o nome do arquivo
            db.commit()
            print(f"Foto salva com sucesso: {file_name}")
        except Exception as e:
            # Se falhar ao atualizar o banco, remove o arquivo
            os.remove(file_path)
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Erro ao atualizar banco de dados: {str(e)}"
            )
        
        return {
            "filename": file_name,
            "url": f"/uploads/{file_name}",  # URL completa para o frontend
            "message": "Foto atualizada com sucesso"
        }
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erro inesperado ao fazer upload da foto: {str(e)}"
        )