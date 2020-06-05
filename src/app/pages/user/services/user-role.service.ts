import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserRole } from '../models/UserRole';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {

  constructor(private httpClient: HttpClient) { }

  public createUserRoles(id_user: number, id_role: number): Observable<UserRole> {
    return this.httpClient.get<UserRole>("http://localhost:8080/user-role/create/" + id_user + "-" + id_role);
  }

  public updateUserRoles(userRole: UserRole): Observable<UserRole> {
    return this.httpClient.put<UserRole>("http://localhost:8080/user-role/", userRole);
  }

  public getAllUserRole(): Observable<UserRole[]> {
    return this.httpClient.get<UserRole[]>('http://localhost:8080/user-role');
  }

  public getUserRole(id: number): Observable<UserRole> {
    return this.httpClient.get<UserRole>("http://localhost:8080/user-role/" + id);
  }

  public deleteUserRole(id: number): Observable<UserRole> {
    return this.httpClient.delete<UserRole>("http://localhost:8080/user-role/" + id);
  }

  public deleteByUserAndRole(id_user: number, id_role: number): Observable<UserRole> {
    return this.httpClient.delete<UserRole>("http://localhost:8080/user-role/" + id_user + "-" + id_role);
  }
}
