import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/authService';
import { LoginInfo } from '../auth/login';
import { TokenStorageService } from '../auth/token-storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../model/User';
import { UserService } from '../service/userService/user.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { mustMatch } from '../utils/must-match.validator';
import { checkPassword } from '../utils/password.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  private user = new User();

  constructor(private userService: UserService, private tokenStorage: TokenStorageService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', [Validators.minLength(3), Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.minLength(3), Validators.required]],
      surname: ['', [Validators.minLength(3), Validators.required]],
      password: ['', Validators.required],
      repeated_passoword: ['', Validators.required]
    }, {
        validator: [
          checkPassword('password', 'username'),
          mustMatch('password', 'repeated_passoword')
        ]
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {

    this.userService.register(this.user).subscribe(res => {
      window.location.href = "https://localhost:4200";
    }, err => {

    });
  }

}




