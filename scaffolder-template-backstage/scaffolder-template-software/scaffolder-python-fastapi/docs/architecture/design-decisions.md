# Decisões de Design

## Por que FastAPI

FastAPI oferece validação tipada de requisições, geração automática de OpenAPI e um modelo de rotas simples e amigável para async, que combina bem com o serviço gerado.

## Por que um frontend estático

O template usa intencionalmente um frontend estático leve em vez de um framework SPA pesado para reduzir a complexidade do setup e manter o foco no backend e nos padrões de entrega.

## Por que PostgreSQL e SQLAlchemy

O PostgreSQL fornece uma base relacional padrão para o template, enquanto SQLAlchemy e Alembic mantêm explícita a evolução de modelos e schema.

## Por que autenticação JWT

JWT é fácil de consumir a partir do frontend estático e de clientes externos, além de manter a superfície de dependências pequena.

## Por que Nginx como proxy reverso

O Nginx serve os assets estáticos e encaminha as chamadas da API para o backend sem exigir que o frontend conheça o host do backend em tempo de build.

## Por que separar backend, frontend e artefatos de infraestrutura

A separação mantém lógica da aplicação, lógica de deploy e lógica do scaffolding isoladas, o que simplifica onboarding e evolução futura.
