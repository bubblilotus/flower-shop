import { Injectable } from '@angular/core';
import { Purchase } from '../common/purchase';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { PaymentInfo } from '../common/payment-info';

@Injectable({
  providedIn: 'root'
})
export default class CheckoutService {

  baseUrl: string = "https://localhost:8443/api";
  purchaseUrl: string = this.baseUrl + '/checkout/purchase';
  paymentIntentUrl: string = this.baseUrl + '/checkout/payment-intent';
  shippingRatesUrl: string = this.baseUrl + '/checkout/shipping-rates';
  purchaseEmitter: BehaviorSubject<Purchase> = new BehaviorSubject<Purchase>(new Purchase());

  constructor(private httpClient: HttpClient) { }
  changePurchase(purchase: Purchase){
    console.log("emitting " + JSON.stringify(purchase));
    this.purchaseEmitter.next(purchase);
  }
  placeOrder(purchase: Purchase): Observable<any> {
    console.log("placing order")
    return this.httpClient.post<Purchase>(this.purchaseUrl, purchase);    
  }
  createPaymentIntent(paymentInfo: PaymentInfo): Observable<any>{
    return this.httpClient.post(this.paymentIntentUrl, paymentInfo);
  }
  getShippingRates(purchase: Purchase): Observable<any>{
    return this.httpClient.post(this.shippingRatesUrl, purchase);
  }
}
