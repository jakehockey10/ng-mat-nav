import { AppRoute } from '../app.routes';

export const TelInputDemoRoute: AppRoute = {
  path: 'Telephone Input',
  loadComponent: () =>
    import('./tel-input-demo.component').then((m) => m.TelInputDemoComponent),
  title: 'Telephone Input',
  data: {
    nav: {
      label: 'Telephone Input',
      icon: 'phone',
      description:
        'Custom phone number input that works with MatFormField and ReactiveForms',
    },
  },
};
