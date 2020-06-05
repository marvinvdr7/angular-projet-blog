import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from 'src/app/pages/user/services/user.service';
import { User } from 'src/app/pages/user/models/User';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { DataService } from 'src/app/layouts/services/data.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  title: string = 'Liste des membres';

  users: User[];
  dataSource = new MatTableDataSource(this.users);
  displayedColumns: string[] = ['id', 'image', 'username', 'email','actions'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  @Input()
  inputUsername: string
  @Input()
  inputFirstname: string
  @Input()
  inputLastname: string
  @Input()
  inputEmail: string
  @Input()
  inputImage: string

  constructor(
    private userService: UserService,
    public authService: AuthenticationService,
    private router: Router,
    private dataService: DataService ) {  }

  public goToUserUpdate(id: number) : void {
    this.router.navigate(["/user-update/", id]);
  }

  public goToUserDetails(id: number) : void {
    this.router.navigate(["/user-details/", id]);
  }

  public goToUserSettings() : void {
    this.router.navigate(["/user-settings/"]);
  }

  ngOnInit(): void {
    this.dataService.changeTitleSidenav(this.title);
    this.getAllUser();
    this.dataSource.paginator = this.paginator;
  }

  public applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) 
      this.dataSource.paginator.firstPage();
  }

  public getAllUser(): void {
    let response = this.userService.getAllUser();
    response.subscribe(datas => {
      this.dataSource.data = datas as User[];
      this.users = datas;
    });
  }

  public getUser(id: number): void {
    let response = this.userService.getUser(id);
    response.subscribe();
  }

  public deleteUser(id: number, index: number): void {
    this.userService.deleteUser(id)
    .subscribe(() => {
      this.users.splice(index, 1);
      this.dataSource = new MatTableDataSource<User>(this.users);
    });
  }
}
