import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CartServiceService } from '../services/cart-service.service';
import { Observable, Subject } from 'rxjs';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SidenavService } from '../services/sidenav.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit, AfterViewInit{
  isSticky: boolean = false;
  opened = false;
  cartOpen = false;
  searchOpened = false;
  searchMode = false;
  value = '';
  keyword!: string;
  path = '/assets/images/icons';
  cartCount = 0;
  menuPosition: number = 0;
  @ViewChild('stickyMenu')
  menuElement!: ElementRef;

image: any = "/assets/images/slides/bouquet.jpg";
  sticky: boolean = false;
  elementPosition: any;
  showSearchBar!: boolean;
 
  constructor(
    private domSanitizer: DomSanitizer,
    public matIconRegistry: MatIconRegistry, private cartService: CartServiceService,
    private sidenavService: SidenavService,
    private productService: ProductService, 
    private route: ActivatedRoute,
    private router: Router) {
    this.matIconRegistry
      .addSvgIcon('search', this.setPath(`${this.path}/search.svg`))
      .addSvgIcon('person', this.setPath(`${this.path}/person.svg`))
      .addSvgIcon('bag', this.setPath(`${this.path}/bag.svg`))
      .addSvgIcon('menu', this.setPath(`${this.path}/menu.svg`));
  }
  toggleSearchBar() {
    this.showSearchBar = !this.showSearchBar;
  }
  ngOnInit(): void {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    this.showSearchBar = this.searchMode;
    this.route.paramMap.subscribe(params => {
      this.value = params.get('keyword') as string;
    });
    this.cartService.totalQuantity.subscribe(
      (data) => {
        this.cartCount = data;
      }
    );
    this.productService.imageEmitter.subscribe(
      (data) => {
        this.image = data;
        console.log(this.image);
      }
    );
    this.sidenavService.open.subscribe(
      (data) => {
        this.opened = data;
      }
    );
    this.cartService.open.subscribe(
        (data) => {
          this.cartOpen = data;
        }
    );
    
  }
  search(value: any){
    let searchUrl = "/products/search/"
    this.router.navigateByUrl(searchUrl + value);
  }
  ngAfterViewInit(){
    // this.elementPosition = this.menuElement.nativeElement;

  }
  private setPath(url: string): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }
  @HostListener('window:scroll', ['$event'])
    handleScroll(){
        const windowScroll = window.pageYOffset;
        if(windowScroll >= this.menuPosition + 25){
            this.isSticky = true;
        } else {
            this.isSticky = false;
        }
    }
}
