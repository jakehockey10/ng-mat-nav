import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExampleOneComponent } from './example-one/example-one.component';
import { ExampleTwoComponent } from './example-two/example-two.component';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'Dashboard',
    data: { nav: { icon: 'dashboard', label: 'Dashboard' } },
  },
  {
    path: 'examples',
    data: { nav: { label: 'Examples', icon: 'science' } },
    children: [
      {
        path: '1',
        component: ExampleOneComponent,
        title: 'Example 1',
        data: { nav: { label: 'Example 1', icon: 'looks_one' } },
      },
      {
        path: '2',
        component: ExampleTwoComponent,
        title: 'Example 2',
        data: { nav: { label: 'Example 2', icon: 'looks_two' } },
      },
      {
        path: 'lazy',
        loadComponent: () =>
          import('./lazy-example/lazy-example.component').then(
            (m) => m.LazyExampleComponent
          ),
        title: 'Lazy Example',
        data: { nav: { label: 'Lazy Example', icon: 'pending' } },
      },
    ],
  },
];
