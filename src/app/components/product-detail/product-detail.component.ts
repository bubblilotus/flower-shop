import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartServiceService } from 'src/app/services/cart-service.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{
  product: Product = new Product();
  panelOpenState = false;
  constructor(private productService: ProductService, 
    private cartService: CartServiceService,
    private route: ActivatedRoute, private router: Router){}
  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
  }
  handleProductDetails() {
     // get the "id" param string. convert string to a number using the "+" symbol
     const productId: number = +this.route.snapshot.paramMap.get('id')!;

     this.productService.getProduct(productId).subscribe(
      data => {
        this.product = data;
        this.productService.imageEmitter.next(this.product.imageUrl);
        console.log(data);
      }
    )
  }
  addToCart(product: Product){
    console.log(`Adding to cart: ${product.name}, ${product.unitPrice}`);

    let theCartItem = new CartItem(product.id, product.name, product.imageUrl, product.unitPrice);

    this.cartService.addToCart(theCartItem);
  }
}
