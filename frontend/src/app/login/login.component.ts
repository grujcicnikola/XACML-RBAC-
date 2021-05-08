import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginInfo } from 'src/app/auth/login';
import { AuthService } from 'src/app/auth/authService';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  private username = "";
  private password = "";
  private loginInfo: LoginInfo;
  private incorrectData = false;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  onSubmit() {
    this.loginInfo = new LoginInfo(
      this.username,
      this.password);

    this.authService.attemptAuth(this.loginInfo).subscribe(res => {
      this.tokenStorage.saveToken(res.token);
      this.tokenStorage.saveUsername(res.username);
      this.tokenStorage.saveAuthorities(res.authorities);
      window.location.href = "https://localhost:4200/editor";
    }, err => {
      this.incorrectData = true;
    }
    );

  }

}
