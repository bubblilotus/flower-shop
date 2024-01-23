import { Location } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/common/category';
import { Occasion } from 'src/app/common/occasion';
import { ProductService } from 'src/app/services/product.service';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-occasion-sidenav',
  templateUrl: './occasion-sidenav.component.html',
  styleUrls: ['./occasion-sidenav.component.css']
})
export class OccasionSidenavComponent implements OnInit{
  panelOpened: boolean = false;
  categories: Category[] = [];
  constructor(private productService: ProductService, 
    private sidenavService: SidenavService,
     private router: Router){}
  ngOnInit(): void {
    this.getCategories();
  }
  getCategories() {
    this.productService.getCategories().subscribe(
      (data) => {
        this.categories = data;
      }
    );
  }
  getProducts(category: Category){
    this.sidenavService.close();
    this.router.navigateByUrl(`categories/${category.id}`);
  }
  go(id: string){
    this.router.navigateByUrl("/policies" + id);
    this.close();
  }
  close(){
    this.sidenavService.close();
  }

}
