from pydantic import BaseModel, EmailStr, Field

class UserBase(BaseModel):
    nome: str
    email: EmailStr
    bio: str | None = None
    profissao: str | None = None
    departamento: str | None = None
    genero: str | None = None

class UserCreate(UserBase):
    senha: str = Field(..., min_length=6, max_length=72)

class UserLogin(BaseModel):
    email: EmailStr
    senha: str

class UserUpdate(BaseModel):
    nome: str | None = None
    email: EmailStr | None = None
    bio: str | None = None
    profissao: str | None = None
    departamento: str | None = None
    senha: str | None = None

class UserResponse(UserBase):
    id: int
    foto_perfil: str | None = None

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: str | None = None