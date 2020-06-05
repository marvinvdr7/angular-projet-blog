import { Component, OnInit, Input } from '@angular/core';
import { UserRegister } from 'src/app/pages/auth/models/UserRegister';
import { UserService } from 'src/app/pages/user/services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordsMatch } from '../../validators/Passwords-Confirm-Check';
import { DataService } from 'src/app/layouts/services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  title: string = 'Inscription';

  registerForm: FormGroup;
  
  errorUsernameExist: boolean = false;
  errorEmailExist: boolean = false;

  date: Date = new Date();
  minDate: Date = new Date(this.date.getFullYear() -120, this.date.getMonth(), this.date.getDate());
  maxDate: Date = new Date(this.date);

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private dataService: DataService ) { }

  ngOnInit(): void {
    this.dataService.changeTitleSidenav(this.title);
    // Contraintes de validations des inputs du formulaire
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30), Validators.pattern("[a-zA-Z]{1,}")]],
      firstname: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30), Validators.pattern("[a-zA-Z]{1,}")]],
      lastname: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30), Validators.pattern("[a-zA-Z]{1,}")]],
      email: ['', [Validators.required, Validators.email]],
      birthdate: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(255)]],
      confirmpassword: ['', [Validators.required]],
    }, {
      validators: PasswordsMatch('password', 'confirmpassword')
    });
  }

  public onSubmit(): void {
    if(this.checkIfUsernameExist() &&
      this.checkIfEmailExist()){
      if(this.registerForm.valid){
        this.createUser();
      }
    }
  }

  public createUser(): void {
    const newUser: UserRegister = this.registerForm.value;
    let response = this.userService.createUser(newUser);
    response.subscribe(data => console.log(data));
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