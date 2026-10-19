import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Menu } from './pages/menu/menu';
import { Reserve } from './pages/reserve/reserve';
import { Cart } from './pages/cart/cart';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'restaurant/:id', component: Menu },
  { path: 'reserve', component: Reserve },
  { path: 'cart', component: Cart },
  { path: '**', redirectTo: '' },
];
