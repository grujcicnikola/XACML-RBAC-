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
import { TargetService } from '../service/targetService/target.service';

@Component({
  selector: 'app-any-of',
  templateUrl: './any-of.component.html',
  styleUrls: ['./any-of.component.css']
})
export class AnyOfComponent implements OnInit, OnChanges {

  @Input() mode : ModeEnum;
  @Input() idPolicySet : string;
  @Input() id : string;
  @Input() selectedParentType : string;
  @Input() parentId : string;
  @Output() saveEvent = new EventEmitter<PolicySet>();
  @Output() closeEvent = new EventEmitter<void>();

  form: FormGroup;
  private anyOf = new AnyOf();
  private match = new Match();
  private attributeDesignator = new AttributeDesignator();
  private attributeValue = new AttributeValue();

  constructor(private userService: UserService, private tokenStorage: TokenStorageService,
    private formBuilder: FormBuilder, private targetService: TargetService, private policySetService : PolicySetService,  private policyService : PolicyService) { 
      
      this.form = this.formBuilder.group({
        matchId: ['', [Validators.minLength(3), Validators.required]],
        dataType: ['', [Validators.minLength(3), Validators.required]],
        dataTypeDesignator: ['', [Validators.minLength(3), Validators.required]],
        value: ['', [Validators.minLength(3), Validators.required]],
        category: ['', [Validators.minLength(3), Validators.required]],
        attributeId: ['', [Validators.minLength(3), Validators.required]],
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
    this.anyOf.allOf = new AllOf();//TODO change when there are mulitple
    this.match.attributeDesignator = this.attributeDesignator;
    this.match.attributeValue = this.attributeValue;
    this.anyOf.allOf.match= this.match;
    if( this.mode === ModeEnum.Add) {
      this.targetService.addTargetContent(this.parentId, this.selectedParentType, this.idPolicySet, this.anyOf).subscribe(res => {
        this.saveEvent.emit(res);
        this.closeEvent.emit();
      }, err => {
  
      });
    }else if ( this.mode === ModeEnum.Edit){
      // this.policyService.updatePolicy(this.policy, this.idPolicySet).subscribe(res => {
      //   this.saveEvent.emit(res);
      //   this.closeEvent.emit();
      // }, err => {
  
      // });
    }
    this.anyOf = new AnyOf();
    this.match = new Match();
    this.attributeDesignator = new AttributeDesignator();
    this.attributeValue = new AttributeValue();
  }

}
