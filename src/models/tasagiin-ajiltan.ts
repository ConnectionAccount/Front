import { ITasagiinAjiltan } from "@/interface/tasagiin-ajiltan";

export class TasagiinAjiltan implements ITasagiinAjiltan {
  __v: number;
  _id: string;
  tasagiinId: string;
  ahiltanId: string;
  isActive: string;
  createdAt: string;
  updatedAt: string;
  constructor({
    __v,
    _id,
    tasagiinId,
    ahiltanId,
    isActive,
    createdAt,
    updatedAt,
  }: ITasagiinAjiltan) {
    this.__v = __v;
    this._id = _id;
    this.tasagiinId = tasagiinId;
    this.ahiltanId = ahiltanId;
    this.isActive = isActive;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
  static fromJson(json: any) {
    return new TasagiinAjiltan(json);
  }
}
