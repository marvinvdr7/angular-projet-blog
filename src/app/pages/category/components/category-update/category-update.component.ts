import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Category } from '../../models/Category';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/layouts/services/data.service';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.css']
})
export class CategoryUpdateComponent implements OnInit {

  title: string = 'Modifier une catégorie';

  categoryUpdateForm: FormGroup;
  category: Category;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private routeActive: ActivatedRoute,
    private router: Router,
    private dataService: DataService ) { }

  ngOnInit(): void {
      this.dataService.changeTitleSidenav(this.title);
      this.getCategory();
      // Contraintes de validations des inputs du formulaire
      this.categoryUpdateForm = this.formBuilder.group({
      name: ['', [Validators.required]]
    });
  }

  // Récupere le post via l'id en paramètre de l'url
  public getCategory(): void {
    let response = this.categoryService.getCategory(Number(this.routeActive.snapshot.paramMap.get('id')));
    response.subscribe(data => {
      this.category = data as Category;
      console.log("Cat EDIT :")
      console.log(this.category)
    });
  }

  public onSubmitUpdateCategory(): void {
      if(this.categoryUpdateForm.valid) {
        this.updateCategory();

      }
  }

  public updateCategory(): void {
    const updateCategory: Category = this.category;
    let response = this.categoryService.updateCategory(updateCategory);
    response.subscribe(data => {
      this.router.navigate(["/category-list/"]);
    });
  }
}
