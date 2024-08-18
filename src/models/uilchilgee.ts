import { IUilchilgee } from "@/interface/uilchilgee";
import { IUser } from "@/interface/user";

export class Uilchilgee implements IUilchilgee {
  regUser: string | IUser;
  torol: string;
  ner: string;
  une: number;
  tasag: string[];
  uruuId: string[];
  ajiltanId: string[];
  tsagiinHuvaariId: string[];
  isActive: boolean;
  //!!!!
  kvot: any;
  //!!!!
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  _id: string;
  constructor({
    regUser,
    torol,
    ner,
    une,
    tasag,
    uruuId,
    ajiltanId,
    tsagiinHuvaariId,
    isActive,
    kvot,
    createdAt,
    updatedAt,
    __v,
    _id,
  }: IUilchilgee) {
    this.regUser = regUser;
    this.torol = torol;
    this.ner = ner;
    this.une = une;
    this.tasag = tasag;
    this.uruuId = uruuId;
    this.ajiltanId = ajiltanId;
    this.tsagiinHuvaariId = tsagiinHuvaariId;
    this.isActive = isActive;
    this.kvot = kvot;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.__v = __v;
    this._id = _id;
  }
  static fromJson(json: any) {
    return new Uilchilgee(json);
  }
}
