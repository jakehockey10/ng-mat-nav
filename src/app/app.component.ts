import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent, toNavRoutes } from 'components';
import { routes } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NavigationComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ng-mat-nav';

  routes = toNavRoutes(routes);
}
