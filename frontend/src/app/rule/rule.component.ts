import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges, OnChanges } from '@angular/core';
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
export class RuleComponent implements OnInit, OnChanges {

  @Input() mode : ModeEnum;
  @Input() id: string;
  @Input() random: number;
  @Input() parentId: string;
  @Input() idPolicySet : string;
  @Output() saveEvent = new EventEmitter<PolicySet>();
  @Output() closeEvent = new EventEmitter<void>();
  form: FormGroup;
  private rule = new Rule();
  private incorrectData = false;

  private effectValues: string[] = [
    'Permit',
    'Deny'];

  constructor(
    private formBuilder: FormBuilder,  private ruleService : RuleService) { 
      this.form = this.formBuilder.group({
        ruleId: ['', [Validators.minLength(3), Validators.required]],
        effect: ['', Validators.required]
      });
    }
  ngOnInit() {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if( this.mode === ModeEnum.Edit){
      this.form.get('ruleId').disable();
      this.ruleService.getRule(this.id, this.parentId, this.idPolicySet).subscribe(res =>
        this.rule = res)
    }else{
      this.rule = new Rule();
      this.form.get('ruleId').enable();
    }
    this.incorrectData = false;
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    if( this.mode === ModeEnum.Add){
      this.ruleService.addRule(this.id, this.idPolicySet, this.rule).subscribe(res => {
        if (res != null) {
          this.saveEvent.emit(res);
          this.closeEvent.emit();
        } else {
          this.incorrectData = true;
        }
      }, err => {
  
      });
    }
    else if( this.mode === ModeEnum.Edit){
      this.ruleService.updateRule(this.id, this.parentId, this.idPolicySet, this.rule).subscribe(res => {
        if (res != null) {
          this.saveEvent.emit(res);
          this.closeEvent.emit();
        } else {
          this.incorrectData = true;
        }
      }, err => {
  
      });
    }
    this.rule = new Rule();
  }

}
