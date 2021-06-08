import { Component, OnInit, Output, Input, EventEmitter, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PolicySet } from '../model/PolicySet';
import { UserService } from '../service/userService/user.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { Policy } from '../model/Policy';
import { ModeEnum } from '../model/Mode';
import { PolicyService } from '../service/policyService/policy.service';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent implements OnInit {

  @Input() mode : ModeEnum;
  @Output() closeEvent = new EventEmitter<void>();
  form: FormGroup;
  private policy = new Policy();

  constructor(private userService: UserService, private tokenStorage: TokenStorageService,
    private formBuilder: FormBuilder,  private policyService : PolicyService) { 
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

  ngOnChanges(changes: SimpleChanges): void {
    if( this.mode === ModeEnum.Edit){
      this.policyService.getPolicy(1).subscribe(res =>
        this.policy = res)
    }else{
      this.policy = new Policy();
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    // this.userService.register(this.user).subscribe(res => {
    //   window.location.href = "http://localhost:4200";
    // }, err => {

    // });
  }

}
