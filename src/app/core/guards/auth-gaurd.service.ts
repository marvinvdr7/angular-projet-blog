import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService {

  constructor(
    private router: Router,
    private authService: AuthenticationService ) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (this.authService.isUserLoggedIn())
      return true;

    this.router.navigate(['post-all']);

    return false;

  }
}