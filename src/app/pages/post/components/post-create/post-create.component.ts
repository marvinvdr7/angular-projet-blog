import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/Post';
import { Router } from '@angular/router';
import { Category } from 'src/app/pages/category/models/Category';
import { CategoryService } from 'src/app/pages/category/services/category.service';
import { DataService } from 'src/app/layouts/services/data.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  title: string = 'Ajouter un article';

  categories: Category[];

  postForm: FormGroup;

  date: Date = new Date();

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private categoryService: CategoryService,
    private router: Router,
    private dataService: DataService ) { }

  ngOnInit(): void {
    this.dataService.changeTitleSidenav(this.title);
    this.getAllCategory();
    this.postForm = this.formBuilder.group({
      date: [this.date.toISOString()],
      author: [sessionStorage.getItem('username'), [Validators.required, Validators.minLength(4), Validators.maxLength(30), Validators.pattern("[a-zA-Z]{1,}")]],
      title: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(120)]],
      content: ['', [Validators.required, Validators.minLength(200), Validators.maxLength(3000)]],
      image: ['', [Validators.required]],
      category_id: ['', [Validators.required]]
    });
  }

  onSubmit(formulaire: FormGroup) {
      if(this.postForm.valid){
        console.log("!!! Le formulaire est valide : " + formulaire);
        this.createPost();
      }
  }

  public createPost(): void {
    const newPost: Post = this.postForm.value;

    let response = this.postService.createPost(newPost);
    response.subscribe(() => {
      this.router.navigate(["/post-list/"]);
    });
  }

  public getAllCategory(): void {
    this.categoryService.getAllCategory()
    .subscribe(data => this.categories = data as Category[])
  }

}
