# Smart GitOps CI/CD Guide

## 🚀 O que mudou?

Seu novo CI/CD agora é **inteligente e GitOps-ready**:

```
Push backend/        → Build só backend      → Update values-dev.yaml → Commit → ArgoCD sync
Push frontend/       → Build só frontend     → Update values-dev.yaml → Commit → ArgoCD sync
Push ambos/          → Build ambos           → Update values-dev.yaml → Commit → ArgoCD sync
Push kubernetes/     → Não rebuilda, só sync → ArgoCD sync
```

## 📋 Como funciona?

### 1. **Detecção de Mudanças (Path Detection)**
```bash
job: detect-changes
├── backend_changed:  ✓ se developer-portal/packages/backend/* mudou
├── frontend_changed: ✓ se developer-portal/packages/app/* mudou
└── kubernetes_changed: ✓ se kubernetes/helm/backstage/* mudou
```

### 2. **Build Condicional**
- `build_backend` roda **SOMENTE se** backend mudou
- `build_frontend` roda **SOMENTE se** frontend mudou
- Ambos podem rodar em paralelo se ambos mudaram

### 3. **Auto-Update de Values**
- Nova tag da imagem é atualizada automaticamente em:
  - `kubernetes/helm/backstage/values-dev.yaml` (branch: develop)
  - `kubernetes/helm/backstage/values-hml.yaml` (branch: hml)
  - `kubernetes/helm/backstage/values-prod.yaml` (branch: main)

### 4. **Auto-Commit**
- Mudanças de tag são commitadas de volta ao repositório
- Commit message mostra exatamente o que foi atualizado

### 5. **ArgoCD Sync Automático**
- ArgoCD já está configurado com `syncPolicy.automated`
- Quando values mudam, ArgoCD detecta e sincroniza automaticamente

## 🧪 Como testar?

### Teste 1: Rebuild apenas backend

```bash
# Edite algum arquivo no backend
echo "// test comment" >> developer-portal/packages/backend/src/index.ts

# Commit e push
git add developer-portal/packages/backend/
git commit -m "test: backend change only"
git push origin develop
```

**Esperado:**
- ✓ `detect-changes`: backend_changed=true, frontend_changed=false
- ✓ `build_backend`: executa
- ✗ `build_frontend`: skipped
- ✓ `update_values`: atualiza backend.image.tag em values-dev.yaml
- ✓ `deploy`: roda com novo tag
- ✓ ArgoCD sincroniza automaticamente

### Teste 2: Rebuild apenas frontend

```bash
echo "// test comment" >> developer-portal/packages/app/src/App.tsx

git add developer-portal/packages/app/
git commit -m "test: frontend change only"
git push origin develop
```

**Esperado:**
- ✓ `detect-changes`: backend_changed=false, frontend_changed=true
- ✗ `build_backend`: skipped
- ✓ `build_frontend`: executa
- ✓ `update_values`: atualiza frontend.image.tag em values-dev.yaml
- ✓ `deploy`: roda com novo tag

### Teste 3: Rebuild ambos

```bash
echo "// test" >> developer-portal/packages/backend/src/index.ts
echo "// test" >> developer-portal/packages/app/src/App.tsx

git add developer-portal/
git commit -m "test: both backend and frontend changes"
git push origin develop
```

**Esperado:**
- ✓ Ambos buildados em paralelo
- ✓ Ambas tags atualizadas em values-dev.yaml
- ✓ Deploy com ambas novas tags

## 📊 Monitorar o Workflow

### No GitHub
```
Settings → Actions → Workflows → Backstage Smart CI/CD
```

### No ArgoCD
```
Applications → backstage-dev (ou backstage-hml, backstage)
↓
Sync Status → verá atualização automática quando values.yaml mudar
```

### Verificar tag de imagem em execução
```bash
# Dev
kubectl get deployment backstage-dev-backend -n backstage-dev \
  -o jsonpath='{.spec.template.spec.containers[0].image}'

# Prod
kubectl get deployment backstage-backend -n backstage \
  -o jsonpath='{.spec.template.spec.containers[0].image}'
```

## ⚙️ Configuração por Ambiente

### Branch → Ambiente
| Branch | Environment | Namespace | Values File | Release Name |
|--------|------------|-----------|-------------|--------------|
| develop | dev | backstage-dev | values-dev.yaml | backstage-dev |
| hml | hml | backstage-hml | values-hml.yaml | backstage-hml |
| main | prod | backstage | values-prod.yaml | backstage |

## 🔧 Troubleshooting

### Workflow não roda?
✓ Verifique se há mudança em um desses paths:
  - `developer-portal/packages/backend/**`
  - `developer-portal/packages/app/**`
  - `kubernetes/helm/backstage/**`

### Build started mas não terminou?
✓ Cheque os logs em: GitHub → Actions → Backstage Smart CI/CD → [run]

### Auto-commit falhou?
✓ Verifique se `GITHUB_TOKEN` tem permissão write no repositório
✓ Settings → Actions → General → Workflow permissions → "Read and write permissions"

### ArgoCD não sincronizou?
✓ Verifique se a Application tem `syncPolicy.automated` ativado
✓ Command: `argocd app get backstage-dev` (ou backstage-hml, backstage)

### ImagePullBackOff após deploy?
✓ Isso é normal na primeira vez, ArgoCD pode levar 30-60s para sincronizar
✓ Wait, não há erro real — apenas aguarde

## 📝 Notas Importantes

1. **imagePullPolicy: Always** está ativado
   - Garante que cada deployment puxa a imagem mais recente
   - Mesmo que tag não mude, a imagem é atualizada

2. **Auto-update é inteligente**
   - Só atualiza o values correspondente ao componente que mudou
   - Evita commits desnecessários

3. **Commits automáticos**
   - Enviados como `github-actions[bot]`
   - Trigger workflows conforme configurado (atualmente não retriggeração para evitar loop)

4. **ArgoCD é a Source of Truth**
   - Sempre sincroniza de `kubernetes/helm/backstage/values-*.yaml`
   - Se manutenção manual, ArgoCD reverte em 3 minutos (syncInterval)

## 🎯 Próximos Passos (Opcional)

1. **Notifications**
   - Adicionar Slack/Discord notification ao final do deploy
   - Status check: sucesso vs falha

2. **Image Cleanup**
   - Registry agora tem múltiplas tags por componente
   - Considerar policy de limpeza de tags antigas (ex: manter últimas 10)

3. **Helm Test**
   - Adicionar `helm test` após deploy para validações pós-instalação

4. **Blue-Green Deployments**
   - Se precisar zero-downtime, adaptar strategy em StatefulSet/Deployment

---

**Dúvidas?** Verifique os logs do workflow ou me chama! 🚀
