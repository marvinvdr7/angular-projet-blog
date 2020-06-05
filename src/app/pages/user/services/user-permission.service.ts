import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserPermission } from '../models/UserPermission';
import { UserPermissionTrace } from '../models/UserPermissionTrace';

@Injectable({
  providedIn: 'root'
})
export class UserPermissionService {

  constructor(private httpClient: HttpClient) { }

  public getAllUserPermission(): Observable<UserPermission[]> {
    return this.httpClient.get<UserPermission[]>('http://localhost:8080/user-permission');
  }

  public getAllByUserId(id: number): Observable<UserPermission[]> {
    return this.httpClient.get<UserPermission[]>('http://localhost:8080/user-permission/user/' + id);
  }

  public createUserPermission(id_user: number, id_permission: number): Observable<UserPermission> {
    return this.httpClient.get<UserPermission>("http://localhost:8080/user-permission/create/" + id_user + "-" + id_permission);
  }

  public endByUserAndPermission(userPermission: UserPermission, id_user: number, id_permission: number): Observable<UserPermission> {
    return this.httpClient.put<UserPermission>("http://localhost:8080/user-permission/end/" + id_user + "-" + id_permission, userPermission);
  }

  public deleteByUserAndPermission(id_user: number, id_permission: number): Observable<UserPermission> {
    return this.httpClient.delete<UserPermission>("http://localhost:8080/user-permission/" + id_user + "-" + id_permission);
  }

  public createTraceUserPermission(userPermissionTrace: UserPermissionTrace): Observable<UserPermissionTrace> {
    return this.httpClient.post<UserPermissionTrace>("http://localhost:8080/user-permission-trace/", userPermissionTrace);
  }
}
