import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }

  public getAllCategory(): Observable<Category[]> {
    return this.httpClient.get<Category[]>('http://localhost:8080/categories');
  }

  public getCategory(id: number): Observable<Category> {
    return this.httpClient.get<Category>("http://localhost:8080/categories/" + id);
  }

  public createCategory(category: Category): Observable<Category> {
    return this.httpClient.post<Category>("http://localhost:8080/categories", category);
  }

  public updateCategory(categoryUpdate: Category): Observable<Category> {
    return this.httpClient.put<Category>("http://localhost:8080/categories/"+ categoryUpdate.id, categoryUpdate);
  }

  public deleteCategory(id: number): Observable<Category> {
    return this.httpClient.delete<Category>("http://localhost:8080/categories/" + id);
  }
}
