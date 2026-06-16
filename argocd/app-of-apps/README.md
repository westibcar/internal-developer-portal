# GitOps App of Apps - Backstage

## Estrutura do repositorio GitOps

```text
argocd/
  app-of-apps/
    root/
      application-developer-portal.yaml
    apps/
      dev/
        application.yaml
      hml/
        application.yaml
      prod/
        application.yaml
```

## O que cada manifesto faz

- application-developer-portal.yaml
  - Aplicacao pai (App of Apps)
  - Faz scan recursivo da pasta `argocd/app-of-apps/apps`
  - Cria/atualiza as aplicacoes filhas automaticamente

- apps/dev/application.yaml
  - Aplicacao filha do ambiente dev
  - Destino: namespace `backstage-dev`
  - Helm values: `values-dev.yaml`

- apps/hml/application.yaml
  - Aplicacao filha do ambiente hml
  - Destino: namespace `backstage-hml`
  - Helm values: `values-hml.yaml`

- apps/prod/application.yaml
  - Aplicacao filha do ambiente prod
  - Destino: namespace `backstage`
  - Helm values: `values-prod.yaml`

## Aplicacao no cluster

1. Se hoje voce usa ApplicationSet com os mesmos nomes (`backstage-dev`, `backstage-hml`, `backstage-prod`), remova o ApplicationSet antes da migracao para evitar conflito de ownership:

```bash
kubectl delete applicationset backstage-envs -n argocd
```

2. Aplique a aplicacao pai:

```bash
kubectl apply -f argocd/app-of-apps/root/application-developer-portal.yaml -n argocd
```

3. Valide a arvore:

```bash
kubectl get applications -n argocd
```

## Sincronizacao automatica

Todos os apps (pai e filhas) estao com:
- `automated.prune: true`
- `automated.selfHeal: true`
- `CreateNamespace=true`
- `ServerSideApply=true`

## Promocao entre ambientes (boas praticas)

- Estrategia recomendada:
  - dev recebe primeiro
  - hml valida integracao
  - prod recebe depois de aprovacao

- Opcao simples (mesmo branch):
  - manter `main` nos 3 ambientes e promover por PR com aprovacao por time

- Opcao madura (por branch/tag):
  - dev -> `develop`
  - hml -> `release`
  - prod -> `main` ou tag semantica (`vX.Y.Z`)
  - cada filha pode usar `targetRevision` diferente

## Como aparece no painel do Argo CD

- Uma aplicacao pai: `developer-portal`
- Tres filhas abaixo dela na arvore:
  - `backstage-dev`
  - `backstage-hml`
  - `backstage-prod`

Na lista de Applications voce ainda vera 4 cards (pai + 3 filhas), mas no modo Tree do app pai fica exatamente o agrupamento por ambiente.
