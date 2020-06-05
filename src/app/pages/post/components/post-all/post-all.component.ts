import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/Post';
import { PostService } from '../../services/post.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/layouts/services/data.service';

@Component({
  selector: 'app-post-all',
  templateUrl: './post-all.component.html',
  styleUrls: ['./post-all.component.css']
})
export class PostAllComponent implements OnInit {

  title: string = 'Tous les articles';

  postList: Post[] = [];

  constructor(private postService: PostService,
              private router: Router,
              private dataService: DataService ) { }

  ngOnInit(): void {
    this.getPosts();
    this.dataService.changeTitleSidenav(this.title);
  }

  public getPosts(): void {
    this.postService.getAllPost().subscribe(data => {
      console.log(data)
      this.postList = data as Post[];
    });
  }

  public goToPostDetails(id: number): void {
    this.router.navigate(["/post-details/", id]);
  }

  public cutString(text: string, numberChar: number): string {
    let result = text.substring(0, numberChar);
    if(result.length >= numberChar)
      result += '...';

    return result;
  }
}
