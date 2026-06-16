from pydantic import BaseModel, Field, StringConstraints
from typing_extensions import Annotated

class CompanyBase(BaseModel):
    nome_empresa: str
    cnpj: Annotated[str, StringConstraints(pattern=r'^\d{14}$')]

class CompanyCreate(CompanyBase):
    pass

class CompanyUpdate(CompanyBase):
    pass

class CompanyResponse(CompanyBase):
    id: int

    class Config:
        from_attributes = True