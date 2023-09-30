import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

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



@NgModule({
  declarations: [
    AppComponent,
    CarouselComponent,
    ProductListComponent,
    ProductDetailComponent,
    TopbarComponent,
    HomeComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatExpansionModule,
    MatBadgeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
