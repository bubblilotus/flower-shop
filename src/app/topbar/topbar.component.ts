import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CartServiceService } from '../services/cart-service.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit{
  opened = false;
  searchOpened = false;
  searchMode = false;
  value = "";
  path = '/assets/images/icons';
  cartCount = 0;

  constructor(
    private domSanitizer: DomSanitizer,
    public matIconRegistry: MatIconRegistry, private cartService: CartServiceService) {
    this.matIconRegistry
      .addSvgIcon('search', this.setPath(`${this.path}/search.svg`))
      .addSvgIcon('person', this.setPath(`${this.path}/person.svg`))
      .addSvgIcon('bag', this.setPath(`${this.path}/bag.svg`))
      .addSvgIcon('menu', this.setPath(`${this.path}/menu.svg`));
  }
  ngOnInit(): void {
    this.cartService.totalQuantity.subscribe(
      (data) => {
        this.cartCount = data;
      }
    );
  }
  private setPath(url: string): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
