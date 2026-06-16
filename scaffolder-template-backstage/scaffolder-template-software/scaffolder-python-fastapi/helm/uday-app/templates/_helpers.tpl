{{- define "uday-app.namespace" -}}
{{- default .Release.Namespace .Values.namespace -}}
{{- end -}}

{{- define "uday-app.frontendBackendHost" -}}
{{- if .Values.frontend.backendHost -}}
{{ .Values.frontend.backendHost }}
{{- else -}}
{{- printf "%s.%s.svc.cluster.local" .Values.backend.service.name (include "uday-app.namespace" .) -}}
{{- end -}}
{{- end -}}
