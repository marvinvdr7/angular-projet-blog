import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../models/Role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private httpClient: HttpClient) { }

   public getAllRole(): Observable<Role[]> {
    return this.httpClient.get<Role[]>('http://localhost:8080/roles');
  }

  public getRoleByUser(id: number): Observable<Role[]> {
    return this.httpClient.get<Role[]>('http://localhost:8080/roles/user/' + id);
  }

  public getRole(id: number): Observable<Role> {
    return this.httpClient.get<Role>("http://localhost:8080/roles/" + id);
  }
}
