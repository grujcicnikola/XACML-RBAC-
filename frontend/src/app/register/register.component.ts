import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/authService';
import { LoginInfo } from '../auth/login';
import { TokenStorageService } from '../auth/token-storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../model/User';
import { UserService } from '../service/userService/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private user = new User();
  private loginInfo: LoginInfo;

  constructor(private userService: UserService, private tokenStorage: TokenStorageService) { }

  ngOnInit() {
  }

  onSubmit(){

    if(this.isBlank(this.user.username))
    {
      alert("You must enter username");
    }else if(this.isBlank(this.user.password))
    {
      alert("You must enter password");
    }else
    {
      this.userService.register(this.user).subscribe(res =>{
        alert("User " + this.user.username + " successfully registered!");
        window.location.href="https://localhost:4200";
      },err => { 
        this.handleAuthError(err)
      }); 
    }

  }


  isBlank(str) {
    return (!str || /^\s*$/.test(str));
  }

  handleAuthError(err: HttpErrorResponse) {
  
    if (err.status === 400) {
      alert('Check userame!');
    }else if(err.status === 403) {
      alert('Account is not approved!');
    }
    
  }
}
