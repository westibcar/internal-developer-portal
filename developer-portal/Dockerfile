FROM node:24-bookworm

# Dependencias necessarias para node-gyp e bibliotecas nativas usadas pelo Backstage
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    make \
    g++ \
    build-essential \
    pkg-config \
    libsqlite3-dev \
  socat \
    git \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Habilita Corepack para usar Yarn definido pelo projeto
RUN corepack enable
