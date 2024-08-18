import { IUruu } from "@/interface/uruu";

export class Uruu implements IUruu {
  __v: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
  dugaar: string;
  davhar: number;
  ner: string;
  isActive: boolean;
  constructor({
    __v,
    _id,
    createdAt,
    updatedAt,
    dugaar,
    davhar,
    ner,
    isActive,
  }: IUruu) {
    this.__v = __v;
    this._id = _id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.dugaar = dugaar;
    this.davhar = davhar;
    this.ner = ner;
    this.isActive = isActive;
  }
  static fromJson(json: any) {
    return new Uruu(json);
  }
}
