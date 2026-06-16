from typing import List
import re

def validate_cnpj(cnpj: str) -> bool:
    # Remover caracteres não numéricos
    cnpj = re.sub(r'[^0-9]', '', cnpj)
    
    # Verificar tamanho
    if len(cnpj) != 14:
        return False
    
    # Verificar se todos os dígitos são iguais
    if len(set(cnpj)) == 1:
        return False
    
    # Cálculo do primeiro dígito verificador
    soma = 0
    peso = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    
    for i in range(12):
        soma += int(cnpj[i]) * peso[i]
    
    resto = soma % 11
    if resto < 2:
        dv1 = 0
    else:
        dv1 = 11 - resto
    
    if int(cnpj[12]) != dv1:
        return False
    
    # Cálculo do segundo dígito verificador
    soma = 0
    peso = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    
    for i in range(13):
        soma += int(cnpj[i]) * peso[i]
    
    resto = soma % 11
    if resto < 2:
        dv2 = 0
    else:
        dv2 = 11 - resto
    
    return int(cnpj[13]) == dv2