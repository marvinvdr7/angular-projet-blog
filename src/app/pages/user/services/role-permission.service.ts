import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RolePermission } from '../models/RolePermission';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RolePermissionService {

  constructor(private httpClient: HttpClient) { }

  public createRolePermission(id_role: number, id_permission: number): Observable<RolePermission> {
    return this.httpClient.get<RolePermission>("http://localhost:8080/role-permission/create/" + id_role + "-" + id_permission);
  }

  public updateRolePermission(rolePermission: RolePermission): Observable<RolePermission> {
    return this.httpClient.put<RolePermission>("http://localhost:8080/role-permission/", rolePermission);
  }

  public getAllRolePermission(): Observable<RolePermission[]> {
    return this.httpClient.get<RolePermission[]>('http://localhost:8080/role-permission');
  }

  public getRolePermission(id: number): Observable<RolePermission> {
    return this.httpClient.get<RolePermission>("http://localhost:8080/role-permission/" + id);
  }

  public deleteRolePermission(id: number): Observable<RolePermission> {
    return this.httpClient.delete<RolePermission>("http://localhost:8080/role-permission/" + id);
  }

  public deleteByRoleAndPermission(id_role: number, id_permission: number): Observable<RolePermission> {
    return this.httpClient.delete<RolePermission>("http://localhost:8080/role-permission/" + id_role + "-" + id_permission);
  }
}
