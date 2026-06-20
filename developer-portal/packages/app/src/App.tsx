// CI deploy smoke test — build images for dev deploy v2
import { createApp } from '@backstage/frontend-defaults';
import catalogPlugin from '@backstage/plugin-catalog/alpha';
// kubernetesPlugin adiciona a aba "Kubernetes" na página de cada componente do catálogo,
// mostrando pods, deployments, services e outros recursos do cluster em tempo real.
import kubernetesPlugin from '@backstage/plugin-kubernetes/alpha';
import { navModule } from './modules/nav';

export default createApp({
  features: [catalogPlugin, kubernetesPlugin, navModule],
});
