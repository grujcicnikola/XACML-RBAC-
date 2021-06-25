import { Injectable } from '@angular/core';
import { TaskModel } from 'src/app/model/TaskModel';
import { TypesEnum } from 'src/app/model/TypesEnum';
import { PolicySet } from 'src/app/model/PolicySet';
import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';

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
    this.tasks.push(this.createTreeElement(policySet.id, policySet, TypesEnum.PolicySet, false, null, "Initial policySet"));
    policySet.policies.forEach(policy => {
      this.tasks.push(this.createTreeElement(policy.policyId, policySet, TypesEnum.Policy, policy.rules.length ? true : false, policySet.id, "Policy of PolicySet"));
      policy.rules.forEach(rule => {
        this.tasks.push(this.createTreeElement(rule.ruleId, policySet, TypesEnum.Rule, false, policy.policyId, "Rule of policy: "+ policy.policyId));
        if (rule.condition != null) {
          this.tasks.push(this.createTreeElement(rule.condition.applyWrapper.functionId, policySet, TypesEnum.Condition, false, rule.ruleId,"Condition for rule: "+rule.ruleId));
          rule.condition.applyWrapper.applies.forEach(apply => {
            this.tasks.push(this.createTreeElement(apply.attributeDesignator.attributeId, policySet, TypesEnum.Apply, false, rule.condition.applyWrapper.functionId, "Condition for rule: "+rule.ruleId));
          })
        }
        if (rule.target != null) {
          this.tasks.push(this.createTreeElement(rule.ruleId + ":target", policySet, TypesEnum.Target, true, rule.ruleId, "Target of Rule"));
          rule.target.anyOfs.forEach(anyOf => {
            this.tasks.push(this.createTreeElement(anyOf.allOf.match.attributeDesignator.attributeId, policySet, TypesEnum.AnyOf, false, rule.ruleId + ":target", "AnyOf Target inside Rule"));
          });
        }
      });
      if (policy.target != null) {
        this.tasks.push(this.createTreeElement(policy.policyId + ":target", policySet, TypesEnum.Target, true, policy.policyId, "Target of Policy"));
        policy.target.anyOfs.forEach(anyOf => {
          this.tasks.push(this.createTreeElement(anyOf.allOf.match.attributeDesignator.attributeId, policySet, TypesEnum.AnyOf, false, policy.policyId + ":target", "AnyOf of Target inside Policy"));
        });
      }
    });
    if (policySet.target != null) {
      this.tasks.push(this.createTreeElement(policySet.id + ":target", policySet, TypesEnum.Target, true, policySet.id, "Target of PolicySet"));
      policySet.target.anyOfs.forEach(anyOf => {
        this.tasks.push(this.createTreeElement(anyOf.allOf.match.attributeDesignator.attributeId, policySet, TypesEnum.AnyOf, false, policySet.id + ":target", "AnyOf of Target inside PolicySet"));
      });
    }
  }

  createTreeElement(id: string, element: any, type: TypesEnum, isParent: boolean, parentID: string, description: string): TaskModel {
    const task: TaskModel = {
      id: id,
      type: type,
      creator: element.creator,
      description: description,
      isParent: isParent,
      ParentID: parentID,
    }

    return task;
  }

}
