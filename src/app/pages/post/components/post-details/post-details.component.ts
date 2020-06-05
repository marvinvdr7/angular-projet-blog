import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/Post';
import { PostService } from '../../services/post.service';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/layouts/services/data.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  title: string = 'Article';

  postId: number;
  post: Post;

  constructor(private postService: PostService,
              private routeActive: ActivatedRoute ,
              private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.changeTitleSidenav(this.title);
    this.postId = Number(this.routeActive.snapshot.paramMap.get('id'));
    this.getPost();
  }

  public getPost(): void {
    let response = this.postService.getPost(this.postId);
    response.subscribe(data => {
      this.post = data as Post;
      console.log(this.post)
    });
  }
}
