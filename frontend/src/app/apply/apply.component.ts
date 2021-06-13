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
import { Apply } from '../model/Apply';
import { ConditionService } from '../service/conditionService/condition.service';
import { TaskDataService } from '../service/taskDataService/task-data.service';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.css']
})
export class ApplyComponent implements OnInit, OnChanges {

  @Input() mode: ModeEnum;
  @Input() idPolicySet: string;
  @Input() id: string;
  @Input() selectedParentType: string;
  @Input() parentId: string;
  @Output() saveEvent = new EventEmitter<PolicySet>();
  @Output() closeEvent = new EventEmitter<void>();

  form: FormGroup;
  private apply = new Apply();
  private attributeDesignator = new AttributeDesignator();
  private attributeValue = new AttributeValue();

  constructor(private conditionService: ConditionService,
    private formBuilder: FormBuilder, private targetService: TargetService,
    private taskDataService: TaskDataService) {

    this.form = this.formBuilder.group({
      functionId: ['', [Validators.minLength(3), Validators.required]],
      dataType: ['', [Validators.minLength(3), Validators.required]],
      dataTypeDesignator: ['', [Validators.minLength(3), Validators.required]],
      value: ['', [Validators.minLength(3), Validators.required]],
      category: ['', [Validators.minLength(3), Validators.required]],
      attributeId: ['', [Validators.minLength(3), Validators.required]],
    });
  }

  ngOnInit() {
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if (this.mode === ModeEnum.Edit) {
      this.targetService.getAnyOf(this.id, this.parentId, this.selectedParentType, this.idPolicySet).subscribe(res => {
        // if (res != null) {
        //   this.anyOf = res;
        //   this.match = this.anyOf.allOf.match;
        //   this.attributeDesignator = this.anyOf.allOf.match.attributeDesignator;
        //   this.attributeValue = this.anyOf.allOf.match.attributeValue;
        // }
      })
    } else {
      this.apply = new Apply();
      this.attributeDesignator = new AttributeDesignator();
      this.attributeValue = new AttributeValue();
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.apply.attributeDesignator = this.attributeDesignator;
    this.apply.attributeValue = this.attributeValue;
    if (this.mode === ModeEnum.Add) {
      const parent = this.taskDataService.tasks.find(({ id }) => id == this.parentId);
      this.conditionService.addApply(this.parentId, parent.ParentID, this.idPolicySet, this.apply).subscribe(res => {
        this.saveEvent.emit(res);
        this.closeEvent.emit();
      }, err => {
  
      });
    } else if (this.mode === ModeEnum.Edit) {
      // this.targetService.updateAnyOf(this.id, this.parentId, this.selectedParentType, this.idPolicySet, this.anyOf).subscribe(res => {
      //   this.saveEvent.emit(res);
      //   this.closeEvent.emit();
      // }, err => {

      // });
    }
    this.apply = new Apply();
    this.attributeDesignator = new AttributeDesignator();
    this.attributeValue = new AttributeValue();
  }

}
