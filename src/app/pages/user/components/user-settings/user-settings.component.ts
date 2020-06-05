import { Component, OnInit, Input } from '@angular/core';
import { UserUpdateInfo } from '../../models/UserUpdate';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { DataService } from 'src/app/layouts/services/data.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {

  title: string = 'Paramètres de compte';

  userId: number;
  user: UserUpdateInfo;

  userUpdateInfoForm: FormGroup;
  userUpdateImageForm: FormGroup;
  userUpdatePasswordForm: FormGroup;

  
  @Input()
  inputPassword: string
  @Input()
  inputNewPassword: string
  @Input()
  inputConfirmPassword: string

  @Input()
  inputImage: string

  errorUsernameExist: boolean = false;
  errorEmailExist: boolean = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private dataService: DataService ) { }

  ngOnInit(): void {
    this.dataService.changeTitleSidenav(this.title);
    this.getUser();
        // Contraintes de validations des inputs du formulaire
        this.userUpdateInfoForm = this.formBuilder.group({
          username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30), Validators.pattern("[a-zA-Z]{1,}")]],
          firstname: ['default', [Validators.required, Validators.minLength(4), Validators.maxLength(30), Validators.pattern("[a-zA-Z]{1,}")]],
          lastname: ['default', [Validators.required, Validators.minLength(4), Validators.maxLength(30), Validators.pattern("[a-zA-Z]{1,}")]],
          email: ['default', [Validators.required, Validators.email]]
        });
    
        this.userUpdateImageForm = this.formBuilder.group({
          image: ['', Validators.required]
        });
    
        this.userUpdatePasswordForm = this.formBuilder.group({
          password: ['default', [Validators.required, Validators.minLength(8), Validators.maxLength(255)]],
          newpassword: ['default', [Validators.required, Validators.minLength(8), Validators.maxLength(255)]]
        });
  }

  public getUser(): void {
    let response = this.userService.getUserByUsername(sessionStorage.getItem("username"));
    response.subscribe(data => {
      this.user = data as UserUpdateInfo;
    });
  }

  public onSubmitUpdateUserInfo(): void {
    if(this.checkIfUsernameExist() &&
      this.checkIfEmailExist()){
      if(this.userUpdateInfoForm.valid){
        this.updateUserInfo();
      }
    }
  }

  public onSubmitUpdateUserImage(): void {
      if(this.userUpdateImageForm.valid){
        this.updateUserInfo();
      }
  }

  public onSubmitUpdateUserPassword(): void {
    if(this.userUpdatePasswordForm.valid){
      this.updateUserInfo();
    }
  }

  public updateUserInfo(): void {
    const updateUser: UserUpdateInfo = this.user;
    let response = this.userService.updateUser(updateUser);
    response.subscribe(() => {
      this.router.navigate(["/user-list/"]);
    });
  }

  // TODO
  public checkIfUsernameExist(): boolean {
    console.log("TODO check username ok")
    this.errorUsernameExist = false;
    return true;
  }

  // TODO
  public checkIfEmailExist(): boolean {
    console.log("TODO check email ok")
    this.errorEmailExist = false;
    return true;
  }
}
