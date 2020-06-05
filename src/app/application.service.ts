import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  deviceXs: boolean;

  constructor() { }

  public getDeviceSize(): boolean {
    return this.deviceXs;
  }
 
}
