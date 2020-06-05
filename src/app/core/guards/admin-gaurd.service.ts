import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGaurdService {

  constructor(
    private router: Router,
    private authService: AuthenticationService ) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (this.authService.isUserAdmin())
      return true;

    this.router.navigate(['login']);

    return false;

  }
}
