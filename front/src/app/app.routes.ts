import { Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { stockRoutes } from './stock/stock.routes';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Gestion Stock : Accueil' },
  {
    path: 'legal',
    loadComponent: () => import('./routes/legal/legal.component'),
    title: 'Gestion Stock : Mentions Légales',
  },
  { path: 'stock', loadChildren: () => stockRoutes },
];
