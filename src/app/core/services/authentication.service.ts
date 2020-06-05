import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }

  public login(username:string, password:string): Observable<any> {

    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });

    return this.httpClient.get('http://localhost:8080/', { headers }).pipe(
      map(
        userData => {
          let authString = 'Basic ' + btoa(username + ':' + password);
          sessionStorage.setItem('basicauth-token', authString);
          sessionStorage.setItem('username', username);
          sessionStorage.setItem("roles", JSON.stringify(userData));
          console.log(userData);
          console.log(sessionStorage.getItem('roles'))
          return userData;
        }
      )
    );
  }

  public logout(): void {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('roles');
    sessionStorage.removeItem('basicauth-token');
  }

  public isUserLoggedIn(): boolean {
    let user = sessionStorage.getItem('username');
    return !(user === null);
  }

  public isUserAdmin(): boolean {
    return sessionStorage.getItem('roles').includes('ROLE_ADMIN');
  }

  public isUserSuperAdmin(): boolean {
    return sessionStorage.getItem('roles').includes('ROLE_SUPER_ADMIN');
  }

  public getAuthorities(): string[] {
    let listAuthorities = JSON.parse(sessionStorage.getItem('roles'));
    return listAuthorities;
  }
  
  public getUsername(): string {
    return sessionStorage.getItem('username');
  }

  public canMembreWrite(): boolean {
    return sessionStorage.getItem('roles').includes('member:write');
  }

  public canMembreRead(): boolean {
    return sessionStorage.getItem('roles').includes('member:read');
  }

  public canPostWrite(): boolean {
    return sessionStorage.getItem('roles').includes('post:write');
  }

  public canPostRead(): boolean {
    return sessionStorage.getItem('roles').includes('post:read');
  }

  public canCategoryWrite(): boolean {
    return sessionStorage.getItem('roles').includes('category:write');
  }

  public canCategoryRead(): boolean {
    return sessionStorage.getItem('roles').includes('category:read');
  }

  public canRoleWrite(): boolean {
    return sessionStorage.getItem('roles').includes('role:write');
  }

  public canRoleRead(): boolean {
    return sessionStorage.getItem('roles').includes('role:read');
  }
}