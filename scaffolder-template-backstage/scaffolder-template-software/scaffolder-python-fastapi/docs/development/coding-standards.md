# Padrões de Código

## Estilo Python

- Mantenha os handlers de rota enxutos
- Coloque a lógica de negócio em services
- Separe modelos SQLAlchemy e schemas Pydantic
- Prefira modelos explícitos de request e response

## Estilo de validação

- Valide na fronteira do schema
- Adicione validação de negócio quando a validação do schema não for suficiente
- Mantenha as mensagens de erro amigáveis e acionáveis

## Convenções de estrutura

- `app/routes` para endpoints HTTP
- `app/services` para lógica reutilizável
- `app/models` para modelos de persistência
- `app/schemas` para contratos da API
- `app/utils` para helpers que não pertencem a outros lugares
