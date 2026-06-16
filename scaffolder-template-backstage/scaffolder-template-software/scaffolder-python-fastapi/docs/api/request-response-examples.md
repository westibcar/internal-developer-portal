# Exemplos de Requisição e Resposta

## Registrar um usuário

### cURL

```bash
curl -X POST http://localhost:8000/auth/register \
  -H 'Content-Type: application/json' \
  -d '{
    "nome": "Ana Silva",
    "email": "ana@example.com",
    "senha": "StrongPassword123",
    "bio": "Engenheira de plataforma",
    "profissao": "Engineer",
    "departamento": "Platform",
    "genero": "mulher"
  }'
```

### HTTPie

```bash
http POST :8000/auth/register nome='Ana Silva' email=ana@example.com senha='StrongPassword123' bio='Engenheira de plataforma' profissao='Engineer' departamento='Platform' genero='mulher'
```

### Python requests

```python
import requests

response = requests.post(
    "http://localhost:8000/auth/register",
    json={
        "nome": "Ana Silva",
        "email": "ana@example.com",
        "senha": "StrongPassword123",
        "bio": "Engenheira de plataforma",
        "profissao": "Engineer",
        "departamento": "Platform",
        "genero": "mulher",
    },
)
print(response.json())
```

## Login

O endpoint de login requer payload em formato de formulário.

```bash
curl -X POST http://localhost:8000/auth/login \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'username=ana@example.com&password=StrongPassword123'
```

## Criar uma empresa

```bash
curl -X POST http://localhost:8000/companies/ \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{"nome_empresa":"Acme Ltda","cnpj":"12345678000199"}'
```

## Enviar foto de perfil

```bash
curl -X POST http://localhost:8000/users/me/upload-photo \
  -H 'Authorization: Bearer <token>' \
  -F 'file=@photo.png'
```
