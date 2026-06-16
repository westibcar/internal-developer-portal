# Visão Geral do Projeto

Este repositório contém um template Backstage Scaffolder que gera um portal empresarial pequeno construído com FastAPI, PostgreSQL, um frontend estático, Docker e artefatos de deploy compatíveis com Kubernetes.

## Objetivo

O template padroniza a criação de novos serviços para que os times não precisem montar a mesma stack repetidamente. Ele fornece um ponto de partida consistente para autenticação, gestão de perfil de usuário, cadastro de empresas, entrega de frontend estático e automação de deploy.

## Problemas que resolve

- Reduz o tempo de setup de novos serviços internos
- Impõe uma estrutura comum para API, banco e frontend
- Oferece um caminho repetível de deploy com Docker, Helm e ArgoCD
- Facilita o registro dos serviços gerados no Backstage

## Quando usar

Use este template quando precisar de um serviço semelhante ao padrão atual do portal FastAPI e quiser que o projeto gerado siga as mesmas convenções operacionais e de entrega.

## Casos de uso típicos

- Portais administrativos internos
- Backends leves com uma casca de frontend compartilhada
- Aplicações estilo CRUD com autenticação
- Projetos que precisam de uma entidade de catálogo no Backstage e de um fluxo padrão de CI/CD

## Benefícios para os times

- Onboarding mais rápido
- Menor desvio arquitetural
- Padrões consistentes de deploy e gestão de segredos
- Observabilidade e suporte mais fáceis
