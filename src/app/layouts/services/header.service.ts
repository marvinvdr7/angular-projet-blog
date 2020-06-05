import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  $isToggleClicked = new EventEmitter();

  constructor() { }

  toggleClick (): void {
    this.$isToggleClicked.emit()
  }
}
