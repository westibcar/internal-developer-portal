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

### Secret do backend (sem expor credenciais no Git)

O chart nunca deve receber credenciais reais via `values-*.yaml`. Em vez disso,
`secrets.existingSecret: <nome>` ja esta configurado em `values-dev.yaml` e
`values-prod.yaml`, e o proprio pipeline de CD (`.github/workflows/cd.yaml`,
job `argocd_sync`, step "Apply backend secret") cria/atualiza esse Secret a
cada deploy, lendo os valores dos GitHub Actions secrets (nivel repositorio):

Compartilhados entre dev e prod (mesmo cluster):

- `K8S_SERVICE_ACCOUNT_TOKEN`
- `K8S_CA_DATA`
- `BACKSTAGE_GITHUB_TOKEN` (fine-grained token do GitHub)

Por ambiente (cada um com seu proprio OAuth App no GitHub, porque um OAuth App
classico so aceita uma unica Authorization callback URL):

- `AUTH_GITHUB_CLIENT_ID_DEV` / `AUTH_GITHUB_CLIENT_SECRET_DEV`
- `AUTH_GITHUB_CLIENT_ID_PROD` / `AUTH_GITHUB_CLIENT_SECRET_PROD`

O pipeline aplica o Secret via `kubectl create secret ... --dry-run=client -o yaml
| kubectl apply -f -` e reinicia o `Deployment` do backend automaticamente
**somente quando algum valor muda** (pods so leem env vars na inicializacao).

Quando `secrets.existingSecret` esta preenchido, o chart **nao** cria nem gerencia
esse Secret (ver `templates/backstage-secrets.yaml`), entao nada sensivel entra no
`values-dev.yaml`/`values-prod.yaml` nem no historico do Git.

Para rodar localmente sem o pipeline (ex.: debug manual), aplique o mesmo Secret na mao:

```bash
kubectl create secret generic backstage-dev-secrets \
  -n backstage-dev \
  --from-literal=K8S_SERVICE_ACCOUNT_TOKEN="$(kubectl create token backstage -n default --duration=8760h)" \
  --from-literal=K8S_CA_DATA="$(kubectl config view --raw --minify --flatten -o jsonpath='{.clusters[].cluster.certificate-authority-data}')" \
  --from-literal=GITHUB_TOKEN="<fine-grained token do GitHub>" \
  --from-literal=AUTH_GITHUB_CLIENT_ID="<client id do OAuth App>" \
  --from-literal=AUTH_GITHUB_CLIENT_SECRET="<client secret do OAuth App>" \
  --dry-run=client -o yaml | kubectl apply -f -
kubectl rollout restart deployment/backstage-dev-backend -n backstage-dev
```

### Secret do Postgres em prod

Assim como o secret do backend, `values-prod.yaml` usa `postgres.auth.existingSecret:
backstage-postgres-secret` para nao ter senha em texto plano no Git. O pipeline
(step "Apply postgres secret (prod)", so roda para `environment: prod`) garante
esse Secret a partir do GitHub Actions secret `POSTGRES_PASSWORD_PROD`.

Importante: o Postgres so aplica `POSTGRES_PASSWORD` na **primeira** inicializacao
do banco (volume vazio). Se `POSTGRES_PASSWORD_PROD` for alterado depois que o
Postgres ja rodou uma vez, o Secret do Kubernetes muda mas a senha real dentro do
banco **nao muda sozinha** — isso quebraria a conexao do backend. Para trocar a
senha de verdade, faca o `ALTER USER` no Postgres e so depois atualize o secret do
GitHub com o mesmo valor. Dev nao tem esse problema: `values-dev.yaml` usa senha
em texto plano e o chart cria o Secret sozinho (aceitavel para ambiente nao
produtivo).

Em dev, o Postgres nao usa `existingSecret` — o proprio chart cria o secret com a
senha de `values-dev.yaml` (`postgres.auth.password`).

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
- `K8S_SERVICE_ACCOUNT_TOKEN`, `K8S_CA_DATA`, `BACKSTAGE_GITHUB_TOKEN`,
  `AUTH_GITHUB_CLIENT_ID_DEV`, `AUTH_GITHUB_CLIENT_SECRET_DEV`,
  `AUTH_GITHUB_CLIENT_ID_PROD`, `AUTH_GITHUB_CLIENT_SECRET_PROD` (ver secao
  "Secret do backend" acima — usados pelo job `argocd_sync` para montar o
  Secret do backend do Backstage)
- `POSTGRES_PASSWORD_PROD` (ver secao "Secret do Postgres em prod" acima)

Importante: crie os Environments no GitHub (`dev`, `hml`, `prod`) e configure todos os secrets acima em cada um, caso use clusters/credenciais diferentes por ambiente.

## Recriar tudo do zero (checklist)

Se o cluster for recriado ou as Applications do ArgoCD forem deletadas, o que
esta neste repositorio (Helm chart, workflows, Applications do ArgoCD) volta
sozinho via GitOps/CI. O que **nao** volta sozinho, porque vive fora do
cluster e do Git:

1. **GitHub Actions secrets** (`Settings > Secrets and variables > Actions`) —
   ja listados acima. Sobrevivem a recriacao do cluster (ficam no GitHub), so
   precisam ser recriados se o **repositorio** for recriado.
2. **OAuth Apps do GitHub** (`https://github.com/settings/developers`) — um
   para dev, um para prod, cada um com sua Authorization callback URL. Tambem
   sobrevivem a recriacao do cluster.
3. **Bootstrap do ArgoCD** — o job de dev (`.github/workflows/cd.yaml`, step
   "Ensure ArgoCD root Application exists (dev)") ja garante sozinho que a
   Application `developer-portal` (root app-of-apps) existe, criando-a se
   necessario. Isso cria/gerencia o `AppProject backstage` e as Applications
   `backstage-dev`/`backstage-prod` via GitOps. Ou seja: **rodar o deploy de
   dev uma vez** (push em `develop`) e reproduz sozinho.
   - O job de prod **nao** faz esse bootstrap de proposito (roda so via
     `release: published`, que deve acontecer depois do dev). Se por algum
     motivo prod precisar rodar num cluster novo antes do dev ter rodado ao
     menos uma vez, aplique manualmente antes:

     ```bash
     kubectl apply -f argocd/app-of-apps/root/application-developer-portal.yaml -n argocd
     ```

4. Os secrets `backstage-dev-secrets`, `backstage-secrets` (backend) e
   `backstage-postgres-secret` (Postgres de prod) sao recriados automaticamente
   pelo pipeline de CD na primeira execucao apos o bootstrap (nao precisa
   aplicar nada manualmente). O Postgres de dev tambem se recria sozinho (senha
   vem do `values-dev.yaml`).
5. Namespaces (`backstage-dev`, `backstage`) sao criados automaticamente pelo
   ArgoCD (`CreateNamespace=true`).

Ou seja: depois de um cluster novo, basta um `git push` em `develop` — o
pipeline de dev cria o bootstrap do ArgoCD e o resto se monta sozinho. Prod so
precisa do passo manual do item 3 se rodar antes do primeiro deploy de dev.
