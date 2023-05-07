import { AppRoute } from '../app.routes';

export const DataGridDemoRoute: AppRoute = {
  path: 'data-grid-demo',
  loadComponent: () =>
    import('./data-grid-demo.component').then((m) => m.DataGridDemoComponent),
  data: {
    nav: {
      icon: 'table_view',
      label: 'Data Grid Demo',
      description: 'Demonstrates the Data Grid component.',
    },
  },
};
