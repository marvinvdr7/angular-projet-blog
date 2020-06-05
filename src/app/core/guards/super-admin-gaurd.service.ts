import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminGaurdService {

  constructor(
    private router: Router,
    private authService: AuthenticationService ) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (this.authService.isUserSuperAdmin())
      return true;

    this.router.navigate(['post-all']);

    return false;

  }
}
