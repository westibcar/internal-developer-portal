# Kubernetes

## Escopo do chart

O chart `helm/uday-app` inclui:

- recursos de deploy do PostgreSQL
- recursos de deploy do backend
- recursos de deploy do frontend
- claims de volume persistente
- referências a ConfigMap e Secret
- recursos de gateway e virtual service do Istio

## Objetos de deploy relevantes

- job `backend-migrations` para migração de schema
- `backend-service` e `frontend-service`
- `postgres-service`
- `uday-gateway`
- `uday-virtualservice`

## Observações operacionais

- O chart assume que as tags das imagens são atualizadas pelo CI/CD
- Os segredos são codificados no arquivo de values para consumo em tempo de deploy
- O Longhorn aparece como storage class padrão nos values de exemplo
