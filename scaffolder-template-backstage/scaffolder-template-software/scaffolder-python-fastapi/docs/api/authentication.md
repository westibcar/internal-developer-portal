# Autenticação

## Cadastro

`POST /auth/register` cria um usuário e retorna imediatamente um token de acesso JWT.

## Login

`POST /auth/login` aceita payloads em `application/x-www-form-urlencoded` por meio dos campos `username` e `password`.

## Tratamento do token

- Os tokens são assinados com `SECRET_KEY`
- O algoritmo é configurado por `JWT_ALGORITHM`
- A expiração é controlada por `JWT_EXPIRATION_TIME`

## Tratamento de senha

- As senhas são hasheadas com bcrypt
- A entrada é truncada para 72 bytes antes do hash e da verificação, para respeitar os limites do bcrypt

## Rotas protegidas

As rotas protegidas exigem:

```http
Authorization: Bearer <token>
```
