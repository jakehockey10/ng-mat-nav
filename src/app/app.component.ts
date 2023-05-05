import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { routes } from './app.routes';
import { TitleStrategy } from '@angular/router';
import { NavRoute, toNavRoutes } from './navigation/nav-route';

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
