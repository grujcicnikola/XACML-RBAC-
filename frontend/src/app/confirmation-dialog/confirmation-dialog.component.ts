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
import { RuleService } from '../service/ruleService/rule.service';
import { ConditionService } from '../service/conditionService/condition.service';
import { TaskDataService } from '../service/taskDataService/task-data.service';

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
    private ruleService: RuleService, private conditionService: ConditionService,
    private taskDataService: TaskDataService,
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
        // deleteAnyOf(id: string, selectedParentOfParentType: string, policySetId: string, policyId: string, ruleId: string): Observable<void> {
        //   return this.http.delete<void>(this.url + '/anyOf/' + id + '/' + selectedParentOfParentType + '/' + policySetId + '/' + policyId + '/' + ruleId);
        // }

        const target = this.taskDataService.tasks.find(({ id }) => id == this.parentId);
        const parentOfTarget = this.taskDataService.tasks.find(({ id }) => id == target.ParentID);
        if (parentOfTarget.type == TypesEnum.PolicySet) {
          this.targetService.deleteAnyOf(this.selectedItemId, parentOfTarget.type, this.policySetId, 'undefined', 'undefined').subscribe(res => {
            this.store.dispatch(PolicySetActions.BeginGetPolicySetAction({ id: this.policySetId }));
            this.closeEvent.emit();
          }, err => {

          });
        } else if (parentOfTarget.type == TypesEnum.Policy) {
          this.targetService.deleteAnyOf(this.selectedItemId, parentOfTarget.type, this.policySetId, parentOfTarget.id, 'undefined').subscribe(res => {
            this.store.dispatch(PolicySetActions.BeginGetPolicySetAction({ id: this.policySetId }));
            this.closeEvent.emit();
          }, err => {

          });
        } else if (parentOfTarget.type == TypesEnum.Rule) {
          this.targetService.deleteAnyOf(this.selectedItemId, parentOfTarget.type, this.policySetId, parentOfTarget.ParentID, parentOfTarget.id).subscribe(res => {
            this.store.dispatch(PolicySetActions.BeginGetPolicySetAction({ id: this.policySetId }));
            this.closeEvent.emit();
          }, err => {

          });
        }
        break;
      case TypesEnum.Rule:
        this.ruleService.deleteRule(this.selectedItemId, this.parentId, this.policySetId).subscribe(res => {
          console.log("DELETED");
          this.store.dispatch(PolicySetActions.BeginGetPolicySetAction({ id: this.policySetId }));
          this.closeEvent.emit();
        }, err => {

        });
        break;
      case TypesEnum.Condition:
        const parent = this.taskDataService.tasks.find(({ id }) => id == this.parentId);
        this.conditionService.deleteCondition(this.parentId, parent.ParentID, this.policySetId).subscribe(res => {
          console.log("DELETED");
          this.store.dispatch(PolicySetActions.BeginGetPolicySetAction({ id: this.policySetId }));
          this.closeEvent.emit();
        }, err => {

        });
        break;
      case TypesEnum.Apply:
        //applyId: string, ruleId: string, policyId: string, idPolicySet: string
        const parentRule = this.taskDataService.tasks.find(({ id }) => id == this.parentId);
        const parentPolicy = this.taskDataService.tasks.find(({ id }) => id == parentRule.ParentID);
        this.conditionService.deleteApply(this.selectedItemId, parentRule.ParentID, parentPolicy.ParentID, this.policySetId).subscribe(res => {
          console.log("DELETED");
          this.store.dispatch(PolicySetActions.BeginGetPolicySetAction({ id: this.policySetId }));
          this.closeEvent.emit();
        }, err => {

        });
        break;
    }
  }


}
