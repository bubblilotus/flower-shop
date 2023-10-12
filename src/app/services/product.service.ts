import { Injectable } from '@angular/core';
import { Product } from '../common/product';
import { HttpClient } from '@angular/common/http';
import { Occasion } from '../common/occasion';
import { Observable, Subject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'https://localhost:8443/api/products';

  private categoryUrl = 'https://localhost:8443/api/occasions';

  imageEmitter: Subject<any> = new Subject<any>;

  constructor(private httpClient: HttpClient) { }

  getProduct(productId: number): Observable<Product> {
    // need to build URL based on product id
    const productUrl = `${this.baseUrl}/${productId}`;

    return this.httpClient.get<Product>(productUrl);
  }

  getProductListPaginate(thePage: number,
    thePageSize: number): Observable<GetResponseProducts> {
    const url = `${this.baseUrl}?&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseProducts>(url);
  }

  getProductListByOccassionPaginate(occasionId: number, thePage: number,
    thePageSize: number): Observable<GetResponseProducts> {
    // need to build URL based on occasion id 
    const url = `${this.baseUrl}/search/findByOccasionId?id=${occasionId}&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(url);
  }
  searchProductsPaginate(keyword: string, thePage: number,
    thePageSize: number): Observable<GetResponseProducts> {
    // need to build URL based on keyword, page and size 
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${keyword}`
      + `&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getOccasions(): Observable<Occasion[]> {
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
