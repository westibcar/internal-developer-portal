# Logging

## Abordagem atual

A aplicação atualmente depende dos logs padrão dos containers e de prints explícitos de startup.

## Fontes de logs

- Logs de startup e runtime do backend FastAPI
- Logs de acesso e erro do Nginx
- Logs do PostgreSQL vindos do container do banco
- Logs dos workflows do GitHub Actions

## Orientação operacional

- Centralize os logs na plataforma de sua escolha ao promover para produção
- Correlacione os logs com o commit SHA usado para construir a imagem
