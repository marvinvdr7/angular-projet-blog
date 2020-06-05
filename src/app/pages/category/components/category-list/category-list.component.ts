import { Component, OnInit, ViewChild } from '@angular/core';
import { Category } from '../../models/Category';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CategoryService } from '../../services/category.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/layouts/services/data.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  title: string = 'Liste des catégories';

  categories: Category[];
  dataSource = new MatTableDataSource(this.categories);
  displayedColumns: string[] = ['id', 'name', 'actions'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private categoryService: CategoryService,
    private authService: AuthenticationService,
    private router: Router,
    private dataService: DataService ) {  }

  ngOnInit(): void {
    this.dataService.changeTitleSidenav(this.title);
    this.getAllCategory();
    this.dataSource.paginator = this.paginator;
  }

  public goToCategoryUpdate(id: number) : void {
    this.router.navigate(["/category-update/", id]);
  }

  public goToCategoryPosts(id: number): void {
    this.router.navigate(["/post-category/", id]);
  }

  public goToCreateCategory(): void {
    this.router.navigate(["/category-create"]);
  }

  public applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) 
      this.dataSource.paginator.firstPage();
  }

  public getAllCategory(): void {
    let response = this.categoryService.getAllCategory();
    response.subscribe(datas => {
      this.dataSource.data = datas as Category[];
      this.categories = datas;
    });
  }

  public deleteCategory(id: number, index: number): void {
    this.categoryService.deleteCategory(id)
    .subscribe(() => {
      this.categories.splice(index, 1);
      this.dataSource = new MatTableDataSource<Category>(this.categories);
    });
  }

  public getUserame(): string {
    return this.authService.getUsername();
  }

}
