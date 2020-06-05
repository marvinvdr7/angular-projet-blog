import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Router } from '@angular/router';
import { Post } from '../../models/Post';
import { PostService } from '../../services/post.service';
import { DataService } from 'src/app/layouts/services/data.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  title: string = 'Liste des articles';

  posts: Post[];
  dataSource = new MatTableDataSource(this.posts);
  displayedColumns: string[] = ['id', 'image', 'title', 'content', 'author', 'actions'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private postService: PostService,
    public authService: AuthenticationService,
    private router: Router,
    private dataService: DataService ) {  }

  ngOnInit(): void {
    this.dataService.changeTitleSidenav(this.title);
    this.getAllPost();
    this.dataSource.paginator = this.paginator;
  }

  public goToPostUpdate(id: number) : void {
    this.router.navigate(["/post-update/", id]);
  }

  public goToPostDetails(id: number) : void {
    this.router.navigate(["/post-details/", id]);
  }

  public applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) 
      this.dataSource.paginator.firstPage();
  }

  public getAllPost(): void {
    let response = this.postService.getAllPost();
    response.subscribe(datas => {
      this.dataSource.data = datas as Post[];
      this.posts = datas;
    });
  }

  public deletePost(id: number, index: number): void {
    this.postService.deletePost(id)
    .subscribe(() => {
      this.posts.splice(index, 1);
      this.dataSource = new MatTableDataSource<Post>(this.posts);
    });
  }
}
