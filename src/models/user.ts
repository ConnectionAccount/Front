import { ICustomer } from "@/interface/customer";
import { IUser } from "@/interface/user";

export class User implements IUser {
  isActive: boolean;
  passwordExpired: boolean;
  passwordNeedChange: boolean;
  userSuspended: boolean;
  userTerminated: boolean;
  createdAt: string;
  email: string;
  sessionId: string;
  updatedAt: string;
  userStatus: string;
  userStatusDate: string;
  username: string;
  address: string;
  customer: ICustomer;
  firstname: string;
  gender: string;
  lastname: string;
  phone: string;
  phoneSecond: string;
  registerNo: string;
  userRole: {
    createdAt: string;
    description: string;
    name: string;
    permissions: string[];
    updatedAt: string;
    _id: string;
  };
  _id: string;
  expiryHours: number;
  __v: number;
  logo: {
    blurData: string;
    blurhash: string;
    createdAt: string;
    height: number;
    lg: string;
    md: string;
    rotation: string;
    sm: string;
    updatedAt: string;
    url: string;
    width: number;
    xl: string;
    xs: string;
    __v: number;
    _id: string;
  };
  constructor({
    logo,
    isActive,
    passwordExpired,
    passwordNeedChange,
    userSuspended,
    userTerminated,
    createdAt,
    expiryHours,
    email,
    sessionId,
    updatedAt,
    userStatus,
    userStatusDate,
    username,
    _id,
    __v,
    address,
    customer,
    firstname,
    gender,
    lastname,
    phone,
    phoneSecond,
    registerNo,
    userRole,
  }: IUser) {
    this.logo = logo;
    this.isActive = isActive;
    this.passwordExpired = passwordExpired;
    this.passwordNeedChange = passwordNeedChange;
    this.userSuspended = userSuspended;
    this.userTerminated = userTerminated;
    this.createdAt = createdAt;
    this.expiryHours = expiryHours;
    this.email = email;
    this.sessionId = sessionId;
    this.updatedAt = updatedAt;
    this.userStatus = userStatus;
    this.userStatusDate = userStatusDate;
    this.username = username;
    this._id = _id;
    this.__v = __v;
    this.address = address;
    this.customer = customer;
    this.firstname = firstname;
    this.gender = gender;
    this.lastname = lastname;
    this.phone = phone;
    this.phoneSecond = phoneSecond;
    this.registerNo = registerNo;
    this.userRole = userRole;
  }

  static fromJson(json: any) {
    return new User(json);
  }
}
