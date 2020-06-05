import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { User } from '../models/User';
import { Observable } from 'rxjs';
import { UserRegister } from '../../auth/models/UserRegister';
import { UserUpdateInfo } from '../models/UserUpdate';
import { UserRole } from '../models/UserRole';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {  }

  ngOnInit(): void {  }
  
  public getAllUser(): Observable<User[]> {
    return this.httpClient.get<User[]>('http://localhost:8080/users');
  }

  public getUser(id: number): Observable<User> {
    return this.httpClient.get<User>("http://localhost:8080/users/" + id);
  }

  public getUserByUsername(username: string): Observable<User> {
    return this.httpClient.get<User>("http://localhost:8080/users/username/" + username);
  }

  public createUser(user: UserRegister): Observable<User> {
    return this.httpClient.post<User>("http://localhost:8080/users", user);
  }

  public updateUser(userUpdate: UserUpdateInfo): Observable<UserUpdateInfo> {
    return this.httpClient.put<UserUpdateInfo>("http://localhost:8080/users/"+ userUpdate.id, userUpdate);
  }

  public deleteUser(id: number): Observable<User> {
    return this.httpClient.delete<User>("http://localhost:8080/users/" + id);
  }
}