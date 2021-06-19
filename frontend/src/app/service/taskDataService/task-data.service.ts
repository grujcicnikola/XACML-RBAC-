import { Injectable } from '@angular/core';
import { TaskModel } from 'src/app/model/TaskModel';
import { TypesEnum } from 'src/app/model/TypesEnum';
import { PolicySet } from 'src/app/model/PolicySet';

@Injectable({
  providedIn: 'root'
})
export class TaskDataService {

  public tasks: TaskModel[] = [];

  constructor() { }

  transformDtoToTreeModel(policySet: PolicySet): TaskModel[] {
    this.tasks = []
    this.createPolicySet(policySet);
    console.log((this.tasks));
    return this.tasks;
  }

  createPolicySet(policySet: PolicySet) {
    this.tasks.push(this.createTreeElement(policySet.id, policySet, TypesEnum.PolicySet, false, null));
    policySet.policies.forEach(policy => {
      this.tasks.push(this.createTreeElement(policy.policyId, policySet, TypesEnum.Policy, policy.rules.length ? true : false, policySet.id));
      policy.rules.forEach(rule => {
        this.tasks.push(this.createTreeElement(rule.ruleId, policySet, TypesEnum.Rule, false, policy.policyId));
        if (rule.condition != null) {
          this.tasks.push(this.createTreeElement(rule.condition.applyWrapper.functionId, policySet, TypesEnum.Condition, false, rule.ruleId));
          rule.condition.applyWrapper.applies.forEach(apply => {
            this.tasks.push(this.createTreeElement(apply.functionId, policySet, TypesEnum.Apply, false, rule.condition.applyWrapper.functionId));
          })
        }
        if (rule.target != null) {
          this.tasks.push(this.createTreeElement(rule.ruleId + ":target", policySet, TypesEnum.Target, true, rule.ruleId));
          rule.target.anyOfs.forEach(anyOf => {
            this.tasks.push(this.createTreeElement(anyOf.allOf.match.attributeDesignator.attributeId, policySet, TypesEnum.AnyOf, false, rule.ruleId + ":target"));
          });
        }
      });
      if (policy.target != null) {
        this.tasks.push(this.createTreeElement(policy.policyId + ":target", policySet, TypesEnum.Target, true, policy.policyId));
        policy.target.anyOfs.forEach(anyOf => {
          this.tasks.push(this.createTreeElement(anyOf.allOf.match.attributeDesignator.attributeId, policySet, TypesEnum.AnyOf, false, policy.policyId + ":target"));
        });
      }
    });
    if (policySet.target != null) {
      this.tasks.push(this.createTreeElement(policySet.id + ":target", policySet, TypesEnum.Target, true, policySet.id));
      policySet.target.anyOfs.forEach(anyOf => {
        this.tasks.push(this.createTreeElement(anyOf.allOf.match.attributeDesignator.attributeId, policySet, TypesEnum.AnyOf, false, policySet.id + ":target"));
      });
    }
  }

  createTreeElement(id: string, element: any, type: TypesEnum, isParent: boolean, parentID: string): TaskModel {
    const task: TaskModel = {
      id: id,
      type: type,
      creator: element.creator,
      created: element.created,
      isParent: isParent,
      ParentID: parentID,
    }

    return task;
  }

}
