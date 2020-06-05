import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/Post';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/layouts/services/data.service';

@Component({
  selector: 'app-post-category',
  templateUrl: './post-category.component.html',
  styleUrls: ['./post-category.component.css']
})
export class PostCategoryComponent implements OnInit {

  title: string = 'Articles par catégorie';

  catId: number;
  posts: Post[];

  constructor(private postService: PostService,
              private router: Router,
              private routeActive: ActivatedRoute,
              private dataService: DataService ) { }

  ngOnInit(): void {
    this.dataService.changeTitleSidenav(this.title);
    this.catId = Number(this.routeActive.snapshot.paramMap.get('id'));
    this.getAllPostByCategoryId(this.catId)
  }

  public getAllPostByCategoryId(id: number): void {
    this.postService.getAllPostByCategoryId(id).subscribe(data => this.posts = data as Post[])
  }

  public goToPostDetails(id: number): void {
    this.router.navigate(["/post-details/", id]);
  }

}
