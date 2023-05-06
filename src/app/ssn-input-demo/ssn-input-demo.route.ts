import { AppRoute } from '../app.routes';

export const SsnInputDemoRoute: AppRoute = {
  path: 'ssn-input',
  loadComponent: () =>
    import('./ssn-input-demo.component').then((m) => m.SsnInputDemoComponent),
  title: 'SSN Input',
  data: {
    nav: {
      label: 'SSN Input',
      icon: 'account_balance',
      description:
        'Custom SSN input that works with MatFormField and ReactiveForms',
    },
  },
};
