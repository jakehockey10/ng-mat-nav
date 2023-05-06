import { AppRoute } from '../app.routes';
import { ExampleTwoComponent } from './example-two.component';

export const ExampleTwoRoute: AppRoute = {
  path: '2',
  component: ExampleTwoComponent,
  title: 'Example 2',
  data: { nav: { label: 'Example 2', icon: 'looks_two' } },
};
