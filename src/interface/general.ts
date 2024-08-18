import { IReference } from "./reference";

export type IPermission = {
  code: string;
  name: string;
  group: string;
  description: string;
  isFull: string;
  isRead: string;
  isWrite: string;
  isRemove: string;
};

export interface IGeneral {
  customerTypes: {
    code: string;
    name: string;
  }[];
  references: IReference[];
  uilchilgees: any[];
  referenceTypes: {
    [k: string]: {
      code: string;
      name: string;
    };
  };
  userRoles: {
    [k: string]: {
      code: string;
      name: string;
    };
  };
  permissions: IPermission[];
  permissionGroups: {
    code: string;
    name: string;
  }[];

  roles: any[];
  uruus: any[];
  tsags: any[];
  tasags: any[];
  ajiltans: any[];
}
