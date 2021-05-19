import { Component, OnInit } from '@angular/core';
import { EditorService } from '../../service/editorService/editor.service';
import { ActivatedRoute } from '@angular/router';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { UserService } from 'src/app/service/userService/user.service';
import { User } from 'src/app/model/User';
import { PolicyService } from 'src/app/service/policyService/policy.service';
import { TaskDataService } from 'src/app/service/taskDataService/task-data.service';
import { TaskModel } from 'src/app/model/TaskModel';
import PolicySetState from 'src/app/store/policySet.state';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import * as PolicySetActions from 'src/app/store/policySet.action';
import { PolicySetReducer, policySet_selector } from 'src/app/store/policySet.reducer';
import { PolicySet } from 'src/app/model/PolicySet';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  someoneLogged: boolean = false;
  email: string = "";
  loggedUser: User;
  tasks: TaskModel[];
  tabIndex: any;
  policySet$: Observable<PolicySet>;
  //policySet$: Observable<PolicySet>;
  //ToDoSubscription: Subscription;

  constructor(private router: ActivatedRoute, private service: EditorService,
    private tokenStorage: TokenStorageService, private userService: UserService,
    private policyService: PolicyService, private taskDataService: TaskDataService, private store: Store<{ policySet: PolicySetState }>) {
      

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

      this.userService.getUserByUsername(this.email).subscribe(data => {
        this.loggedUser = data as User;
        console.log(this.loggedUser);
      });
      
      this.store.dispatch(PolicySetActions.BeginGetPolicySetAction());
      this.policySet$ = this.store.pipe(select(policySet_selector));
    }
  }

  ngOnInit() {
    // this.store.dispatch(PolicySetActions.BeginGetPolicySetAction());
    // this.policySet$ = this.store.pipe(select(policySet_selector));
  }

  logout() {
    this.tokenStorage.signOut();
    this.userService.logout(this.email).subscribe(data => {
      window.location.href = "https://localhost:4200";
    });
  }

  myFunction() {
    console.log('klik 2')
    console.log(this.tabIndex);
  }
}
