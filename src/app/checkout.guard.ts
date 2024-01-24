import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { CheckoutComponent } from './components/checkout/checkout.component';

@Injectable({
  providedIn: 'root'
})
export class CheckoutGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (CheckoutComponent.hasCompletedCheckout) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}