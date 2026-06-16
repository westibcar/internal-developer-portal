# Tratamento de Erros

## Erros de autenticação

- `401 Unauthorized` quando o token está ausente, inválido ou expirado
- `401 Unauthorized` quando as credenciais de login não conferem

## Erros de validação

- `400 Bad Request` quando a validação de entrada falha na lógica de negócio
- Erros de validação do Pydantic quando os corpos de requisição não correspondem ao schema esperado

## Erros de upload

- `400 Bad Request` quando o arquivo não é uma imagem ou a extensão não é suportada
- `500 Internal Server Error` quando a persistência do arquivo falha

## Erros operacionais

- Falhas de conectividade com o banco são detectadas pelo loop de espera no startup e interrompem a inicialização após o orçamento de tentativas ser esgotado

## Observação de design do erro

O código usa o FastAPI e o tratamento explícito de `HTTPException`. Não existe um envelope global de erro dedicado na implementação atual.
