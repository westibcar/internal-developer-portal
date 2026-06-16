# Autenticação

A aplicação usa autenticação JWT bearer.

## Fluxo de login

1. O usuário envia as credenciais.
2. O backend valida a senha contra o valor hasheado armazenado no PostgreSQL.
3. O backend emite um token de acesso JWT assinado.
4. O cliente envia o token no header `Authorization` para rotas protegidas.

## Detalhes relevantes da implementação

- As senhas são hasheadas com bcrypt
- Os tokens são assinados com uma chave secreta configurável
- Os endpoints protegidos resolvem o usuário atual a partir do token
