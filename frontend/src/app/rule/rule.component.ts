import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PolicySet } from '../model/PolicySet';
import { UserService } from '../service/userService/user.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { Rule } from '../model/Rule';

@Component({
  selector: 'app-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.css']
})
export class RuleComponent implements OnInit {

  form: FormGroup;
  private rule = new Rule();
  @Output() closeEvent = new EventEmitter<void>();
  //private loginInfo: LoginInfo;

  constructor(private userService: UserService, private tokenStorage: TokenStorageService,
    private formBuilder: FormBuilder) { 
      this.form = this.formBuilder.group({
        ruleId: ['', [Validators.minLength(3), Validators.required]],
        effect: ['', [Validators.minLength(3), Validators.required]],
        description: ['', [Validators.minLength(3), Validators.required]]
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
