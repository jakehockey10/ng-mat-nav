import { AppRoute } from '../app.routes';

export const LazyExampleRoute: AppRoute = {
  path: 'lazy',
  loadComponent: () =>
    import('./lazy-example.component').then((m) => m.LazyExampleComponent),
  title: 'Lazy Example',
  data: {
    nav: {
      label: 'Lazy Example',
      icon: 'pending',
      description: 'Example of a lazily loaded component',
    },
  },
};
