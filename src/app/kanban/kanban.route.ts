import { AppRoute } from '../app.routes';

export const KanbanRoute: AppRoute = {
  path: 'kanban',
  loadComponent: () =>
    import('./kanban.component').then((m) => m.KanbanComponent),
  title: 'Kanban',
  data: {
    nav: {
      label: 'Kanban',
      icon: 'view_kanban',
      description: 'Kanban Example',
    },
  },
};
