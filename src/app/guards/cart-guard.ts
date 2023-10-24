import { Router } from "@angular/router";
import { CartServiceService } from "../services/cart-service.service";
import { Injectable } from "@angular/core";
@Injectable({
    providedIn: 'root'
})
export class CartGuard {
    constructor(private cartService: CartServiceService, private router: Router) { }

    canActivate(): boolean {
        if (this.cartService.isEmpty()) {
            this.router.navigate(['/']);
            return false;
        }
        return true;
    }

}
