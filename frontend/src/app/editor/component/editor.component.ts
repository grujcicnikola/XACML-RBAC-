import { Component, OnInit } from '@angular/core';
import { EditorService } from '../service/editor.service';
import { ActivatedRoute } from '@angular/router';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { UserService } from 'src/app/service/userService/user.service';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  
  someoneLogged : boolean = false;
  email : string = "";
  loggedUser : User;


  constructor(private router: ActivatedRoute, private service: EditorService, private tokenStorage: TokenStorageService, private userService: UserService) { 
    service.test();
    this.service.test().subscribe(data => {
        console.log(data);
     });

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

      this.userService.getUserByUsername(this.email).subscribe(data =>{
        this.loggedUser = data as User; 
        console.log(this.loggedUser);
      });
    }
  }

  ngOnInit() {
    
  }

  logout(){
    this.tokenStorage.signOut();
    this.userService.logout(this.email).subscribe(data =>{
      window.location.href="https://localhost:4200";
    });
    
  }

}
