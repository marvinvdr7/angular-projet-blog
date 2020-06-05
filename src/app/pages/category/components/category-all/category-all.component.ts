import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/Category';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/layouts/services/data.service';

@Component({
  selector: 'app-category-all',
  templateUrl: './category-all.component.html',
  styleUrls: ['./category-all.component.css']
})
export class CategoryAllComponent implements OnInit {
  title: string = 'Toutes les catégories';

  categoryList: Category[] = []

  constructor(private categoryService: CategoryService,
              private router: Router,
              private dataService: DataService ) { }

  ngOnInit(): void {
    this.dataService.changeTitleSidenav(this.title);
    this.getAllCategory();
  }

  public getAllCategory(): void {
    this.categoryService.getAllCategory().subscribe(data => {
      console.log(data)
      this.categoryList = data as Category[];
    });
  }

  public goToCategoryPosts(id: number): void {
    this.router.navigate(["/post-category/", id]);
  }

}
