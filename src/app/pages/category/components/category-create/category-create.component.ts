import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';
import { Category } from '../../models/Category';
import { DataService } from 'src/app/layouts/services/data.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {
  title: string = 'Ajouter une catégorie';

  categoryForm: FormGroup;
  date: Date = new Date();

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private dataService: DataService ) { }

  ngOnInit(): void {
    this.dataService.changeTitleSidenav(this.title);
    this.categoryForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]]
    });
  }

  public onSubmit(): void {
      if(this.categoryForm.valid){
        this.createCategory();
      }
  }

  public createCategory(): void {
    const newCategory: Category = this.categoryForm.value;
    let response = this.categoryService.createCategory(newCategory);
    response.subscribe(data => {
      console.log(data)
      this.router.navigate(["/category-list/"]);
    });
  }

}
