# 🚀 Formação DevOps Engineering para Aplicações

[![Curso](https://img.shields.io/badge/Curso-Uday-blue)](https://uday.com.br/cursos/formacao-devops-engineering-para-aplicacoes/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker)](https://www.docker.com/)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-Orchestration-326CE5?logo=kubernetes)](https://kubernetes.io/)
[![ArgoCD](https://img.shields.io/badge/ArgoCD-GitOps-EF7B4D?logo=argo)](https://argoproj.github.io/cd/)
[![Istio](https://img.shields.io/badge/Istio-Service%20Mesh-466BB0?logo=istio)](https://istio.io/)

Repositório prático da **[Formação DevOps Engineering para Aplicações](https://uday.com.br/cursos/formacao-devops-engineering-para-aplicacoes/)** — um curso completo que abrange todo o ciclo de vida de uma aplicação, desde o desenvolvimento até a entrega em produção com práticas modernas de DevOps.

---

## 📋 Sobre o Projeto

Este repositório contém uma aplicação full-stack real utilizada como base para aplicar, na prática, todos os conceitos abordados na formação:

- **Backend:** API REST construída com [FastAPI](https://fastapi.tiangolo.com/) + PostgreSQL
- **Frontend:** Interface web com HTML/CSS/JavaScript servida via Nginx
- **Banco de Dados:** PostgreSQL 15 com migrações gerenciadas pelo Alembic
- **Infraestrutura:** Kubernetes, Helm Charts, Istio, ArgoCD, Docker

---

## 🎓 Conteúdo da Formação

| # | Módulo | Descrição |
|---|--------|-----------|
| 1 | **Virtualização e Cloud** | Conceitos de virtualização, hipervisores e ambientes cloud |
| 2 | **Linux e ShellScript** | Fundamentos de Linux, automação com Bash e scripts |
| 3 | **Versionamento com Git e GitHub** | Controle de versão, branches, pull requests e workflows |
| 4 | **Testes com Aplicações e Python** | Testes unitários, integração e E2E com pytest |
| 5 | **Containers com Docker** | Criação de imagens, Dockerfile, Docker Compose |
| 6 | **Registry com Nexus** | Repositório privado de artefatos e imagens Docker |
| 7 | **Orquestração de Containers com Kubernetes** | Deployments, Services, StatefulSets, PVs, ConfigMaps, Secrets |
| 8 | **Service Mesh e Observabilidade com Istio** | Traffic management, segurança mTLS, Kiali, Grafana, Jaeger |
| 9 | **Helm Charts** | Empacotamento e gerenciamento de aplicações Kubernetes |
| 10 | **GitOps com ArgoCD** | Deploy contínuo declarativo e sincronização automática |
| 11 | **GitHub Actions CI/CD** | Pipelines de integração e entrega contínua |
| 12 | **Design Patterns para DevOps** | Padrões e boas práticas de arquitetura DevOps |
| 13 | **Soft Skills** | Comunicação, colaboração e cultura DevOps |

---

## 📁 Estrutura do Repositório

```
.
├── uday-app/                    # Código-fonte da aplicação
│   ├── app/                     # Backend FastAPI
│   │   ├── main.py              # Entrypoint da API
│   │   ├── core/                # Configurações e segurança
│   │   ├── models/              # Modelos SQLAlchemy
│   │   ├── routes/              # Endpoints da API
│   │   ├── schemas/             # Schemas Pydantic
│   │   ├── services/            # Lógica de negócio
│   │   └── utils/               # Utilitários
│   ├── frontend/                # Frontend HTML/CSS/JS
│   ├── alembic/                 # Migrações do banco de dados
│   └── requirements.txt         # Dependências Python
│
├── kubernetes/                  # Manifests Kubernetes (raw)
│   ├── 00-namespaces.yaml
│   ├── 01-docker-registry-secret.yaml
│   ├── 02-serviceaccount.yaml
│   ├── 03-secrets.yaml
│   ├── 04-configmap.yaml
│   ├── 05-persistent-volumes.yaml
│   ├── 06-postgres-statefulset.yaml
│   ├── 07-jobs-migration.yaml
│   ├── 08-backend-deployment.yaml
│   ├── 09-frontend-deployment.yaml
│   ├── 10-gateway.yaml
│   └── 11-virtualservice.yaml
│
├── helm/uday-app/               # Helm Chart da aplicação
│   ├── Chart.yaml
│   ├── values.yaml
│   └── templates/               # Templates Kubernetes
│
├── argocd/                      # Configuração ArgoCD
│   └── application.yaml         # Application CRD
│
├── istio-1.28.2/                # Istio Service Mesh
│   ├── bin/istioctl             # CLI do Istio
│   ├── ingress-addons/          # Gateways e VirtualServices (Grafana, Kiali, Jaeger, Prometheus)
│   └── samples/                 # Exemplos e addons
│
├── github-runner/               # Self-hosted GitHub Runner
│   ├── 00-docker-config.yaml
│   └── 01-runner-deployment.yaml
│
├── metallb/                     # MetalLB Load Balancer
│   └── metallb-config.yaml
│
├── shellscripts/                # Scripts Shell (prática Linux)
│
├── docker-compose.yaml          # Ambiente local com Docker Compose
├── Dockerfile.backend           # Imagem do Backend (Python 3.11)
├── Dockerfile.frontend          # Imagem do Frontend (Nginx Alpine)
├── nginx.conf                   # Configuração do Nginx
└── entrypoint.sh                # Script de inicialização
```

---

## 🚀 Quick Start

### Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/) e [Docker Compose](https://docs.docker.com/compose/install/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/) (para deploy em Kubernetes)
- [Helm](https://helm.sh/docs/intro/install/) (para Helm Charts)

### Executando localmente com Docker Compose

```bash
# Clonar o repositório
git clone https://github.com/westibcar/DevOps.git
cd DevOps

# Subir todos os serviços
docker compose up -d

# Verificar os serviços
docker compose ps
```

A aplicação estará disponível em:

| Serviço | URL |
|---------|-----|
| Frontend | http://localhost |
| Backend API | http://localhost:8000 |
| API Docs (Swagger) | http://localhost:8000/docs |
| Health Check | http://localhost:8000/health |

### Deploy com Kubernetes (Helm)

```bash
# Instalar via Helm Chart
helm install uday-app helm/uday-app -n uday-app --create-namespace

# Verificar os pods
kubectl get pods -n uday-app
```

### Deploy com ArgoCD (GitOps)

```bash
# Aplicar o Application CRD do ArgoCD
kubectl apply -f argocd/application.yaml
```

O ArgoCD irá sincronizar automaticamente o estado do cluster com o repositório Git.

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologia |
|--------|-----------|
| **Linguagem** | Python 3.11 |
| **Framework Backend** | FastAPI 0.104 |
| **Banco de Dados** | PostgreSQL 15 |
| **ORM** | SQLAlchemy 2.0 |
| **Migrações** | Alembic |
| **Testes** | Pytest |
| **Frontend** | HTML, CSS, JavaScript |
| **Web Server** | Nginx Alpine |
| **Containerização** | Docker, Docker Compose |
| **Orquestração** | Kubernetes |
| **Package Manager** | Helm |
| **Service Mesh** | Istio 1.28 |
| **Observabilidade** | Grafana, Kiali, Jaeger, Prometheus |
| **GitOps** | ArgoCD |
| **CI/CD** | GitHub Actions |
| **Load Balancer** | MetalLB |

---

## 📚 Links Úteis

- 🎓 [Formação DevOps Engineering para Aplicações](https://uday.com.br/cursos/formacao-devops-engineering-para-aplicacoes/)
- 📖 [Documentação FastAPI](https://fastapi.tiangolo.com/)
- 🐳 [Documentação Docker](https://docs.docker.com/)
- ☸️ [Documentação Kubernetes](https://kubernetes.io/docs/)
- ⎈ [Documentação Helm](https://helm.sh/docs/)
- 🔷 [Documentação Istio](https://istio.io/latest/docs/)
- 🔄 [Documentação ArgoCD](https://argo-cd.readthedocs.io/)

---

## 📝 Licença

Este projeto é parte do material didático da [Formação DevOps Engineering para Aplicações](https://uday.com.br/cursos/formacao-devops-engineering-para-aplicacoes/) da **Uday**.
