import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/Post';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/pages/category/models/Category';
import { CategoryService } from 'src/app/pages/category/services/category.service';
import { DataService } from 'src/app/layouts/services/data.service';

@Component({
  selector: 'app-post-update',
  templateUrl: './post-update.component.html',
  styleUrls: ['./post-update.component.css']
})
export class PostUpdateComponent implements OnInit {

  title: string = 'Modifier un article';

  postUpdateForm: FormGroup;
  post: Post;
  categories: Category[];

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private routeActive: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private dataService: DataService ) { }

  ngOnInit(): void {
      this.dataService.changeTitleSidenav(this.title);
      this.getAllCategory();
      this.getPost();
      this.postUpdateForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      image: ['', [Validators.required]],
      category: ['', [Validators.required]]
    });
  }

  public getPost(): void {
    let response = this.postService.getPost(Number(this.routeActive.snapshot.paramMap.get('id')));
    response.subscribe(data => {
      this.post = data as Post;
    });
  }

  public onSubmitUpdatePost(): void {
      if(this.postUpdateForm.valid) {
        this.updatePost();
      }
  }

  public updatePost(): void {
    const updatePost: Post = this.post;
    let response = this.postService.updatePost(updatePost);
    response.subscribe(() => {
      this.router.navigate(["/post-list/"]);
    });
  }

  public getAllCategory(): void {
    this.categoryService.getAllCategory()
    .subscribe(data => this.categories = data as Category[])
  }

}
