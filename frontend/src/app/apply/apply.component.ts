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
  @Input() random: number;
  @Output() saveEvent = new EventEmitter<PolicySet>();
  @Output() closeEvent = new EventEmitter<void>();

  form: FormGroup;
  private apply = new Apply();
  private attributeDesignator = new AttributeDesignator();
  private attributeValue = new AttributeValue();

  private functionIdValues: string[] = [
    '&functinon:anyURI-is-in',
    '&function:string-equal',
    '&function:anyURI-equal',
    '&function:string-regexp-match',
    '&function:xpath-node-match',
    '&function:time-greater-than',
    '&function:time-less-than',
    '&function:rfc822Name-match'];

  private dataTypeValues: string[] = [
    '&xml:string',
    '&xml:anyURI',
    '&xml:rfc822Name',
    '&xml:xpathExpression',
    '&xml:date',
    '&xml:xpathExpression',
    '&xml:yearMonthDuration'
  ]

  private categoryTypeValues: string[] = [
    '&category:subject',
    '&category:action',
    '&category:resource'
  ]

  private attributeIdValues: string[] = [
    '&resource:resource-id',
    '&subject:subject-id',
    '&action:action-id',
    '&role'
  ]
  incorrectData: boolean;


  constructor(private conditionService: ConditionService,
    private formBuilder: FormBuilder, private targetService: TargetService,
    private taskDataService: TaskDataService) {

    this.form = this.formBuilder.group({
      functionId: ['', Validators.required],
      dataType: ['', Validators.required],
      dataTypeDesignator: ['', Validators.required],
      value: ['', [Validators.minLength(3), Validators.required]],
      category: ['',  Validators.required],
      attributeId: ['',  Validators.required],
    });
  }

  ngOnInit() {
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if (this.mode === ModeEnum.Edit) {
      this.form.get('attributeId').disable();
      const parentRule = this.taskDataService.tasks.find(({ id }) => id == this.parentId);
      const parentPolicy = this.taskDataService.tasks.find(({ id }) => id == parentRule.ParentID);
      this.conditionService.getApply(this.id, parentRule.ParentID, parentPolicy.ParentID, this.idPolicySet).subscribe(res => {
        if (res != null) {
          this.apply = res;
          this.attributeDesignator = this.apply.attributeDesignator;
          this.attributeValue = this.apply.attributeValue;
        }
      })
    } else {
      this.apply = new Apply();
      this.attributeDesignator = new AttributeDesignator();
      this.attributeValue = new AttributeValue();
      this.form.get('attributeId').enable();
    }
    this.incorrectData = false;
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.apply.attributeDesignator = this.attributeDesignator;
    this.apply.attributeValue = this.attributeValue;
    if (this.mode === ModeEnum.Add) {
      const parent = this.taskDataService.tasks.find(({ id }) => id == this.parentId);
      this.conditionService.addApply(this.parentId, parent.ParentID, this.idPolicySet, this.apply).subscribe(res => {
        if (res != null) {
          this.saveEvent.emit(res);
          this.closeEvent.emit();
        } else {
          this.incorrectData = true;
        }
      }, err => {
  
      });
    } else if (this.mode === ModeEnum.Edit) {
      const parentRule = this.taskDataService.tasks.find(({ id }) => id == this.parentId);
      const parentPolicy = this.taskDataService.tasks.find(({ id }) => id == parentRule.ParentID);
      this.conditionService.updateApply(parentRule.ParentID, parentPolicy.ParentID, this.idPolicySet, this.apply).subscribe(res => {
        if (res != null) {
          this.saveEvent.emit(res);
          this.closeEvent.emit();
        } else {
          this.incorrectData = true;
        }
      })
    }
    this.apply = new Apply();
    this.attributeDesignator = new AttributeDesignator();
    this.attributeValue = new AttributeValue();
  }

}
