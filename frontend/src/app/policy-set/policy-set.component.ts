import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../model/User';
import { LoginInfo } from '../auth/login';
import { UserService } from '../service/userService/user.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { checkPassword } from '../utils/password.validator';
import { mustMatch } from '../utils/must-match.validator';
import { PolicySet } from '../model/PolicySet';
import { PolicyService } from '../service/policyService/policy.service';
import { ModeEnum } from '../model/Mode';

@Component({
  selector: 'app-policy-set',
  templateUrl: './policy-set.component.html',
  styleUrls: ['./policy-set.component.css']
})
export class PolicySetComponent implements OnInit, OnChanges {

  @Input() mode : ModeEnum;
  @Output() closeEvent = new EventEmitter<void>();
  form: FormGroup;
  private policySet = new PolicySet();
  //private loginInfo: LoginInfo;

  constructor(private userService: UserService, private tokenStorage: TokenStorageService,
    private formBuilder: FormBuilder, private policyService : PolicyService) { 
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

  ngOnChanges(changes: SimpleChanges): void {
    if( this.mode === ModeEnum.Edit){
      this.policyService.getPolicySet(1).subscribe(res =>
        this.policySet = res)
    }else{
      this.policySet = new PolicySet();
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {

    if( this.mode === ModeEnum.Add){
      this.policyService.createPolicySet(this.policySet).subscribe(res => {
        this.closeEvent.emit();
      }, err => {
  
      });
    }else{
      //put method
    }
  
  }

}
