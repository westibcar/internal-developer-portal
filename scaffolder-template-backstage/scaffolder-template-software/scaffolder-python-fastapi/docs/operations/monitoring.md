# Monitoramento

## O que existe hoje

O repositório expõe um endpoint `/health` e emite logs de startup da aplicação. Não há uma implementação dedicada de stack de métricas na base de código.

## O que monitorar

- Saúde de inicialização do backend
- Prontidão do PostgreSQL
- Sucesso da execução das migrações
- Disponibilidade do proxy reverso do frontend
- Falhas de upload e de autenticação
