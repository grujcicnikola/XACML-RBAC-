import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { ModeEnum } from '../model/Mode';
import { PolicySet } from '../model/PolicySet';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Policy } from '../model/Policy';
import { UserService } from '../service/userService/user.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { PolicySetService } from '../service/policySet/policy-set.service';
import { PolicyService } from '../service/policyService/policy.service';
import { Condition } from '../model/Condition';
import { ApplyWrapper } from '../model/ApplyWrapper';
import { ConditionService } from '../service/conditionService/condition.service';
import { TaskDataService } from '../service/taskDataService/task-data.service';

@Component({
  selector: 'app-condition',
  templateUrl: './condition.component.html',
  styleUrls: ['./condition.component.css']
})
export class ConditionComponent implements OnInit, OnChanges {

  @Input() mode: ModeEnum;
  @Input() idPolicySet: string;
  @Input() id: string;
  @Input() parentId: string;
  @Output() saveEvent = new EventEmitter<PolicySet>();
  @Output() closeEvent = new EventEmitter<void>();
  form: FormGroup;
  private condition = new Condition();
  private applyWrapper = new ApplyWrapper();

  constructor(private conditionService: ConditionService, private taskDataService: TaskDataService,
    private tokenStorage: TokenStorageService,
    private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      functionId: ['', [Validators.minLength(3), Validators.required]]
    });
  }

  ngOnInit() {

  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if (this.mode === ModeEnum.Edit) {
      const parent = this.taskDataService.tasks.find(({ id }) => id == this.parentId);
      this.conditionService.getCondition(this.parentId, parent.ParentID, this.idPolicySet).subscribe(res => {
        if (res != null) {
          this.applyWrapper = res.applyWrapper
        }
      })
    } else {
      this.applyWrapper = new ApplyWrapper();
      this.condition = new Condition();
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.condition.applyWrapper = this.applyWrapper;
    //if (this.mode === ModeEnum.Add) {
    this.conditionService.addCondition(this.id, this.parentId, this.idPolicySet, this.condition).subscribe(res => {
      this.saveEvent.emit(res);
      this.closeEvent.emit();
    }, err => {

    });
    // } else if (this.mode === ModeEnum.Edit) {
    //   this.conditionService.updateCondition(this.id, this.parentId, this.idPolicySet, this.condition).subscribe(res => {
    //     this.saveEvent.emit(res);
    //     this.closeEvent.emit();
    //   }, err => {

    //   });
    // }
    this.applyWrapper = new ApplyWrapper();
    this.condition = new Condition();
  }

}