import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../services/header.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ApplicationService } from 'src/app/application.service';
import { Router } from '@angular/router';
import { User } from 'src/app/pages/user/models/User';
import { UserService } from 'src/app/pages/user/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  spacetopheight: string;

  constructor(
    private headerService: HeaderService, 
    public authService: AuthenticationService,
    private userService: UserService,
    public applicationService: ApplicationService,
    private router: Router ) { }

  ngOnInit(): void {
    if(this.getDeviceSize()) {
      this.spacetopheight = "h54"
    }else {
      this.spacetopheight = "h64"
    }
  }

  public toggleClick(): void {
    this.headerService.toggleClick()
  }

  public getDeviceSize(): boolean {
    return this.applicationService.getDeviceSize();
  }

  public goToUserDetails() : void {
    let user: User;
    this.userService.getUserByUsername(sessionStorage.getItem('username')).subscribe(data =>{ 
      user = data;
      this.router.navigate(["/user-details/", user.id]);
    });
   
  }

}
