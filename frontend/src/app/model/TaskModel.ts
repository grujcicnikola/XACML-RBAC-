import { TypesEnum } from './TypesEnum';

export interface TaskModel {
    id?: Number;
    type: TypesEnum;
    creator?: string;
    created?: string;
    isParent: Boolean;
    ParentID: Number;
  }