# ${{ values.appName }}

Aplicacao criada a partir de template Backstage para stack FastAPI.

## Metadados

- Owner: ${{ values.owner }}
- Namespace: ${{ values.namespace }}
- Backend Port: ${{ values.backendPort }}
- Frontend Port: ${{ values.frontendPort }}
- Database: ${{ values.databaseName }}

## Proximos passos

1. Ajustar regras de negocio no backend FastAPI.
2. Revisar parametros de deploy no Helm.
3. Configurar pipeline CI/CD.
