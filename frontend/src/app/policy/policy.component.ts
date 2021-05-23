import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PolicySet } from '../model/PolicySet';
import { UserService } from '../service/userService/user.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { Policy } from '../model/Policy';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent implements OnInit {

  form: FormGroup;
  private policy = new Policy();
  @Output() closeEvent = new EventEmitter<void>();
  //private loginInfo: LoginInfo;

  constructor(private userService: UserService, private tokenStorage: TokenStorageService,
    private formBuilder: FormBuilder) { 
      this.form = this.formBuilder.group({
        xsi: ['', [Validators.minLength(3), Validators.required]],
        policyId: ['', [Validators.minLength(3), Validators.required]],
        version: ['', [Validators.minLength(3), Validators.required]],
        ruleCombiningAlgId: ['', [Validators.minLength(3), Validators.required]],
        description: ['', [Validators.minLength(3), Validators.required]],
        schemaLocator: ['', [Validators.minLength(3), Validators.required]]
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
