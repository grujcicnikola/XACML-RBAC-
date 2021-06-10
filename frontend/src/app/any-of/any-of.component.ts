import { Component, OnInit, Output, Input, EventEmitter, SimpleChanges, OnChanges, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PolicySet } from '../model/PolicySet';
import { UserService } from '../service/userService/user.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { Policy } from '../model/Policy';
import { ModeEnum } from '../model/Mode';
import { PolicyService } from '../service/policyService/policy.service';
import { PolicySetService } from '../service/policySet/policy-set.service';
import { AnyOf } from '../model/AnyOf';
import { AllOf } from '../model/AllOf';
import { Match } from '../model/Match';
import { AttributeValue } from '../model/AttributeValue';
import { AttributeDesignator } from '../model/AttributeDesignator';

@Component({
  selector: 'app-any-of',
  templateUrl: './any-of.component.html',
  styleUrls: ['./any-of.component.css']
})
export class AnyOfComponent implements OnInit, OnChanges {

  @Input() mode : ModeEnum;
  @Input() idPolicySet : string;
  @Input() id : string;
  @Output() saveEvent = new EventEmitter<PolicySet>();
  @Output() closeEvent = new EventEmitter<void>();
  form: FormGroup;
  private anyOf = new AnyOf();
  private match = new Match();
  private attributeDesignator = new AttributeDesignator();
  private attributeValue = new AttributeValue();

  constructor(private userService: UserService, private tokenStorage: TokenStorageService,
    private formBuilder: FormBuilder, private policySetService : PolicySetService,  private policyService : PolicyService) { 
      
      this.form = this.formBuilder.group({
        matchId: ['', [Validators.minLength(3), Validators.required]],
        dataType: ['', [Validators.minLength(3), Validators.required]],
        dataTypeDesignator: ['', [Validators.minLength(3), Validators.required]],
        value: ['', [Validators.minLength(3), Validators.required]],
        category: ['', [Validators.minLength(3), Validators.required]],
        attributeId: ['', [Validators.minLength(3), Validators.required]],
        mustBePresent: ['', [Validators.minLength(3), Validators.required]]
      });
    }
   
  ngOnInit() {
  }

  ngOnChanges(changes:  import("@angular/core").SimpleChanges): void {
    if( this.mode === ModeEnum.Edit){
      // this.policyService.getPolicy(this.id, this.idPolicySet).subscribe(res =>
      //   this.policy = res)
    }else{
      this.anyOf = new AnyOf();
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    if( this.mode === ModeEnum.Add){
      // this.policyService.addPolicy(this.policy, this.idPolicySet).subscribe(res => {
      //   this.saveEvent.emit(res);
      //   this.closeEvent.emit();
      // }, err => {
  
      // });
    }else if ( this.mode === ModeEnum.Edit){
      // this.policyService.updatePolicy(this.policy, this.idPolicySet).subscribe(res => {
      //   this.saveEvent.emit(res);
      //   this.closeEvent.emit();
      // }, err => {
  
      // });
    }
    this.anyOf = new AnyOf();
  }

}
