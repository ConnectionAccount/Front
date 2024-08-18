import { IUilchluulegch } from "@/interface/uilchluulegch";

export class Uilchluulegch implements IUilchluulegch {
  ovog: string;
  ner: string;
  registerDugaar: string;
  utas: string;
  utas2: string;
  email: string;
  emdNo: string;
  harshil: string;
  huis: string;
  geriinHayag: string;
  tsusniiBuleg: string;
  avatar: string;
  tursunOgnoo: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  _id: string;
  constructor({
    ovog,
    ner,
    registerDugaar,
    utas,
    utas2,
    email,
    emdNo,
    harshil,
    huis,
    geriinHayag,
    tsusniiBuleg,
    avatar,
    tursunOgnoo,
    isActive,
    createdAt,
    updatedAt,
    __v,
    _id,
  }: IUilchluulegch) {
    this.ovog = ovog;
    this.ner = ner;
    this.registerDugaar = registerDugaar;
    this.utas = utas;
    this.utas2 = utas2;
    this.email = email;
    this.emdNo = emdNo;
    this.harshil = harshil;
    this.huis = huis;
    this.geriinHayag = geriinHayag;
    this.tsusniiBuleg = tsusniiBuleg;
    this.avatar = avatar;
    this.tursunOgnoo = tursunOgnoo;
    this.isActive = isActive;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.__v = __v;
    this._id = _id;
  }
  static fromJson(json: any) {
    return new Uilchluulegch(json);
  }
}
