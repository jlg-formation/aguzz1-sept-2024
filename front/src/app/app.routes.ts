import { Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { LegalComponent } from './routes/legal/legal.component';
import { StockModule } from './stock/stock.module';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Gestion Stock : Accueil' },
  {
    path: 'legal',
    component: LegalComponent,
    title: 'Gestion Stock : Mentions Légales',
  },
  { path: 'stock', loadChildren: () => StockModule },
];
