import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Permission } from '../models/Permission';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private httpClient: HttpClient) { }

  public getAllPermission(): Observable<Permission[]> {
   return this.httpClient.get<Permission[]>('http://localhost:8080/permissions');
 }

 public getPermissionByRole(id: number): Observable<Permission[]> {
   return this.httpClient.get<Permission[]>('http://localhost:8080/permissions/role/' + id);
 }

 public getPermission(id: number): Observable<Permission> {
   return this.httpClient.get<Permission>("http://localhost:8080/permissions/" + id);
 }
}
