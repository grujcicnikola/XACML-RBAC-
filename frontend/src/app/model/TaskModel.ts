import { TypesEnum } from './TypesEnum';

export interface TaskModel {
    id?: string;
    type: TypesEnum;
    creator?: string;
    description?: string;
    isParent: Boolean;
    ParentID: string;
  }