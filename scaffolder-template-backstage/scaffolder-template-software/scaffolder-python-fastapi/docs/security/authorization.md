# Autorização

## Modelo atual

A implementação atual é centrada em autenticação. Um token válido libera o acesso às rotas protegidas, e ainda não existe uma camada de autorização baseada em papéis no repositório.

## Implicação prática

Hoje, todos os usuários autenticados podem acessar as rotas protegidas de usuário e empresa se tiverem um token válido e o registro existir no banco.

## Evolução recomendada

- Introduzir papéis ou grupos se o template crescer além de um portal interno simples
- Adicionar checagens de permissão para ações administrativas
- Documentar essas checagens no catálogo do Backstage quando forem adicionadas
