import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/layouts/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title: string = 'Connexion';

  username: string = '';
  password: string = '';

  errorLog: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private dataService: DataService ) { }

  ngOnInit(): void {
    this.dataService.changeTitleSidenav(this.title);
    if(sessionStorage.getItem("username"))
      this.router.navigate(["/post-all"]);
  }

  public checkLogin(): void {
    let response = this.authService.login(this.username, this.password);
    response.subscribe(() => {
      this.router.navigate(["/post-all"]);
    },
    error => { 
      this.errorLog = true;
      console.log('oops error login', error); 
    });
  }
}
