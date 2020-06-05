import { Injectable } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleReadGaurdService {

  constructor(
    private router: Router,
    private authService: AuthenticationService ) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (this.authService.canRoleRead())
      return true;

    this.router.navigate(['post-all']);
    return false;

  }
}
