import { ICustomer } from "@/interface/customer";

export type ILogo = {
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
export class Customer implements ICustomer {
  _id: string;
  orgType: string;
  regUserId: string;
  regUserName: string;
  type: string;
  name: string;
  logo: ILogo;
  registerNo: string;
  phone: string;
  phoneSecond: string;
  email: string;
  address: string;
  stateRegNo: string;
  stateRegDate: Date;
  customerStatus: string;
  customerStatusDate: Date;
  signature: string;
  signatureStatus: string;
  signatureStatusDate: Date;
  receiptNoPrefix: string;

  constructor({
    _id,
    orgType,
    regUserId,
    regUserName,
    type,
    name,
    logo,
    registerNo,
    phone,
    phoneSecond,
    email,
    address,
    stateRegNo,
    stateRegDate,
    customerStatus,
    customerStatusDate,
    signature,
    signatureStatus,
    signatureStatusDate,
    receiptNoPrefix,
  }: ICustomer) {
    this._id = _id;
    this.orgType = orgType;
    this.regUserId = regUserId;
    this.regUserName = regUserName;
    this.type = type;
    this.name = name;
    this.logo = logo;
    this.registerNo = registerNo;
    this.phone = phone;
    this.phoneSecond = phoneSecond;
    this.email = email;
    this.address = address;
    this.stateRegNo = stateRegNo;
    this.stateRegDate = stateRegDate;
    this.customerStatus = customerStatus;
    this.customerStatusDate = customerStatusDate;
    this.signature = signature;
    this.signatureStatus = signatureStatus;
    this.signatureStatusDate = signatureStatusDate;
    this.receiptNoPrefix = receiptNoPrefix;
  }

  static fromJson(json: any) {
    return new Customer(json);
  }
}
