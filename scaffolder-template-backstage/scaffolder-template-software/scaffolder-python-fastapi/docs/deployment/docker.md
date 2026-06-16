# Docker

## Imagem do backend

`Dockerfile.backend` monta o serviço FastAPI a partir do Python 3.11 slim, instala as dependências de `uday-app/requirements.txt`, cria o diretório de uploads e executa o entrypoint compartilhado.

## Imagem do frontend

`Dockerfile.frontend` empacota o frontend estático no Nginx, copia o template de configuração do Nginx e usa o mesmo script de entrypoint para renderizar o host correto do backend.

## Comportamento do entrypoint

O `entrypoint.sh` compartilhado decide se o container está iniciando o frontend ou o backend com base na presença de `app/main.py` e então lança o processo correto.

## Comportamento do compose local

O arquivo compose sobe PostgreSQL, um job de migração, o backend e o frontend como serviços separados.
