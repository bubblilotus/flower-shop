import { AfterViewInit, Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Address } from 'src/app/common/address';
import { CartItem } from 'src/app/common/cart-item';
import { Country } from 'src/app/common/country';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { PaymentInfo } from 'src/app/common/payment-info';
import { Purchase } from 'src/app/common/purchase';
import { Recipient } from 'src/app/common/recipient';
import { State } from 'src/app/common/state';
import { CartServiceService } from 'src/app/services/cart-service.service';
import CheckoutService from 'src/app/services/checkout.service';
import { FormServiceService } from 'src/app/services/form-service.service';
import { FormValidator } from 'src/app/validators/form-validator';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements AfterViewInit {
  paymentValid: boolean = false;
  customerValid: boolean = false;
  addressValid: boolean = false;
  checkoutFormGroup!: FormGroup;
  extraFees: any;
  total: any;

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  countries: Country[] = [];

  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  isDisabled: boolean = false;

  // initialize Stripe API
  key = "pk_test_51NxxzzHdW59TasEwwEhAhmQZCiszt2so45MNy6pMleAqpG3PLok24BRWqKx8S2gpxP2rqjNaFhhdT8crBRgvkdPm00x8MjiEJ9";
  stripe = Stripe(this.key);

  paymentInfo: PaymentInfo = new PaymentInfo();
  cardElement: any;
  shippingAddressElement: any;
  billingAddressElement: any;
  displayError: any = "";
  client_secret: string = "";
  elements: any;

  static hasCompletedCheckout: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private formService: FormServiceService,
    private cartService: CartServiceService,
    private checkoutService: CheckoutService,
    private router: Router) {
  }
  ngAfterViewInit(): void {
    // setup Stripe payment form
    this.setupStripePaymentForm();
  }
  customerValidCheck() {
    this.checkoutFormGroup.get('formArray')?.get([0])?.statusChanges.subscribe(
      (status) => {
        console.log("customer form status: " + status);
        this.customerValid = status === 'VALID' ? true : false;
      }
    );
  }

  ngOnInit(): void {

    this.reviewCartDetails();

    this.checkoutFormGroup = this.formBuilder.group({
      formArray: this.formBuilder.array([
        this.formBuilder.group({
          firstName: new FormControl('',
            [Validators.required,
            Validators.minLength(2),
            FormValidator.notOnlyWhitespace]),

          lastName: new FormControl('',
            [Validators.required,
            Validators.minLength(2),
            FormValidator.notOnlyWhitespace]),

          email: new FormControl('',
            [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
        }),
        this.formBuilder.group({}),
        this.formBuilder.group({})
      ])
    });
    //get cart items to show in order summary
    this.cartItems = this.cartService.cartItems;
    // populate countries

    this.formService.getCountries().subscribe(
      data => {
        console.log("Retrieved countries: " + JSON.stringify(data));
        this.countries = data;
      }
    );

    this.customerValidCheck();
  }
  mountBilling() {
    this.shippingAddressElement.unmount();
    this.shippingAddressElement.mount('#billing-address');
  }
  setupStripePaymentForm() {
    var shippingOptions = { mode: 'shipping' };
    var billingOptions = { mode: 'billing' };
    // get a handle to stripe elements
    this.paymentInfo.amount = Math.round(this.totalPrice * 100);
    this.paymentInfo.currency = "USD";
    this.checkoutService.createPaymentIntent(this.paymentInfo).subscribe(
      (paymentIntentResponse) => {
        //sent to stripe

        this.client_secret = paymentIntentResponse.client_secret;
        console.log(this.client_secret);
        this.elements = this.stripe.elements({ clientSecret: this.client_secret });

        console.log(this.elements);
        // Create a payment element ... and hide the zip-code field
        this.cardElement = this.elements.create('payment');

        // Create shipping address element
        this.shippingAddressElement = this.elements.create('address', shippingOptions);
        //  // Create billing address element
        //  this.billingAddressElement = elements.create('address', billingOptions);

        // Add an instance of payment card UI component into the 'card-element' div
        this.cardElement.mount('#card-element');

        // Add an instance of shipping address UI component into the 'shipping-address' div
        this.shippingAddressElement.mount('#shipping-address');

        // Add event binding for the 'change' event on the card element
        this.cardElement.on('change', (event: any) => {

          // get a handle to card-errors element
          this.displayError = document.getElementById('card-errors');

          if (event.complete) {
            this.displayError.textContent = "";
            this.paymentValid = true;
          } else if (event.error) {
            // show validation error to customer
            this.displayError.textContent = event.error.message;
            this.paymentValid = false;
          } else {
            this.paymentValid = false;
          }
        });
        this.shippingAddressElement.on('change', (event: any) => {
          console.log(event);
          console.log(event.complete);
          if (event.complete) {
            this.addressValid = true;
            this.addressWithinLimits();
          } else {
            this.addressValid = false;
          }
          // get a handle to card-errors element
          //this.displayError = document.getElementById('card-errors');

          // if (event.complete) {
          //   this.displayError.textContent = "";
          // } else if (event.error) {
          //   // show validation error to customer
          //   this.displayError.textContent = event.error.message;
          // }
        });

      });





  }

  reviewCartDetails() {

    // subscribe to cartService.totalQuantity
    this.cartService.totalQuantity.subscribe(
      (data) => {
        this.totalQuantity = data;
        // if(this.totalQuantity < 1){
        //   this.router.navigateByUrl("/home");
        // }
      }
    );

    // subscribe to cartService.totalPrice
    this.cartService.totalPrice.subscribe(
      (data) => {
        this.totalPrice = data;
        this.extraFees = this.totalPrice * 0.10;
        this.total = this.totalPrice + this.extraFees;
        console.log(this.totalPrice);
        console.log(this.extraFees);
        console.log(this.total);
        // if(this.totalPrice < 1){
        //   this.router.navigateByUrl("/home");
        // }
      }
    );

  }
  get customer() { return this.checkoutFormGroup.get('formArray')?.get([0]); }
  get firstName() { return this.checkoutFormGroup.get('formArray')?.get([0])?.get('firstName'); }
  get lastName() { return this.checkoutFormGroup.get('formArray')?.get([0])?.get('lastName'); }
  get email() { return this.checkoutFormGroup.get('formArray')?.get([0])?.get('email'); }
  get formArray(): AbstractControl | null {
    return this.checkoutFormGroup.get('formArray');
  }

  showAddress() {
    this.shippingAddressElement.getValue().then(
      (data: any) => {
        console.log(data.value);
      }
    );
    //this.addressInNC();
  }
  addressWithinLimits() {
    this.shippingAddressElement.getValue().then(
      (data: any) => {
        let address = data.value.address;
        if (!this.addressInUs(address)) {
          this.addressValid = false;
          console.log("OUT OF COUNTRY");
          alert("Out of country. We only deliver to addresses in the US.");
        } else {
          if (!this.addressInNC(address)) {
            this.addressValid = false;
            console.log("OUT OF STATE");
            alert("Out of state. We only deliver to addresses in the state of North Carolina.");
          }
        }
      }
    );
  }
  addressInUs(address: any): boolean {
    return address.country == 'US' ? true : false;
  }
  addressInNC(address: any): boolean {
    return address.state == 'NC' ? true : false;
    if (address.state != 'NC') {

    }
  }
  // copyShippingAddressToBillingAddress(checked: boolean) {
  //   if (checked) {
  //     console.log(this.checkoutFormGroup.get('formArray')?.get([2]));
  //     this.billingAddressCountry?.setValue(this.shippingAddressCountry?.value);
  //     this.billingAddressStreet?.setValue(this.shippingAddressStreet?.value);
  //     this.billingAddressCity?.setValue(this.shippingAddressCity?.value);
  //     this.billingAddressState?.setValue(this.shippingAddressState?.value);
  //     this.billingAddressZipcode?.setValue(this.shippingAddressZipcode?.value);
  //     this.billingAddressStates = this.shippingAddressStates;
  //   }
  //   else {
  //     this.checkoutFormGroup.get('formArray')?.get([2])?.reset();
  //     this.billingAddressStates = [];
  //   }
  // }
  initializePurchase(): Purchase {
    // set up order
    let order = new Order(this.totalQuantity, this.total);

    // get cart items
    const cartItems = this.cartService.cartItems;
    // order items
    let orderItems: OrderItem[] = cartItems.map(tempCartItem => new OrderItem(tempCartItem.imageUrl!, tempCartItem.unitPrice!, tempCartItem.quantity, tempCartItem.id!));
    // set up purchase
    let purchase = new Purchase();

    // initiate purchase - customer
    purchase.customer = this.customer?.value;
    // initiate purchase - recipient
    purchase.recipient = new Recipient("");
    // populate purchase - order and orderItems
    purchase.order = order;
    purchase.orderItems = orderItems;
    // populate purchase - billing address
    purchase.billingAddress = new Address("", "", "", "", "");
    // populate purchase - shipping address
    purchase.shippingAddress = new Address();
    return purchase;
  }
  onSubmit() {
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }
    let purchase = this.initializePurchase();
    this.shippingAddressElement.getValue().then(
      (data: any) => {
        this.populatePurchaseWithAddressInput(purchase, data);
        console.log(purchase);
        this.sendOrder(purchase);
      }
    );

  }
  populatePurchaseWithAddressInput(purchase: Purchase, data: any) {
    let address = data.value.address;
    let recipientName = data.value.name;
    purchase.recipient.fullName = recipientName;
    purchase.shippingAddress.country = address.country;
    purchase.shippingAddress.state = address.state;
    purchase.shippingAddress.city = address.city;
    purchase.shippingAddress.zipCode = address.postal_code;
    purchase.shippingAddress.street = address.line2 == null ?
      address.line1 : address.line1 + ", " + address.line2;
  }
  sendOrder(purchase: Purchase) {
    this.checkoutService.purchaseEmitter.next(purchase);
    console.log(!this.checkoutFormGroup.invalid && this.displayError.textContent === "");
    if (!this.checkoutFormGroup.invalid && this.displayError.textContent === "") {
      //disable button before api call
      this.isDisabled = true;
      //sent to stripe
      this.stripe.confirmPayment({
        elements: this.elements
        ,
        redirect: 'if_required',
        confirmParams: {
          payment_method_data: {
            billing_details: {
              name: `${purchase.customer.firstName} ${purchase.customer.lastName}`,
              email: purchase.customer.email
            }

          },

          // Return URL where the customer should be redirected after the PaymentIntent is confirmed.
          return_url: 'https://localhost:4200/home',
        }

      })
        .then((result: any) => {
          if (result.error) {
            // display error
            alert(`There was an error: ${result.error.message}`);
            //set disabled to false to resubmit
            this.isDisabled = false;
          }
          else {
            //call rest api to place order
            this.checkoutService.placeOrder(purchase).subscribe({
              next: (response: any) => {
                // this.checkoutService.getShippingRates(purchase).subscribe(
                //   (data) => {
                //     console.log(data);
                //   }
                // );
                // alert(`Your order has been received. 
                //     \nOrder tracking number: ${response.orderTrackingNumber}`);
                //reset cart
                this.resetCart();
                CheckoutComponent.hasCompletedCheckout = true;
                this.router.navigateByUrl(`confirmation/${response.orderTrackingNumber}`);
                //enable button once api call completes
                this.isDisabled = false;

              },
              error: (err: any) => {
                alert(`There was an error: ${err.message}`);
                //enable button once api call completes
                this.isDisabled = false;
              }
            });
          }
        })


    }
    else {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }
  }

  resetCart() {
    // reset cart data
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);
    this.cartService.updateStorage();

    // reset the form
    this.checkoutFormGroup.reset();

    // navigate back to the products page
    this.router.navigateByUrl("/products");
  }

  getStates(formGroupNumber: any) {
    console.log("getting states");
    const formGroup = this.checkoutFormGroup.get('formArray')?.get([formGroupNumber]);
    console.log(formGroup);
    const countryCode = formGroup?.value.country.code;
    const countryName = formGroup?.value.country.name;
    console.log(`${formGroupNumber} country code: ${countryCode}`);
    console.log(`${formGroupNumber} country name: ${countryName}`);

    this.formService.getStates(countryCode).subscribe(
      (data) => {
        if (formGroupNumber === 1) {
          this.shippingAddressStates = data;
        }
        else {
          this.billingAddressStates = data;
        }

        // select first item by default
        formGroup?.get('state')?.setValue(data[0]);
      }
    );
  }
}

