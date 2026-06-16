# Testes

## Estado atual

O repositório inclui `pytest` em `requirements.txt`, mas não existe uma pasta dedicada `tests/` na árvore atual do template.

## Abordagem recomendada

- Adicionar testes unitários para services e helpers
- Adicionar testes de API para autenticação, perfil de usuário e endpoints de empresa
- Adicionar smoke tests para os fluxos de login e empresa no frontend

## Comando de exemplo

```bash
pytest
```

## O que deve ser coberto

- Hash e verificação de senha
- Criação e validação de token JWT
- Validação de CNPJ
- Endpoint de health check
- Tratamento de erros para rotas protegidas
