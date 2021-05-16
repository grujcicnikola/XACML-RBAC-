import { Injectable } from '@angular/core';
import { TaskModel } from 'src/app/model/TaskModel';
import { TypesEnum } from 'src/app/model/TypesEnum';

@Injectable({
  providedIn: 'root'
})
export class TaskDataService {
  constructor() {}

  createDb() {
    const tasks: TaskModel[] = [
      {
        id: 1,
        type: TypesEnum.PolicySet,
        creator: 'ngrujcic',
        created: new Date("02/23/2017"),
        isParent: true,
        ParentID: null,
      },
      {
        id: 2,
        type: TypesEnum.Policy,
        creator: 'ngrujcic',
        created: new Date("02/23/2017"),
        isParent: true,
        ParentID: 1
      },
      {
        id: 3,
        type: TypesEnum.Rule,
        creator: 'ngrujcic',
        created: new Date("02/23/2017"),
        isParent: true,
        ParentID: 2
      },
     
    ];
    return tasks;
  }
}
