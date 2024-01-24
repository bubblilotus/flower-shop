import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit{
  trackingNumber: any;
  constructor(public route: ActivatedRoute){}
  ngOnInit(): void {
    this.route.paramMap.subscribe(
      ()=>{
        this.trackingNumber = this.route.snapshot.paramMap.get('trackingNumber')!;
      }
    );
  }
  
}
