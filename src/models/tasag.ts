import { ITasag } from "@/interface/tasag";

export class Tasag implements ITasag {
  ajiltan: string[];
  ner: string;
  torol: string;
  bairshil: string;
  uruuniiDugaar: string;
  ehlehTsag: string;
  duusahTsag: string;
  duusahTsainiiTsag: string;
  ehlehTsainiiTsag: string;
  isActive: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  _id: string;
  constructor({
    ajiltan,
    ner,
    torol,
    bairshil,
    uruuniiDugaar,
    ehlehTsag,
    duusahTsag,
    duusahTsainiiTsag,
    ehlehTsainiiTsag,
    isActive,
    createdAt,
    updatedAt,
    __v,
    _id,
  }: ITasag) {
    this.ajiltan = ajiltan;
    this.ner = ner;
    this.torol = torol;
    this.bairshil = bairshil;
    this.uruuniiDugaar = uruuniiDugaar;
    this.ehlehTsag = ehlehTsag;
    this.duusahTsag = duusahTsag;
    this.duusahTsainiiTsag = duusahTsainiiTsag;
    this.ehlehTsainiiTsag = ehlehTsainiiTsag;
    this.isActive = isActive;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.__v = __v;
    this._id = _id;
  }
  static fromJson(json: any) {
    return new Tasag(json);
  }
}
