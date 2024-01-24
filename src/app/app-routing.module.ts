import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { HomeComponent } from './components/home/home.component';
import { FullProductListComponent } from './components/full-product-list/full-product-list.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CartGuard } from './guards/cart-guard';
import { PoliciesComponent } from './components/policies/policies.component';
import { AboutComponent } from './components/about/about.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
import { CheckoutGuard } from './checkout.guard';

const routes: Routes = [
  {path: 'products/:id', component: ProductDetailComponent},
  {path: 'products/search/:keyword', component: FullProductListComponent},
  {path: 'categories/:id', component: FullProductListComponent},
  {path: 'home', component: HomeComponent}, 
  {path: 'policies', component: PoliciesComponent},
  {path: 'about', component: AboutComponent},
  {path: 'confirmation/:trackingNumber', component: OrderConfirmationComponent, canActivate: [CheckoutGuard] },
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
