import { Injectable } from '@angular/core';
import { Product } from '../common/product';
import { HttpClient } from '@angular/common/http';
import { Occasion } from '../common/occasion';
import { Observable, Subject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';

  private categoryUrl = 'http://localhost:8080/api/occasions';

  imageEmitter: Subject<any> = new Subject<any>;

  products: Product[] = [
    new Product("1", "ice blue large bouquet",
      "Flower of the month that you must see throughout the four seasons, September",
      "Blue hydrangeas, blue roses, seasonal materials and flowers", "sincerity", 59.00,
      "/assets/images/slides/bouquet.jpg", true, 10),
    new Product("2", "ice blue large bouquet",
      "Flower of the month that you must see throughout the four seasons, September",
      "Blue hydrangeas, blue roses, seasonal materials and flowers", "sincerity", 59.13,
      "/assets/images/slides/bouquet.jpg", true, 10),
    new Product("3", "ice blue large bouquet",
      "Flower of the month that you must see throughout the four seasons, September",
      "Blue hydrangeas, blue roses, seasonal materials and flowers", "sincerity", 59.43,
      "/assets/images/slides/bouquet.jpg", true, 10),
    new Product("4", "ice blue large bouquet",
      "Flower of the month that you must see throughout the four seasons, September",
      "Blue hydrangeas, blue roses, seasonal materials and flowers", "sincerity", 59.73,
      "/assets/images/slides/bouquet.jpg", true, 10),
  ];
  constructor(private httpClient: HttpClient) { }

  getProduct(productId: number): Observable<Product> {

    // need to build URL based on product id
    const productUrl = `${this.baseUrl}/${productId}`;

    return this.httpClient.get<Product>(productUrl);
  }

  getProductListPaginate(thePage: number,
    thePageSize: number): Observable<GetResponseProducts> {

    // need to build URL based on category id, page and size 
    const url = `${this.baseUrl}?&page=${thePage}&size=${thePageSize}`;
    
    return this.httpClient.get<GetResponseProducts>(url);
  }

  getProductList(occasionId: number): Observable<Product[]> {

    // need to build URL based on category id 
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${occasionId}`;

    return this.getProducts(searchUrl);
  }

  searchProducts(theKeyword: string): Observable<Product[]> {

    // need to build URL based on the keyword 
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

    return this.getProducts(searchUrl);
  }
  searchProductsPaginate(thePage: number, 
    thePageSize: number, 
    theKeyword: string): Observable<GetResponseProducts> {

// need to build URL based on keyword, page and size 
const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
+ `&page=${thePage}&size=${thePageSize}`;

return this.httpClient.get<GetResponseProducts>(searchUrl);
}

private getProducts(searchUrl: string): Observable<Product[]> {
  return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
    map(response => response._embedded.products)
    );
}

getProductCategories(): Observable<Occasion[]> {

  return this.httpClient.get<GetResponseOccasion>(this.categoryUrl).pipe(
    map(response => response._embedded.occasion)
  );
}

}

interface GetResponseProducts {
_embedded: {
  products: Product[];
},
page: {
  size: number,
  totalElements: number,
  totalPages: number,
  number: number
}
}

interface GetResponseOccasion {
_embedded: {
  occasion: Occasion[];
}
}
