# Helm

## Identidade do chart

O chart é definido em `helm/uday-app/Chart.yaml` e versionado como um chart de aplicação.

## Modelo de values

O chart usa um único `values.yaml` para configurar:

- metadados de registry e service account
- secrets e configmaps
- armazenamento persistente
- referências de imagem do backend e do frontend
- configuração do host do Istio

## Modelo de deploy

O Helm é a ponte entre as imagens de container construídas e o cluster Kubernetes. O GitHub Actions atualiza as tags das imagens no arquivo de values e o ArgoCD aplica a mudança resultante.
