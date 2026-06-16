# Solução de Problemas

## O banco não sobe

- Verifique `DATABASE_URL`
- Verifique se o container do PostgreSQL está saudável
- Confira se o container de migração concluiu com sucesso

## O login falha

- Confirme o e-mail e a senha
- Confirme se as configurações de JWT são consistentes entre backend e manifests de deploy
- Verifique se o usuário existe no PostgreSQL

## O upload da foto falha

- Garanta que o arquivo enviado seja uma imagem
- Verifique a extensão e o tamanho do arquivo
- Confirme que o diretório de uploads é gravável

## O cadastro de empresa falha

- Garanta que o CNPJ contenha exatamente 14 dígitos
- Confirme se o bearer token está presente
