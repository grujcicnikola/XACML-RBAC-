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
import { TypesEnum } from '../model/TypesEnum';
import { TaskDataService } from '../service/taskDataService/task-data.service';

@Component({
  selector: 'app-any-of',
  templateUrl: './any-of.component.html',
  styleUrls: ['./any-of.component.css']
})
export class AnyOfComponent implements OnInit, OnChanges {

  @Input() mode: ModeEnum;
  @Input() idPolicySet: string;
  @Input() id: string;
  @Input() selectedParentType: string;
  @Input() parentId: string;
  @Input() random: number;
  @Output() saveEvent = new EventEmitter<PolicySet>();
  @Output() closeEvent = new EventEmitter<void>();

  form: FormGroup;
  private anyOf = new AnyOf();
  private match = new Match();
  private attributeDesignator = new AttributeDesignator();
  private attributeValue = new AttributeValue();
  private incorrectData = false;

  private matchIdValues: string[] = [
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

  constructor(private userService: UserService, private tokenStorage: TokenStorageService,
    private taskDataService: TaskDataService,
    private formBuilder: FormBuilder, private targetService: TargetService, private policySetService: PolicySetService, private policyService: PolicyService) {

    this.form = this.formBuilder.group({
      matchId: ['', Validators.required],
      dataType: ['', Validators.required],
      dataTypeDesignator: ['', Validators.required],
      value: ['', [Validators.minLength(3), Validators.required]],
      category: ['', Validators.required],
      attributeId: ['', Validators.required]
    });

    // this.form.get("matchId").valueChanges.subscribe(selectedValue  => {
    //   console.log(selectedValue)
    // })


  }

  ngOnInit() {
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    console.log(this.random)
    if (this.mode === ModeEnum.Edit) {
      //	String id, String selectedParentOfParentType, String policySetId, String policyId,
      //	 String ruleId
      this.form.get('attributeId').disable();
      const target = this.taskDataService.tasks.find(({ id }) => id == this.parentId);
      const parentOfTarget = this.taskDataService.tasks.find(({ id }) => id == target.ParentID);
      if (parentOfTarget.type == TypesEnum.PolicySet) {
        this.targetService.getAnyOf(this.id, parentOfTarget.type, this.idPolicySet, 'undefined', 'undefined').subscribe(res => {
          if (res != null) {
            this.anyOf = res;
            this.match = this.anyOf.allOf.match;
            this.attributeDesignator = this.anyOf.allOf.match.attributeDesignator;
            this.attributeValue = this.anyOf.allOf.match.attributeValue;
          }
        })
      } else if (parentOfTarget.type == TypesEnum.Policy) {
        this.targetService.getAnyOf(this.id, parentOfTarget.type, this.idPolicySet, parentOfTarget.id, 'undefined').subscribe(res => {
          if (res != null) {
            this.anyOf = res;
            this.match = this.anyOf.allOf.match;
            this.attributeDesignator = this.anyOf.allOf.match.attributeDesignator;
            this.attributeValue = this.anyOf.allOf.match.attributeValue;
          }
        })
      } else if (parentOfTarget.type == TypesEnum.Rule) {
        this.targetService.getAnyOf(this.id, parentOfTarget.type, this.idPolicySet, parentOfTarget.ParentID, parentOfTarget.id).subscribe(res => {
          if (res != null) {
            this.anyOf = res;
            this.match = this.anyOf.allOf.match;
            this.attributeDesignator = this.anyOf.allOf.match.attributeDesignator;
            this.attributeValue = this.anyOf.allOf.match.attributeValue;
          }
        })
      }
    } else {
      this.form.get('attributeId').enable();
      this.anyOf = new AnyOf();
    }
    this.incorrectData = false;
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.anyOf.allOf = new AllOf();//TODO change when there are mulitple
    this.match.attributeDesignator = this.attributeDesignator;
    this.match.attributeValue = this.attributeValue;
    this.anyOf.allOf.match = this.match;
    if (this.mode === ModeEnum.Add) {
      // selectedParentType, String policySetId, String policyId,
      // String ruleId, AnyOfDto anyOfDto
      if (this.selectedParentType == TypesEnum.PolicySet) {
        this.targetService.addAnyOf(this.selectedParentType, this.parentId, 'undefined', 'undefined', this.anyOf).subscribe(res => {
          if (res != null) {
            this.saveEvent.emit(res);
            this.closeEvent.emit();
          } else {
            this.incorrectData = true;
          }
        }, err => {

        });
      } else if (this.selectedParentType == TypesEnum.Policy) {
        this.targetService.addAnyOf(this.selectedParentType, this.idPolicySet, this.parentId, 'undefined', this.anyOf).subscribe(res => {
          if (res != null) {
            this.saveEvent.emit(res);
            this.closeEvent.emit();
          } else {
            this.incorrectData = true;
          }
        }, err => {

        });
      } else if (this.selectedParentType == TypesEnum.Rule) {
        const parentPolicy = this.taskDataService.tasks.find(({ id }) => id == this.parentId);
        this.targetService.addAnyOf(this.selectedParentType, this.idPolicySet, parentPolicy.ParentID, this.parentId, this.anyOf).subscribe(res => {
          if (res != null) {
            this.saveEvent.emit(res);
            this.closeEvent.emit();
          } else {
            this.incorrectData = true;
          }
        }, err => {

        });
      }
    } else if (this.mode === ModeEnum.Edit) {
      // String id, String selectedParentOfParentType, String policySetId, String policyId,
      //	String ruleId, AnyOfDto anyOfDto
      const target = this.taskDataService.tasks.find(({ id }) => id == this.parentId);
      const parentOfTarget = this.taskDataService.tasks.find(({ id }) => id == target.ParentID);
      if (parentOfTarget.type == TypesEnum.PolicySet) {
        this.targetService.updateAnyOf(this.id, parentOfTarget.type, this.idPolicySet, 'undefined', 'undefined', this.anyOf).subscribe(res => {
          if (res != null) {
            this.saveEvent.emit(res);
            this.closeEvent.emit();
          } else {
            this.incorrectData = true;
          }
        }, err => {

        });
      } else if (parentOfTarget.type == TypesEnum.Policy) {
        this.targetService.updateAnyOf(this.id, parentOfTarget.type, this.idPolicySet, parentOfTarget.id, 'undefined', this.anyOf).subscribe(res => {
          if (res != null) {
            this.saveEvent.emit(res);
            this.closeEvent.emit();
          } else {
            this.incorrectData = true;
          }
        }, err => {

        });
      } else if (parentOfTarget.type == TypesEnum.Rule) {
        this.targetService.updateAnyOf(this.id, parentOfTarget.type, this.idPolicySet, parentOfTarget.ParentID, parentOfTarget.id, this.anyOf).subscribe(res => {
          if (res != null) {
            this.saveEvent.emit(res);
            this.closeEvent.emit();
          } else {
            this.incorrectData = true;
          }
        }, err => {

        });
      }
    }
    this.anyOf = new AnyOf();
    this.match = new Match();
    this.attributeDesignator = new AttributeDesignator();
    this.attributeValue = new AttributeValue();
    
  }


  // onChange(newValue) { (ngModelChange)="onChange($event)
  //   console.log(newValue);
  // }

  onCancel() {
    this.anyOf = new AnyOf();
    this.match = new Match();
    this.attributeDesignator = new AttributeDesignator();
    this.attributeValue = new AttributeValue();
    this.incorrectData = false;
    this.closeEvent.emit();
  }
}
