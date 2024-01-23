import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartServiceService } from 'src/app/services/cart-service.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {
  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;
  productCountEmitter = new Subject<number>();

  // new properties for pagination
  pageNumber: number = 1;
  pageSize: number = 10;
  totalElements: number = 0;

  previousKeyword: string = "";

  @ViewChild('paginator') paginator!: MatPaginator;

  constructor(private productService: ProductService,
    private cartService: CartServiceService,
    private route: ActivatedRoute, private router: Router) { }
  ngAfterViewInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  ngOnInit() {
   
  }

  
  listProducts() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    }
    else {
      this.handleListProducts();
    }

  }

  handleSearchProducts() {
    const keyword: string = this.route.snapshot.paramMap.get('keyword')!;
    // if we have a different keyword than previous
    // then set pageNumber to 1
    if (this.previousKeyword != keyword) {
      this.pageNumber = 1;
    }
    this.previousKeyword = keyword;
    console.log(`keyword=${keyword}, pageNumber=${this.pageNumber}`);
    // now search for the products using keyword
    this.productService.searchProductsPaginate(keyword, this.pageNumber - 1,
      this.pageSize
    ).subscribe(this.processResult());

  }

  handleListProducts() {
    // check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      // get the "id" param string. convert string to a number using the "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
      if (this.previousCategoryId != this.currentCategoryId) {
        this.pageNumber = 1;
        this.paginator.firstPage();
      }
      this.previousCategoryId = this.currentCategoryId;

      this.productService.getProductListByCategoryPaginate(this.currentCategoryId, this.pageNumber - 1,
        this.pageSize)
        .subscribe(this.processResult());

    }
    else {
      this.productService.getProductListPaginate(this.pageNumber - 1,
        this.pageSize)
        .subscribe(this.processResult());
    }
    // else {
    //   // not category id available ... default to category id 1
    //   this.currentCategoryId = 1;
    // }
  }

  // updatePageSize(pageSize: string) {
  //   this.pageSize = +pageSize;
  //   this.pageNumber = 1;
  //   this.listProducts();
  // }

  processResult() {
    return (data: any) => {
      console.log(data);
      this.products = data._embedded.product;
      this.pageNumber = data.page.number + 1;
      this.pageSize = data.page.size;
      this.totalElements = data.page.totalElements;
      console.log(data);
    };
  }

  addToCart(theProduct: Product) {

    console.log(`Adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`);

    // TODO ... do the real work
    let theCartItem = new CartItem(theProduct.id, theProduct.name, theProduct.imageUrl, theProduct.unitPrice);

    this.cartService.addToCart(theCartItem);
  }
  openDetails(productIndex: any) {
    console.log(productIndex);
    this.router.navigateByUrl("/products/" + productIndex);
  }

  onChangePage(event: PageEvent) {
    this.pageNumber = event.pageIndex + 1;
    console.log(this.pageSize != event.pageSize);
    if (this.pageSize != event.pageSize) {
      this.pageSize = event.pageSize;
      this.pageNumber = 1;
    }
    console.log(this.pageSize);
    this.totalElements = event.length;

    this.listProducts();
  }
}
