import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import {MatCardModule} from '@angular/material/card';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { TopbarComponent } from './topbar/topbar.component';
import { HomeComponent } from './components/home/home.component';
import {MatBadgeModule} from '@angular/material/badge';
import { CartComponent } from './components/cart/cart.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';


import { OccasionSidenavComponent } from './components/occasion-sidenav/occasion-sidenav.component';
import { FullProductListComponent } from './components/full-product-list/full-product-list.component';
import { CheckoutComponent } from './components/checkout/checkout.component';



@NgModule({
  declarations: [
    AppComponent,
    CarouselComponent,
    ProductListComponent,
    ProductDetailComponent,
    TopbarComponent,
    HomeComponent,
    CartComponent,
    OccasionSidenavComponent,
    FullProductListComponent,
    CheckoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatExpansionModule,
    MatBadgeModule,
    MatPaginatorModule,
    MatStepperModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
