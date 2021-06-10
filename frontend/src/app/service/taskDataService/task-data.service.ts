import { Injectable } from '@angular/core';
import { TaskModel } from 'src/app/model/TaskModel';
import { TypesEnum } from 'src/app/model/TypesEnum';
import { PolicySet } from 'src/app/model/PolicySet';

@Injectable({
  providedIn: 'root'
})
export class TaskDataService {

  tasks: TaskModel[] = [];

  constructor() { }

  transformDtoToTreeModel(policySet: PolicySet): TaskModel[] {
    this.tasks = []
    this.createPolicySet(policySet);
    console.log((this.tasks));
    return this.tasks;
  }

  // createChildren(task: any): TaskModel[] {

  // }

  createPolicySet(policySet: PolicySet) {
    this.tasks.push(this.createTreeElement(policySet.id, policySet, TypesEnum.PolicySet, false, null));
    policySet.policies.forEach(policy => {
      this.tasks.push(this.createTreeElement(policy.policyId, policy, TypesEnum.Policy, policy.rules.length ? true : false, policySet.id));
      policy.rules.forEach(rule => {
        this.tasks.push(this.createTreeElement(rule.ruleId, rule, TypesEnum.Rule, false, policy.id));
      });
    });
    if(policySet.target!=null){
      this.tasks.push(this.createTreeElement("1", policySet, TypesEnum.Target, true, policySet.id));
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
