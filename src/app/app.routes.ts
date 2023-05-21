import { Data, Route, Routes } from '@angular/router';
import { DashboardRoute } from './dashboard/dashboard.route';
import { ExampleOneRoute } from './example-one/example-one.route';
import { ExampleTwoRoute } from './example-two/example-two.route';
import { LazyExampleRoute } from './lazy-example/lazy-example.route';
import { ConfirmationExampleRoute } from './confirmation-example/confirmation-example.route';
import { TelInputDemoRoute } from './tel-input-demo/tel-input-demo.route';
import { SsnInputDemoRoute } from './ssn-input-demo/ssn-input-demo.route';
import { PasswordDemoRoute } from './password-demo/password-demo.route';
import { KanbanRoute } from './kanban/kanban.route';
import { LoginPageRoute } from './user/login-page/login-page.route';

export interface AppRouteData extends Data {
  nav?: NavConfig;
}

export interface NavConfig {
  icon: string;
  label: string;
  description?: string;
}

export interface AppRoute extends Route {
  data?: AppRouteData;
  children?: AppRoutes;
}

export type AppRoutes = AppRoute[];

export const routes: AppRoutes = [
  LoginPageRoute,
  DashboardRoute,
  {
    path: 'examples',
    data: {
      nav: {
        label: 'Examples',
        icon: 'science',
        description: 'Showcasing expandable sub-menu and various demos inside',
      },
    },
    children: [ExampleOneRoute, ExampleTwoRoute, LazyExampleRoute],
  },
  {
    path: 'components',
    data: {
      nav: {
        icon: 'smart_button',
        label: 'Components',
        description: 'Custom components expanding Angular Material',
      },
    },
    children: [
      ConfirmationExampleRoute,
      TelInputDemoRoute,
      SsnInputDemoRoute,
      PasswordDemoRoute,
      KanbanRoute,
    ],
  },
];
