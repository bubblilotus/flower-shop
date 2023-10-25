import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  open = new Subject<boolean>();
  constructor() { }
  close(){
    this.open.next(false);
  }
}
