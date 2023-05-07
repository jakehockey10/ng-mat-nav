import { AppRoute } from '../app.routes';

export const PasswordDemoRoute: AppRoute = {
  path: 'password-input',
  loadComponent: () =>
    import('./password-demo.component').then((m) => m.PasswordDemoComponent),
  title: 'Password Input',
  data: {
    nav: {
      label: 'Password Input',
      icon: 'key',
      description:
        'Custom password input that works with MatFormField and ReactiveForms',
    },
  },
};
