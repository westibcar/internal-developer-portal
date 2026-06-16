# Ambientes

## Local

O Docker Compose fornece o ambiente local mais rápido.

## Kubernetes

O chart Helm foi desenhado para deploy em cluster e inclui backend, frontend, PostgreSQL e recursos relacionados à malha de serviços.

## GitOps

O ArgoCD reconcilia continuamente o estado do cluster a partir do Git.

## CI/CD

O GitHub Actions constrói imagens, atualiza as tags no Helm e envia as mudanças para o ArgoCD detectar.
