import { TypesEnum } from './TypesEnum';

export interface TaskModel {
    id?: Number;
    created?: Date;
    type: TypesEnum;
    creator?: string;
    isParent: Boolean;
    ParentID: Number;
  }