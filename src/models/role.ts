import { IRole } from "@/interface/role";

export class Role implements IRole {
  _id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  permissionId: {
    code: string;
    name: string;
    isFull: boolean;
    isRead: boolean;
    isWrite: boolean;
    isRemove: boolean;
    description: string;
  }[];
  constructor({
    _id,
    name,
    description,
    createdAt,
    updatedAt,
    permissionId,
  }: IRole) {
    this._id = _id;
    this.name = name;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.permissionId = permissionId;
  }

  static fromJson(json: any) {
    return new Role(json);
  }
}
