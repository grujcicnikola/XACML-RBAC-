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
import { PolicySetService } from '../service/policySet/policy-set.service';

@Component({
  selector: 'app-policy-set',
  templateUrl: './policy-set.component.html',
  styleUrls: ['./policy-set.component.css']
})
export class PolicySetComponent implements OnInit, OnChanges {

  @Input() mode : ModeEnum;
  @Input() id : string;
  @Input() random: number;
  @Output() closeEvent = new EventEmitter<void>();
  @Output() saveEvent = new EventEmitter<PolicySet>();
  form: FormGroup;
  private policySet = new PolicySet();

  private policyCombiningAlgIdValues: string[] = [
    '&policy-combine:permit-overrides',
    '&policy-combine:deny-overrides'];
  private policySetIdReferenceValues: string[] =[];
  private policyIdReferenceValues: string[] =[];
  incorrectData: boolean;

  constructor(private formBuilder: FormBuilder, private policySetService : PolicySetService,
    private policyService : PolicyService) { 
      this.form = this.formBuilder.group({
        policySetId: ['', [Validators.minLength(3), Validators.required]],
        version: ['', Validators.required],
        policyCombiningAlgId: ['', [Validators.minLength(3), Validators.required]]
      });

      this.policySetService.getPolicySets().subscribe(res =>{
        if(res !=null){
         res.forEach(value =>{this.policySetIdReferenceValues.push(value.policySetId);}) 
        }
      })
      this.policyService.policies().subscribe(res =>{
        if(res !=null){
         res.forEach(value =>{this.policyIdReferenceValues.push(value);}) 
        }
      })
    }
   
  ngOnInit() {
  
  }

  ngOnChanges(changes: SimpleChanges): void {
    if( this.mode === ModeEnum.Edit && this.id){
      this.form.get('policySetId').disable();
      this.policySetService.getPolicySet(this.id).subscribe(res =>
       this.policySet = res)
    }else{
      this.policySet = new PolicySet();
      this.form.get('policySetId').enable();
    }
    this.incorrectData =false;
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {

    if( this.mode === ModeEnum.Add){
      this.policySetService.createPolicySet(this.policySet).subscribe(res => {
        if(res!= null){
        this.saveEvent.emit(res);
        this.closeEvent.emit();
        }else{
          this.incorrectData = true;
        }
      }, err => {
  
      });
    }else if ( this.mode === ModeEnum.Edit){
      this.policySetService.updatePolicySet(this.policySet).subscribe(res => {
        if(res!= null){
        this.saveEvent.emit(res);
        this.closeEvent.emit();
        }else {
          this.incorrectData = true;
        }
      }, err => {
  
      });
    }
  
  }

}
