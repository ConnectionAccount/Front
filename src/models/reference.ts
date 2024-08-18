import { IReference } from "@/interface/reference";

export class Reference implements IReference {
  parentId: string;
  type: string;
  name: string;
  description: string;
  _id: string;
  constructor({ parentId, type, name, description, _id }: IReference) {
    this.parentId = parentId;
    this.type = type;
    this.name = name;
    this.description = description;
    this._id = _id;
  }
}
