import { Component, OnInit, Output, Input, EventEmitter, SimpleChanges, OnChanges, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PolicySet } from '../model/PolicySet';
import { UserService } from '../service/userService/user.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { Policy } from '../model/Policy';
import { ModeEnum } from '../model/Mode';
import { PolicyService } from '../service/policyService/policy.service';
import { PolicySetService } from '../service/policySet/policy-set.service';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent implements OnInit, OnChanges {

  @Input() mode : ModeEnum;
  @Input() idPolicySet : string;
  @Input() id : string;
  @Input() random: number;
  @Output() saveEvent = new EventEmitter<PolicySet>();
  @Output() closeEvent = new EventEmitter<void>();
  form: FormGroup;
  private policy = new Policy();

  private ruleCombiningAlgIdValues: string[] = [
    '&rule-combine:permit-overrides',
    '&rule-combine:deny-overrides'];
  incorrectData: boolean;


  constructor(private userService: UserService, private tokenStorage: TokenStorageService,
    private formBuilder: FormBuilder, private policySetService : PolicySetService,  private policyService : PolicyService) { 
      this.form = this.formBuilder.group({
        policyId: ['', [Validators.minLength(3), Validators.required]],
        version: ['', Validators.required],
        ruleCombiningAlgId: ['', Validators.required],
      });
    }
   
  ngOnInit() {
  
  }

  ngOnChanges(changes:  import("@angular/core").SimpleChanges): void {
    if( this.mode === ModeEnum.Edit){
      this.form.get('policyId').disable();
      this.policyService.getPolicy(this.id, this.idPolicySet).subscribe(res =>
        this.policy = res)
    }else{
      this.policy = new Policy();
      this.form.get('policyId').enable();
    }
    this.incorrectData = false;
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    if( this.mode === ModeEnum.Add){
      this.policyService.addPolicy(this.policy, this.idPolicySet).subscribe(res => {
        if (res != null) {
        this.saveEvent.emit(res);
        this.closeEvent.emit();
        }else {
          this.incorrectData = true;
        }
      }, err => {
  
      });
    }else if ( this.mode === ModeEnum.Edit){
      this.policyService.updatePolicy(this.policy, this.idPolicySet).subscribe(res => {
        if (res != null) {
        this.saveEvent.emit(res);
        this.closeEvent.emit();
        }else{
          this.incorrectData = true;
        }
      }, err => {
  
      });
    }
    this.policy = new Policy();
  }

}
