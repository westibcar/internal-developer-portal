# Backstage no Kubernetes com PostgreSQL

Este diretorio contem duas formas de deploy para o Backstage do projeto `developer-portal`:

- `manifests/`: YAMLs prontos para aplicar com `kubectl`
- `helm/backstage/`: chart Helm para parametrizar o deploy

## Arquitetura

- Frontend separado em um `Deployment` + `Service`
- Backend separado em um `Deployment` + `Service`
- PostgreSQL interno no cluster com `StatefulSet` + volume persistente
- `Ingress` roteando:
  - `/` para frontend
  - `/api` para backend
- StorageClass de volume persistente configurada para `longhorn-backstage` (Longhorn com 1 replica)

## 1) Deploy com manifests

Edite os valores antes do deploy:

- `manifests/postgres-secret.yaml`: senha do banco
- `manifests/backstage-configmap.yaml`: URL publica do Backstage
- `manifests/backstage-frontend-deployment.yaml`: imagem do frontend
- `manifests/backstage-backend-deployment.yaml`: imagem do backend
- `manifests/backstage-ingress.yaml`: host do ingress

Aplicar:

```bash
kubectl apply -f kubernetes/manifests/namespace.yaml
kubectl apply -f kubernetes/manifests/storageclass-longhorn-backstage.yaml
kubectl apply -f kubernetes/manifests/postgres-secret.yaml
kubectl apply -f kubernetes/manifests/postgres-service.yaml
kubectl apply -f kubernetes/manifests/postgres-statefulset.yaml
kubectl apply -f kubernetes/manifests/backstage-configmap.yaml
kubectl apply -f kubernetes/manifests/backstage-backend-deployment.yaml
kubectl apply -f kubernetes/manifests/backstage-backend-service.yaml
kubectl apply -f kubernetes/manifests/backstage-frontend-deployment.yaml
kubectl apply -f kubernetes/manifests/backstage-frontend-service.yaml
kubectl apply -f kubernetes/manifests/backstage-ingress.yaml
```

## 2) Deploy com Helm

Revise os valores em `helm/backstage/values.yaml`:

- `global.baseUrl`
- `backend.image.repository` e `frontend.image.repository`
- imagens publicadas no Nexus deste ambiente:
  - `registry.uday.corp:5000/backstage-backend:20260607-2`
  - `registry.uday.corp:5000/backstage-frontend:20260607-2`
- credenciais em `postgres.auth`
- `postgres.persistence.storageClassName` (padrao: `longhorn-backstage`)
- `postgres.persistence.size` (padrao: `2Gi`)
- `ingress.host`

### Exposicao com Istio

Para ambiente de producao, o chart esta configurado para usar Istio com dominio:

- `developer-portal.uday.corp`

Recursos criados pelo Helm quando `istio.enabled=true`:

- `Gateway` em `istio-system`
- `VirtualService` no namespace da aplicacao
- `DestinationRule` para frontend e backend

Roteamento configurado:

- `/api` -> service do backend (porta 7007)
- `/` -> service do frontend (porta 80)

No perfil `values-prod.yaml` o `Ingress` Kubernetes fica desabilitado para evitar conflito com Istio.

Se quiser TLS no Gateway Istio, ajuste:

- `istio.gateway.tls.enabled=true`
- `istio.gateway.tls.credentialName=<nome-do-secret-no-istio-system>`

Instalar:

```bash
helm upgrade --install backstage kubernetes/helm/backstage \
  --namespace backstage \
  --create-namespace
```

Observacao: no chart, `namespace.create` fica `false` por padrao para evitar conflito com `--create-namespace`.

Atualizar:

```bash
helm upgrade backstage kubernetes/helm/backstage -n backstage
```

### Padrao por ambiente (dev, hml, prod)

Arquivos de override criados:

- `helm/backstage/values-dev.yaml`
- `helm/backstage/values-hml.yaml`
- `helm/backstage/values-prod.yaml`

Deploy dev:

```bash
helm upgrade --install backstage-dev kubernetes/helm/backstage \
  -f kubernetes/helm/backstage/values.yaml \
  -f kubernetes/helm/backstage/values-dev.yaml \
  --namespace backstage-dev \
  --create-namespace
```

Deploy hml:

```bash
helm upgrade --install backstage-hml kubernetes/helm/backstage \
  -f kubernetes/helm/backstage/values.yaml \
  -f kubernetes/helm/backstage/values-hml.yaml \
  --namespace backstage-hml \
  --create-namespace
```

Deploy prod:

```bash
helm upgrade --install backstage kubernetes/helm/backstage \
  -f kubernetes/helm/backstage/values.yaml \
  -f kubernetes/helm/backstage/values-prod.yaml \
  --namespace backstage \
  --create-namespace
```

Remover:

```bash
helm uninstall backstage -n backstage
```

## Observacoes importantes

- O backend ja foi preparado para usar PostgreSQL via variaveis de ambiente no `app-config.production.yaml`.
- As imagens de frontend e backend devem ser publicadas em um registry acessivel pelo cluster.
- O PostgreSQL usa `PGDATA=/var/lib/postgresql/data/pgdata` para evitar erro de inicializacao com `lost+found` em volumes Longhorn.
- Se for usar banco externo, no Helm defina `postgres.enabled=false`, ajuste `postgres.host` e informe um secret existente em `postgres.auth.existingSecret`.

## Troubleshooting Longhorn

Se o pod do PostgreSQL ficar em `ContainerCreating` e o volume Longhorn ficar `faulted`, verifique se ha espaco para a politica de replicas.

No cluster de teste, a `StorageClass` `longhorn` esta com `numberOfReplicas: "3"`, e o evento retornado foi `insufficient storage`.

Opcoes comuns para resolver:

- aumentar espaco disponivel nos discos dos nos do cluster
- usar uma `StorageClass` Longhorn com menos replicas (por exemplo 1) para ambientes nao produtivos
- reduzir o tamanho solicitado em `postgres.persistence.size` (neste projeto o padrao foi ajustado para `2Gi`)

## Troubleshooting Registry

Se algum node nao resolver o host do Nexus (`registry.uday.corp`), o pod entra em `ErrImagePull`.

No cluster atual, o `worker02` nao resolve esse DNS. O chart foi configurado para agendar o frontend no `worker01` via `frontend.nodeSelector`.

Para corrigao definitiva, ajuste o DNS do node e depois remova o `nodeSelector` para voltar ao agendamento normal.

## Automacao com GitHub Actions

Workflow criado em `/.github/workflows/backstage-cicd.yaml` com:

- build e push das imagens no Nexus (`linux/amd64`)
- deploy Helm automatico por branch
- deploy manual com `workflow_dispatch`

Mapeamento de branch para ambiente:

- `develop` -> `dev`
- `hml` -> `hml`
- `main` -> `prod`

Secrets necessarios no GitHub:

- `NEXUS_APT_URL` (URL do proxy apt do Nexus, usado no build da imagem)
- `NEXUS_USERNAME`
- `NEXUS_PASSWORD`
- `KUBECONFIG_B64` (kubeconfig em base64)

Importante: crie os Environments no GitHub (`dev`, `hml`, `prod`) e configure o `KUBECONFIG_B64` em cada um, caso use clusters diferentes por ambiente.
