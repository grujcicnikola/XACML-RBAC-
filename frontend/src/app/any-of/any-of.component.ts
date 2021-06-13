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
  @Output() saveEvent = new EventEmitter<PolicySet>();
  @Output() closeEvent = new EventEmitter<void>();

  form: FormGroup;
  private anyOf = new AnyOf();
  private match = new Match();
  private attributeDesignator = new AttributeDesignator();
  private attributeValue = new AttributeValue();

  constructor(private userService: UserService, private tokenStorage: TokenStorageService,
    private taskDataService: TaskDataService,
    private formBuilder: FormBuilder, private targetService: TargetService, private policySetService: PolicySetService, private policyService: PolicyService) {

    this.form = this.formBuilder.group({
      matchId: ['', [Validators.minLength(3), Validators.required]],
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
      //	String id, String selectedParentOfParentType, String policySetId, String policyId,
      //	 String ruleId
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
      this.anyOf = new AnyOf();
    }
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
          this.saveEvent.emit(res);
          this.closeEvent.emit();
        }, err => {

        });
      } else if (this.selectedParentType == TypesEnum.Policy) {
        this.targetService.addAnyOf(this.selectedParentType, this.idPolicySet, this.parentId, 'undefined', this.anyOf).subscribe(res => {
          this.saveEvent.emit(res);
          this.closeEvent.emit();
        }, err => {

        });
      } else if (this.selectedParentType == TypesEnum.Rule) {
        const parentPolicy = this.taskDataService.tasks.find(({ id }) => id == this.parentId);
        this.targetService.addAnyOf(this.selectedParentType, this.idPolicySet, parentPolicy.ParentID, this.parentId, this.anyOf).subscribe(res => {
          this.saveEvent.emit(res);
          this.closeEvent.emit();
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
          this.saveEvent.emit(res);
          this.closeEvent.emit();
        }, err => {

        });
      } else if (parentOfTarget.type == TypesEnum.Policy) {
        this.targetService.updateAnyOf(this.id, parentOfTarget.type, this.idPolicySet, parentOfTarget.id, 'undefined', this.anyOf).subscribe(res => {
          this.saveEvent.emit(res);
          this.closeEvent.emit();
        }, err => {

        });
      } else if (parentOfTarget.type == TypesEnum.Rule) {
        this.targetService.updateAnyOf(this.id, parentOfTarget.type, this.idPolicySet, parentOfTarget.ParentID, parentOfTarget.id, this.anyOf).subscribe(res => {
          this.saveEvent.emit(res);
          this.closeEvent.emit();
        }, err => {

        });
      }
    }
    this.anyOf = new AnyOf();
    this.match = new Match();
    this.attributeDesignator = new AttributeDesignator();
    this.attributeValue = new AttributeValue();
  }

}
