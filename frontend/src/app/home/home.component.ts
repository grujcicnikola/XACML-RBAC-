import { Component, OnInit } from '@angular/core';
import { User } from '../model/User';
import { ActivatedRoute } from '@angular/router';
import { EditorService } from '../service/editorService/editor.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { UserService } from '../service/userService/user.service';
import { PolicyService } from '../service/policyService/policy.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  someoneLogged: boolean = false;
  email: string = "";
  loggedUser: User;

  constructor(private router: ActivatedRoute, private policyService: PolicyService,
    private tokenStorage: TokenStorageService, private userService: UserService) {

      if (this.tokenStorage.getToken()) {
        this.someoneLogged = true;
  
        let jwt = this.tokenStorage.getToken();
        console.log("Tokeen: " + jwt);
        let jwtData = jwt.split('.')[1];
        let decodedJwtJsonData = window.atob(jwtData);
        let decodedJwtData = JSON.parse(decodedJwtJsonData);
        this.email = decodedJwtData.sub;
  
        //console.log('jwtData: ' + jwtData);
        //console.log('decodedJwtJsonData: ' + decodedJwtJsonData);
        //console.log('decodedJwtData: ' + decodedJwtData);
        console.log('User: ' + this.email);
  
        this.userService.getUserByUsername(this.email).subscribe(data => {
          this.loggedUser = data as User;
          console.log(this.loggedUser);
        });

        this.policyService.getPolicySets().subscribe(
          data => {
            console.log(data);
          }
          )
      }
     }

  ngOnInit() {
  }

}
