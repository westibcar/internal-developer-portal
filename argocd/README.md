# Argo CD - Developer Portal

## Modelo atual
Este repositorio usa o padrao App of Apps.

- Aplicacao pai: `developer-portal`
- Aplicacoes filhas: `backstage-dev`, `backstage-hml`, `backstage-prod`

## Estrutura ativa
- `project-backstage.yaml`: AppProject com permissoes e destinos
- `app-of-apps/root/application-developer-portal.yaml`: aplicacao pai
- `app-of-apps/apps/dev/application.yaml`: filha dev
- `app-of-apps/apps/hml/application.yaml`: filha hml
- `app-of-apps/apps/prod/application.yaml`: filha prod

## Aplicacao
```bash
kubectl apply -f argocd/project-backstage.yaml -n argocd
kubectl apply -f argocd/app-of-apps/root/application-developer-portal.yaml -n argocd
kubectl get applications -n argocd
```

## Observacoes
- As filhas aparecem como cards separados no dashboard.
- Para visualizar agrupado, abra `developer-portal` em Tree view.
- O detalhamento completo da estrutura App of Apps esta em `argocd/app-of-apps/README.md`.
