import { Routes } from '@angular/router';

export const stockRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/list.component'),
    title: "Gestion Stock : Liste d'articles",
  },
  {
    path: 'create',
    loadComponent: () => import('./create/create.component'),
    title: "Gestion Stock : Ajout d'un article",
  },
];
