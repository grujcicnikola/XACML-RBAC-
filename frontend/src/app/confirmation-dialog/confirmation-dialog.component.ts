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

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit, OnChanges {

  @Input() selectedItemId: string;
  @Input() selectedItemType: TypesEnum;
  @Output() closeEvent = new EventEmitter<void>();

  constructor(private policySetService: PolicySetService, private store: Store<PolicySetState>) { }

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
          this.store.dispatch(PolicySetActions.BeginGetPolicySetAction({id: undefined}));
          this.closeEvent.emit();
        }, err => {

        });
        break;
    }
  }


}
