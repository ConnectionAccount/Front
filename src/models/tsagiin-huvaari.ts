import { ITsagiinHuvaari } from "@/interface/tsagiin-huvaari";

export class TsagiinHuvaari implements ITsagiinHuvaari {
  __v: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
  odorSongoh: string;
  tsagSongoh: string;
  tsainiiTsagEhleh: string;
  tsainiiTsagDuusah: string;
  ehlehTsag: string;
  duusahTsag: string;
  ner: string;
  isActive: boolean;
  constructor({
    __v,
    _id,
    createdAt,
    updatedAt,
    odorSongoh,
    tsagSongoh,
    tsainiiTsagEhleh,
    tsainiiTsagDuusah,
    ehlehTsag,
    duusahTsag,
    ner,
    isActive,
  }: ITsagiinHuvaari) {
    this.__v = __v;
    this._id = _id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.odorSongoh = odorSongoh;
    this.tsagSongoh = tsagSongoh;
    this.tsainiiTsagEhleh = tsainiiTsagEhleh;
    this.tsainiiTsagDuusah = tsainiiTsagDuusah;
    this.ehlehTsag = ehlehTsag;
    this.duusahTsag = duusahTsag;
    this.ner = ner;
    this.isActive = isActive;
  }

  static fromJson(json: any) {
    return new TsagiinHuvaari(json);
  }
}
