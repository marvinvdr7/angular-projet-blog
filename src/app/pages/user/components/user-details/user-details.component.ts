import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/layouts/services/data.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  title: string = 'Membre';

  userId: number;
  user: User;

  constructor(private userService: UserService,
              private routeActive: ActivatedRoute,
              private dataService: DataService ) { }

  ngOnInit(): void {
    this.dataService.changeTitleSidenav(this.title);
    this.userId = Number(this.routeActive.snapshot.paramMap.get('id'));
    this.getUser();
  }

  public getUser(): void {
    let response = this.userService.getUser(this.userId);
    response.subscribe(data => {
      this.user = data as User;
      console.log(this.user)
    });
  }

}
