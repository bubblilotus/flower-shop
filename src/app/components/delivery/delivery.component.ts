import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DoordashService } from 'src/app/services/doordash.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements AfterViewInit{
  constructor(private doordashService: DoordashService) { }
  ngAfterViewInit(): void {
    this.doordashService.generateKey();
  }
 
}
