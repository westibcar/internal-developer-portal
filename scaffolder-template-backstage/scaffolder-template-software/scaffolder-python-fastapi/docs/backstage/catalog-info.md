# catalog-info

## Tipo de entidade gerada

O repositório gerado deve ser registrado como um Backstage `Component`.

```yaml
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: <nome-da-aplicacao>
spec:
  type: service
  owner: <grupo-ou-usuario>
  lifecycle: experimental
  system: <nome-do-sistema>
```

## Modelo de relacionamento importante

- `Component` = serviço gerado
- `System` = domínio de negócio ou agrupamento de plataforma
- `owner` = time ou usuário responsável

## Comportamento atual do template

O `catalog-info.yaml` gerado em `template-backstage/content` usa o parâmetro `namespace` como `spec.system`. Se você precisar de um modelo de catálogo mais rigoroso, substitua isso por um parâmetro dedicado `system` e mantenha o namespace apenas para preocupações de deploy.
