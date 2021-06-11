import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { LoginInfo } from '../auth/login';
import { AuthService } from '../auth/authService';
import { TokenStorageService } from '../auth/token-storage.service';
import { TypesEnum } from '../model/TypesEnum';
import { PolicySetService } from '../service/policySet/policy-set.service';
import { Store } from '@ngrx/store';
import PolicySetState from '../store/policySet.state';
import * as PolicySetActions from 'src/app/store/policySet.action';
import { PolicyService } from '../service/policyService/policy.service';
import { TargetService } from '../service/targetService/target.service';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit, OnChanges {

  @Input() selectedItemId: string;
  @Input() selectedItemType: TypesEnum;
  @Input() policySetId: string;
  @Input() parentId: string;
  @Input() selectedParentType: TypesEnum
  @Output() closeEvent = new EventEmitter<void>();

  constructor(private policySetService: PolicySetService,
    private targetService: TargetService, private policyService: PolicyService,
    private store: Store<PolicySetState>) { }

  ngOnInit() {
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    //this.choosenType = null;
    console.log(this.selectedItemId);
    console.log(this.selectedItemType);
  }

  onSubmit() {
    switch (this.selectedItemType) {
      case TypesEnum.PolicySet:
        this.policySetService.deletePolicySet(this.selectedItemId).subscribe(res => {
          console.log("DELETED");
          this.store.dispatch(PolicySetActions.BeginGetPolicySetAction({ id: undefined }));
          this.closeEvent.emit();
        }, err => {

        });
        break;
      case TypesEnum.Policy:
        this.policyService.deletePolicy(this.selectedItemId, this.policySetId).subscribe(res => {
          console.log("DELETED");
          this.store.dispatch(PolicySetActions.BeginGetPolicySetAction({ id: this.policySetId }));
          this.closeEvent.emit();
        }, err => {

        });
        break;
      case TypesEnum.Target:
        this.targetService.deleteTarget(this.parentId, this.selectedParentType, this.policySetId).subscribe(res => {
          console.log("DELETED");
          this.store.dispatch(PolicySetActions.BeginGetPolicySetAction({ id: this.policySetId }));
          this.closeEvent.emit();
        }, err => {

        });
        break;
      case TypesEnum.AnyOf:
        this.targetService.deleteAnyOf(this.selectedItemId, this.parentId, this.selectedParentType, this.policySetId).subscribe(res => {
          console.log("DELETED");
          this.store.dispatch(PolicySetActions.BeginGetPolicySetAction({ id: this.policySetId }));
          this.closeEvent.emit();
        }, err => {

        });
        break;
    }
  }


}
