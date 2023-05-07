import { AppRoute } from '../app.routes';
import { DashboardComponent } from './dashboard.component';

export const DashboardRoute: AppRoute = {
  path: 'dashboard',
  component: DashboardComponent,
  title: 'Dashboard',
  data: {
    nav: {
      icon: 'dashboard',
      label: 'Dashboard',
      description: 'DashboardComponent from @angular/material schematics',
    },
  },
};
