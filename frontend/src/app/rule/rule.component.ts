import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PolicySet } from '../model/PolicySet';
import { UserService } from '../service/userService/user.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { Rule } from '../model/Rule';
import { ModeEnum } from '../model/Mode';
import { PolicyService } from '../service/policyService/policy.service';

@Component({
  selector: 'app-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.css']
})
export class RuleComponent implements OnInit {

  @Input() mode : ModeEnum;
  @Output() closeEvent = new EventEmitter<void>();
  form: FormGroup;
  private rule = new Rule();

  constructor(private userService: UserService, private tokenStorage: TokenStorageService,
    private formBuilder: FormBuilder,  private policyService : PolicyService) { 
      this.form = this.formBuilder.group({
        ruleId: ['', [Validators.minLength(3), Validators.required]],
        effect: ['', [Validators.minLength(3), Validators.required]],
        description: ['', [Validators.minLength(3), Validators.required]]
      });
    }
  ngOnInit() {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if( this.mode === ModeEnum.Edit){
      this.policyService.getRule(1).subscribe(res =>
        this.rule = res)
    }else{
      this.rule = new Rule();
    }
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
