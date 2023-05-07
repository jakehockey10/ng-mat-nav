import { AppRoute } from '../app.routes';
import { ExampleOneComponent } from './example-one.component';

export const ExampleOneRoute: AppRoute = {
  path: '1',
  component: ExampleOneComponent,
  title: 'Example 1',
  data: { nav: { label: 'Example 1', icon: 'looks_one' } },
};
