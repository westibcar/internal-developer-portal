# Internal Developer Portal (IDP) com Backstage

Repositorio oficial do projeto pratico do curso **Internal Developer Portal (IDP)**.

Curso: [https://uday.com.br/cursos/internal-developer-portal-idp](https://uday.com.br/cursos/internal-developer-portal-idp)

Este projeto mostra, na pratica, como construir um portal interno de desenvolvimento com Backstage, evoluindo de um ambiente local ate uma arquitetura pronta para producao.

## Objetivo do projeto

Construir um IDP completo para centralizar:

- catalogo de software e ownership
- documentacao tecnica (TechDocs)
- templates para padronizacao de novos servicos
- automacoes de plataforma (incluindo Crossplane)
- autenticacao e gestao de usuarios e grupos
- extensao do portal com plugins
- operacao em ambiente de producao

## Trilha do curso (modulos)

Este repositorio vai implementar os topicos abaixo e muito mais:

1. Conceitos gerais
2. Implementando Backstage em Desenvolvimento
3. Catalogo de Software no Backstage
4. TechDocs do Backstage
5. Templates de Software do Backstage
6. Template do Crossplane no Backstage
7. Autenticacao de usuarios e grupos
8. Instalando Plugins no Backstage
9. Implementando Backstage em Producao
10. Extras avancados (boas praticas, governanca, seguranca, observabilidade e evolucao continua)

## Stack utilizada

- [Backstage](https://backstage.io)
- Node.js + Yarn
- Frontend React (app Backstage)
- Backend Node (servicos do portal)

## Estrutura do repositorio

```text
developer-portal/
	packages/
		app/        # Frontend do Backstage
		backend/    # Backend do Backstage
	plugins/      # Plugins customizados (quando aplicavel)
	examples/     # Exemplos de entidades e templates
```

## Pre-requisitos

- Node.js 20+ (recomendado)
- Yarn 1.x

## Como executar localmente

1. Instale dependencias:

```sh
yarn install
```

2. Inicie o projeto:

```sh
yarn start
```

3. Acesse:

- App: `http://localhost:3000`
- Backend: `http://localhost:7007`

## Configuracao

Arquivos principais:

- `app-config.yaml` (config base)
- `app-config.production.yaml` (config para producao)

## O que voce vai encontrar neste curso/projeto

- implementacao guiada, passo a passo
- exemplos reais para times de engenharia
- decisoes de arquitetura para escalar o portal
- padroes para adocao e governanca do IDP

## Roadmap

- [ ] Configuracao base do portal
- [ ] Cadastro de entidades no Catalog
- [ ] Publicacao de documentacao com TechDocs
- [ ] Criacao de Software Templates
- [ ] Integracao com Crossplane
- [ ] Integracao com provedor de identidade
- [ ] Instalacao e configuracao de plugins essenciais
- [ ] Hardening e deploy em producao

## Contribuicao

Sugestoes e melhorias sao bem-vindas.

Se voce estiver acompanhando o curso, abra issues com duvidas, ideias de conteudo e cenarios que gostaria de ver implementados.

## Licenca

Defina aqui a licenca do projeto (ex.: MIT, Apache-2.0 ou uso interno).
