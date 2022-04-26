import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemAddComponent } from './item-add/item-add.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { RentalsListComponent } from './rentals-list/rentals-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'inventory', component: ItemListComponent },
  { path: 'inventory/:id', component: ItemDetailComponent },
  { path: 'addItem', component: ItemAddComponent },
  { path: 'rentals', component: RentalsListComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
