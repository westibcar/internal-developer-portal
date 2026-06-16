# Endpoints

## Endpoints públicos

### GET /

| Campo | Valor |
|---|---|
| Finalidade | Retorna uma mensagem simples de boas-vindas |
| Autenticação | Não requerida |
| Status de sucesso | `200 OK` |
| Corpo da resposta | `{"message":"Bem-vindo à API Enterprise!"}` |

### GET /health

| Campo | Valor |
|---|---|
| Finalidade | Health check básico |
| Autenticação | Não requerida |
| Status de sucesso | `200 OK` |
| Corpo da resposta | `{"status":"OK","version":"1.0.0"}` |

### POST /auth/register

| Campo | Valor |
|---|---|
| Finalidade | Cria um novo usuário e retorna um JWT |
| Autenticação | Não requerida |
| Content-Type | `application/json` |
| Status de sucesso | `200 OK` |
| Corpo da requisição | `nome`, `email`, `senha`, e opcionalmente `bio`, `profissao`, `departamento`, `genero` |
| Corpo da resposta | `{"access_token":"...","token_type":"bearer"}` |
| Erros comuns | `400 Bad Request` quando o e-mail já existe |

### POST /auth/login

| Campo | Valor |
|---|---|
| Finalidade | Autentica um usuário e retorna um JWT |
| Autenticação | Não requerida |
| Content-Type | `application/x-www-form-urlencoded` |
| Status de sucesso | `200 OK` |
| Corpo da requisição | `username=<email>&password=<senha>` |
| Corpo da resposta | `{"access_token":"...","token_type":"bearer"}` |
| Erros comuns | `401 Unauthorized` quando as credenciais são inválidas |

## Endpoints protegidos

### GET /users/me

| Campo | Valor |
|---|---|
| Finalidade | Retorna o usuário autenticado atual |
| Autenticação | `Bearer token` obrigatório |
| Status de sucesso | `200 OK` |
| Corpo da resposta | Perfil do usuário conforme `UserResponse` |

### PUT /users/me

| Campo | Valor |
|---|---|
| Finalidade | Atualiza o perfil do usuário atual |
| Autenticação | `Bearer token` obrigatório |
| Content-Type | `application/json` |
| Status de sucesso | `200 OK` |
| Corpo da requisição | Payload parcial de `UserUpdate` |
| Corpo da resposta | Objeto `UserResponse` atualizado |
| Erros comuns | `400 Bad Request` quando a atualização falha |

### POST /users/me/upload-photo

| Campo | Valor |
|---|---|
| Finalidade | Faz upload da foto de perfil do usuário atual |
| Autenticação | `Bearer token` obrigatório |
| Content-Type | `multipart/form-data` |
| Status de sucesso | `200 OK` |
| Corpo da requisição | Campo `file` com uma imagem |
| Corpo da resposta | Nome do arquivo, URL pública e mensagem de sucesso |
| Erros comuns | `400 Bad Request` para arquivos não-imagem ou extensões não suportadas, `500 Internal Server Error` para falhas de persistência |

### DELETE /auth/delete-profile

| Campo | Valor |
|---|---|
| Finalidade | Exclui o usuário autenticado atual |
| Autenticação | `Bearer token` obrigatório |
| Status de sucesso | `200 OK` |
| Corpo da resposta | `{"message":"Perfil excluído com sucesso"}` |
| Erros comuns | `500 Internal Server Error` quando a exclusão no banco falha |

### POST /companies/

| Campo | Valor |
|---|---|
| Finalidade | Cria uma nova empresa |
| Autenticação | `Bearer token` obrigatório |
| Content-Type | `application/json` |
| Status de sucesso | `200 OK` |
| Corpo da requisição | `nome_empresa`, `cnpj` |
| Corpo da resposta | Objeto `CompanyResponse` |

### GET /companies/

| Campo | Valor |
|---|---|
| Finalidade | Lista empresas |
| Autenticação | `Bearer token` obrigatório |
| Query params | `skip` e `limit` |
| Status de sucesso | `200 OK` |
| Corpo da resposta | Array de objetos `CompanyResponse` |

## Observações de rota

- Endpoints de atualização e exclusão de empresas não estão implementados na base atual.
- A API de empresas expõe apenas as operações de criação e listagem.
- A rota de upload de foto salva os arquivos em `app/uploads` e retorna uma URL relativa em `/uploads/`.
- A camada de autenticação usa o fluxo OAuth2 password do FastAPI para login e tokens bearer para rotas protegidas.
