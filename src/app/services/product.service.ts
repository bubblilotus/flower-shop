import { Injectable } from '@angular/core';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
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
  constructor() { }
  getProducts(): Product[]{
    return this.products;
  }
  getProduct(productId: any){
    return this.products.find(product => product.id == productId);
  }
}
