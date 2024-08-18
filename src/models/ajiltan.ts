import { IAjiltan } from "@/interface/ajiltan";

export class Ajiltan implements IAjiltan {
  __v: number;
  _id: string;
  ner: string;
  utas: string;
  ovog: string;
  email: string;
  roleId: string[];
  nuutsUg: string;
  nevtrehNer: string;
  albanTushaal: string;
  registerDugaar: string;
  isActive: string;
  createdAt: string;
  updatedAt: string;
  constructor({
    __v,
    _id,
    ner,
    utas,
    ovog,
    email,
    roleId,
    nuutsUg,
    nevtrehNer,
    albanTushaal,
    registerDugaar,
    isActive,
    createdAt,
    updatedAt,
  }: IAjiltan) {
    this.__v = __v;
    this._id = _id;
    this.ner = ner;
    this.utas = utas;
    this.ovog = ovog;
    this.email = email;
    this.roleId = roleId;
    this.nuutsUg = nuutsUg;
    this.nevtrehNer = nevtrehNer;
    this.albanTushaal = albanTushaal;
    this.registerDugaar = registerDugaar;
    this.isActive = isActive;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
  static fromJson(json: any) {
    return new Ajiltan(json);
  }
}
