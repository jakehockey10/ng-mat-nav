import { Routes } from '@angular/router';

export type NavRoute = {
  path: string;
  label: string;
  icon?: string;
  description?: string;
  children?: NavRoute[];
};

export type NavRoutes = NavRoute[];

export function toNavRoutes(routes: Routes) {
  return routes.map((route) => {
    const navRoute: NavRoute = {
      path: route.path ?? '/',
      label: route.data?.['nav']['label'],
    };
    if (route.data?.['nav']['icon']) {
      navRoute.icon = route.data?.['nav']['icon'];
    }
    if (route.data?.['nav']['description']) {
      navRoute.description = route.data?.['nav']['description'];
    }
    if (route.children) {
      const navChildren = route.children.map((child) => {
        const childNavRoute: NavRoute = {
          path: child.path ?? '/',
          label: child.data?.['nav']['label'],
        };

        if (child.data?.['nav']['icon']) {
          childNavRoute.icon = child.data?.['nav']['icon'];
        }
        if (route.data?.['nav']['description']) {
          childNavRoute.description = child.data?.['nav']['description'];
        }
        return childNavRoute;
      });
      navRoute.children = navChildren;
    }
    return navRoute;
  });
}
