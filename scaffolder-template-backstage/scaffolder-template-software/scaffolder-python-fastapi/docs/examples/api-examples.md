# Exemplos de API

## Registrar e autenticar

```bash
curl -X POST http://localhost:8000/auth/register \
  -H 'Content-Type: application/json' \
  -d '{"nome":"Ana","email":"ana@example.com","senha":"StrongPass123","genero":"mulher"}'
```

```bash
curl -X POST http://localhost:8000/auth/login \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'username=ana@example.com&password=StrongPass123'
```

## Obter o usuário atual

```bash
curl http://localhost:8000/users/me \
  -H 'Authorization: Bearer <token>'
```

## Criar uma empresa

```bash
curl -X POST http://localhost:8000/companies/ \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{"nome_empresa":"Acme Ltda","cnpj":"12345678000199"}'
```
