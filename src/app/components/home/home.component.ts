import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  
  opened = false;
  searchOpened = false;
  value = "";
  constructor(private productService: ProductService){}
  ngOnInit(): void {
    // this.productService.imageEmitter.next("/assets/images/slides/coupleKissing.jpg");
  }
}
