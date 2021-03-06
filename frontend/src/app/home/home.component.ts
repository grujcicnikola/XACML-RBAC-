import { Component, OnInit } from '@angular/core';
import { User } from '../model/User';
import { ActivatedRoute } from '@angular/router';
import { EditorService } from '../service/editorService/editor.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { UserService } from '../service/userService/user.service';
import { PolicyService } from '../service/policyService/policy.service';
import { PolicySet } from '../model/PolicySet';
import { PolicySetService } from '../service/policySet/policy-set.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  someoneLogged: boolean = false;
  email: string = "";
  loggedUser: User;
  policySets: PolicySet[];

  constructor(private router: ActivatedRoute, private policySetService: PolicySetService,
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

      this.policySetService.getPolicySets().subscribe(
        data => {
          this.policySets = data;
          console.log(this.policySets);
        }
      )
    }
  }

  ngOnInit() {
  }


  open(policySet: PolicySet) {
    console.log(policySet.id);
  }

  downloadPolicySet(id: string) {
    this.policySetService.downloadPolicySet(id).subscribe((data: Blob) => {
      var file = new Blob([data], { type: 'text/xml' })
      var fileURL = window.URL.createObjectURL(file);
 
      let a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.href = fileURL;
      a.download = "policySet.xml";
      a.target = '_blank';
      a.click();
      window.URL.revokeObjectURL(fileURL);
      a.remove();
    })
  }

}

