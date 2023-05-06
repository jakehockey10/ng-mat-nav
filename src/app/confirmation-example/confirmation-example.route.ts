import { AppRoute } from '../app.routes';

export const ConfirmationExampleRoute: AppRoute = {
  path: 'confirmation',
  loadComponent: () =>
    import('./confirmation-example.component').then(
      (m) => m.ConfirmationExampleComponent
    ),
  title: 'Confirmation Example',
  data: {
    nav: {
      label: 'Confirmation',
      icon: 'flaky',
      description:
        'ConfirmationModule providing a service to prompt the user as well as a customizable dialog component',
    },
  },
};
