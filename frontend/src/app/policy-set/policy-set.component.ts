import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../model/User';
import { LoginInfo } from '../auth/login';
import { UserService } from '../service/userService/user.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { checkPassword } from '../utils/password.validator';
import { mustMatch } from '../utils/must-match.validator';
import { PolicySet } from '../model/PolicySet';

@Component({
  selector: 'app-policy-set',
  templateUrl: './policy-set.component.html',
  styleUrls: ['./policy-set.component.css']
})
export class PolicySetComponent implements OnInit {

  form: FormGroup;
  private policySet = new PolicySet();
  @Output() closeEvent = new EventEmitter<void>();
  //private loginInfo: LoginInfo;

  constructor(private userService: UserService, private tokenStorage: TokenStorageService,
    private formBuilder: FormBuilder) { 
      this.form = this.formBuilder.group({
        xsi: ['', [Validators.minLength(3), Validators.required]],
        policySetId: ['', [Validators.minLength(3), Validators.required]],
        version: ['', [Validators.minLength(3), Validators.required]],
        policyCombiningAlgId: ['', [Validators.minLength(3), Validators.required]],
        description: ['', [Validators.minLength(3), Validators.required]],
        policySetIdReference: ['', [Validators.minLength(3), Validators.required]],
        policyIdReference: ['', [Validators.minLength(3), Validators.required]]
      });
    }
   
  ngOnInit() {
    
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    // this.userService.register(this.user).subscribe(res => {
    //   window.location.href = "https://localhost:4200";
    // }, err => {

    // });
  }

}
