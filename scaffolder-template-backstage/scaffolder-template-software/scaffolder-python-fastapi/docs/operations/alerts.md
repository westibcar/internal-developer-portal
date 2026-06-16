# Alertas

## Estado atual

O repositório não define regras de alerta, mas a aplicação possui sinais claros que devem virar alertas em produção.

## Condições de alerta recomendadas

- Health check falhando
- Loop de reinicialização do container do backend
- PostgreSQL indisponível
- Falhas nos workflows de CI/CD
- Falhas no push de imagem ou na sincronização do ArgoCD
