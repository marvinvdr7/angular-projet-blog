import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  $changeTitleSidenav = new EventEmitter<string>();

  constructor() { }

  changeTitleSidenav (title: string): void {
    this.$changeTitleSidenav.emit(title);
  }
}
