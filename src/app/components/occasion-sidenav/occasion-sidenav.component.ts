import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Occasion } from 'src/app/common/occasion';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-occasion-sidenav',
  templateUrl: './occasion-sidenav.component.html',
  styleUrls: ['./occasion-sidenav.component.css']
})
export class OccasionSidenavComponent implements OnInit{
  occasions: Occasion[] = [];
  constructor(private productService: ProductService, private router: Router){}
  ngOnInit(): void {
    this.getOccasions();
  }
  getOccasions() {
    this.productService.getOccasions().subscribe(
      (data) => {
        this.occasions = data;
      }
    );
  }
  getProducts(occasion: Occasion){
    this.router.navigateByUrl(`occasions/${occasion.id}`);
  }

}
