import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PolicySet } from '../model/PolicySet';
import { UserService } from '../service/userService/user.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { Rule } from '../model/Rule';
import { ModeEnum } from '../model/Mode';
import { PolicyService } from '../service/policyService/policy.service';
import { RuleService } from '../service/ruleService/rule.service';

@Component({
  selector: 'app-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.css']
})
export class RuleComponent implements OnInit {

  @Input() mode : ModeEnum;
  @Input() id: string;
  @Input() parentId: string;
  @Input() idPolicySet : string;
  @Output() saveEvent = new EventEmitter<PolicySet>();
  @Output() closeEvent = new EventEmitter<void>();
  form: FormGroup;
  private rule = new Rule();

  constructor(
    private formBuilder: FormBuilder,  private ruleService : RuleService) { 
      this.form = this.formBuilder.group({
        ruleId: ['', [Validators.minLength(3), Validators.required]],
        effect: ['', [Validators.minLength(3), Validators.required]]
      });
    }
  ngOnInit() {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if( this.mode === ModeEnum.Edit){
      // this.policyService.getRule(1).subscribe(res =>
      //   this.rule = res)
    }else{
      this.rule = new Rule();
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    if( this.mode === ModeEnum.Add){
      this.ruleService.addRule(this.id, this.idPolicySet, this.rule).subscribe(res => {
        this.saveEvent.emit(res);
        this.closeEvent.emit();
      }, err => {
  
      });
    }
    this.rule = new Rule();
  }

}
/**
 * @Input() mode : ModeEnum;
  @Input() idPolicySet : string;
  @Input() id : string;
  @Output() saveEvent = new EventEmitter<PolicySet>();
  @Output() closeEvent = new EventEmitter<void>();
  form: FormGroup;
  private policy = new Policy();

  constructor(private userService: UserService, private tokenStorage: TokenStorageService,
    private formBuilder: FormBuilder, private policySetService : PolicySetService,  private policyService : PolicyService) { 
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

  ngOnChanges(changes:  import("@angular/core").SimpleChanges): void {
    if( this.mode === ModeEnum.Edit){
      this.policyService.getPolicy(this.id, this.idPolicySet).subscribe(res =>
        this.policy = res)
    }else{
      this.policy = new Policy();
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    if( this.mode === ModeEnum.Add){
      this.policyService.addPolicy(this.policy, this.idPolicySet).subscribe(res => {
        this.saveEvent.emit(res);
        this.closeEvent.emit();
      }, err => {
  
      });
    }else if ( this.mode === ModeEnum.Edit){
      this.policyService.updatePolicy(this.policy, this.idPolicySet).subscribe(res => {
        this.saveEvent.emit(res);
        this.closeEvent.emit();
      }, err => {
  
      });
    }
    this.policy = new Policy();
  }

}
 */
