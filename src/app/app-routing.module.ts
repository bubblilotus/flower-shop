import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { HomeComponent } from './components/home/home.component';
import { FullProductListComponent } from './components/full-product-list/full-product-list.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CartGuard } from './guards/cart-guard';
import { ProductListComponent } from './components/product-list/product-list.component';

const routes: Routes = [
  {path: 'products/:id', component: ProductDetailComponent},
  {path: 'products/search/:keyword', component: ProductListComponent},
  {path: 'occasions/:id', component: FullProductListComponent},
  {path: 'home', component: HomeComponent},
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [CartGuard]
  },
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
