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

## Bootstrap (uma unica vez por cluster)

A aplicacao pai (`developer-portal`) agora gerencia toda a pasta `argocd/` via GitOps,
incluindo o proprio `project-backstage.yaml`. So e necessario aplicar manualmente a
aplicacao pai; dai em diante o ArgoCD cria/atualiza/recria o AppProject e as filhas
sozinho a cada mudanca no Git (self-heal).

```bash
kubectl apply -f argocd/app-of-apps/root/application-developer-portal.yaml -n argocd
kubectl get applications -n argocd
```

Por isso a `developer-portal` usa `project: default` (nao `backstage`): assim ela nao
depende do AppProject que ela mesma cria, evitando o erro
`InvalidSpecError: Application referencing project backstage which does not exist`
caso o AppProject seja apagado ou o cluster seja recriado.

## Observacoes

- As filhas aparecem como cards separados no dashboard.
- Para visualizar agrupado, abra `developer-portal` em Tree view.
- O detalhamento completo da estrutura App of Apps esta em `argocd/app-of-apps/README.md`.
- Se o AppProject `backstage` for apagado manualmente, o self-heal da `developer-portal`
  o recria automaticamente no proximo sync (nao precisa reaplicar nada na mao).
