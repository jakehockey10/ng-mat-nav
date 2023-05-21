import { AppRoute } from '../../app.routes';

export const LoginPageRoute: AppRoute = {
  path: 'login',
  title: 'Login',
  loadComponent: () =>
    import('./login-page.component').then((m) => m.LoginPageComponent),
};
