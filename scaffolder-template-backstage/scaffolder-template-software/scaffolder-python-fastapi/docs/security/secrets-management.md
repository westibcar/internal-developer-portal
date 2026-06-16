# Gestão de Segredos

## Segredos no repositório

O template inclui segredos orientados por ambiente, como `SECRET_KEY` e `DATABASE_URL`, e o arquivo de values do Helm contém exemplos de valores codificados para segredos.

## Boas práticas

- Substituir os segredos de exemplo antes de usar o template em produção
- Usar cofre externo de segredos ou fluxos de sealed secrets quando possível
- Evitar hardcode de valores sensíveis no código do frontend
- Manter valores específicos de ambiente fora dos padrões controlados por source control
