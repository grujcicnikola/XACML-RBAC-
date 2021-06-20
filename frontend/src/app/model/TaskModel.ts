import { TypesEnum } from './TypesEnum';

export interface TaskModel {
    id?: string;
    type: TypesEnum;
    creator?: string;
    directParent?: TypesEnum;
    isParent: Boolean;
    ParentID: string;
  }