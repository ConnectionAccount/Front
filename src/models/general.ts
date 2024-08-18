import { IReference } from "@/interface/reference";
import { IUruu } from "@/interface/uruu";
import { ITasag } from "@/interface/tasag";
import { IAjiltan } from "@/interface/ajiltan";
import { IUilchilgee } from "@/interface/uilchilgee";
import { ITsagiinHuvaari } from "@/interface/tsagiin-huvaari";

export type IGeneral = General;

type IType = {
  code: string;
  name: string;
};

export class General implements IGeneral {
  userRole: IType[];
  userGender: IType[];
  references: IReference[];
  roles: any;
  uruus: IUruu;
  tasags: ITasag;
  ajiltans: IAjiltan;
  tsags: ITsagiinHuvaari;
  uilchilgees: IUilchilgee;
  constructor({
    userRole,
    references,
    userGender,

    roles,
    uruus,
    tsags,
    tasags,
    ajiltans,
    uilchilgees,
  }: IGeneral) {
    this.userRole = userRole;
    this.references = references;
    this.userGender = userGender;

    this.roles = roles;
    this.uruus = uruus;
    this.tsags = tsags;
    this.tasags = tasags;
    this.ajiltans = ajiltans;
    this.uilchilgees = uilchilgees;
  }
  static fromJson(json: IGeneral) {
    return json;
  }
}
