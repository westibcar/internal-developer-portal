# CI/CD

## Workflows do GitHub Actions presentes no repositório

| Workflow | Finalidade |
|---|---|
| `ci.yaml` | Detecta o que mudou e constrói apenas a(s) imagem(ns) afetada(s) |
| `cd.yaml` | Atualiza as tags das imagens no Helm e envia a mudança para o ArgoCD |
| `ci-cd.yaml` | Orquestra os workflows reutilizáveis de CI e CD |

## Comportamento do CI

- Detecta se houve alteração no backend, no frontend ou apenas no Helm
- Constrói a(s) imagem(ns) Docker afetada(s)
- Marca as imagens com o short SHA do commit

## Comportamento do CD

- Atualiza os values do Helm com as novas tags de imagem
- Faz commit e push da mudança
- Garante que a aplicação do ArgoCD exista
- Permite que o ArgoCD reconcilie o cluster automaticamente

## Observação importante

Os workflows usam runners self-hosted, então o pipeline de deploy depende da disponibilidade do runner e do acesso ao Docker.
