# Ciclo de Vida do Template

## Fases do ciclo de vida

1. Um usuário abre o template no Backstage.
2. O usuário informa os parâmetros do Scaffolder.
3. O template renderiza o repositório skeleton.
4. O repositório é publicado no GitHub.
5. O componente gerado é registrado no catálogo.
6. CI/CD e deploy assumem após a criação do repositório.

## Saídas produzidas pelo template

- Um novo repositório com o esqueleto da aplicação
- Um `catalog-info.yaml` gerado
- Um link do repositório no Backstage
- Uma referência de entidade de catálogo para o componente criado

## Implicação operacional

O template não é o serviço em execução. Ele é a fábrica que cria o serviço em execução.
