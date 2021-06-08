import { TypesEnum } from './TypesEnum';

export interface TaskModel {
    id?: string;
    type: TypesEnum;
    creator?: string;
    created?: string;
    isParent: Boolean;
    ParentID: string;
  }