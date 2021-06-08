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
    this.createPolicySet(policySet);
    console.log("tu sam");
    console.log((this.tasks));
    return this.tasks;
  }

  // createChildren(task: any): TaskModel[] {

  // }

  createPolicySet(policySet: PolicySet) {
    this.tasks.push(this.createTreeElement(policySet, TypesEnum.PolicySet, false, null));
    policySet.policies.forEach(policy => {
      this.tasks.push(this.createTreeElement(policy, TypesEnum.Policy, policy.rules.length ? true : false, policySet.id));
      policy.rules.forEach(rule => {
        this.tasks.push(this.createTreeElement(rule, TypesEnum.Rule, false, policy.id));
      });
    });
  }

  createTreeElement(element: any, type: TypesEnum, isParent: boolean, parentID: string): TaskModel {
    const task: TaskModel = {
      id: element.id,
      type: type,
      creator: element.creator,
      created: element.created,
      isParent: isParent,
      ParentID: parentID,
    }

    return task;
  }
  
}
