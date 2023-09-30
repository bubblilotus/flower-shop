import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartServiceService } from 'src/app/services/cart-service.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{
  products: Product[] = [];
  constructor(private router: Router, private cartService: CartServiceService, private productService: ProductService){}
  ngOnInit(): void{
    this.products = this.productService.getProducts();
  }
  openDetails(productIndex: any){
    this.router.navigateByUrl("/products/" + productIndex);
  }
}
