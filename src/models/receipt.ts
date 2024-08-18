import { ICustomer } from "@/interface/customer";
import { IReceipt } from "@/interface/receipt";

// type ReceiptStatus = {
//   agvTruck: {
//     agvPlateNumber: string;
//     agvPlateNumber2: string;
//     agvRfid: string;
//     agvRfid2: string;
//     containerNumbers: string[];
//     containerNumbers2: string[];
//     containerRfids: string[];
//     containerRfids2: string[];
//     createdAt: string;
//     receiptNo: string;
//     sentTime: string;
//     status: string;
//     truckPlateNumber: string;
//     truckRfid: string;
//     type: string;
//     updatedAt: string;
//     parent: Receipt;
//     __v: string;
//     _id: string;
//   };
//   _id: string;
//   ladedArea: {
//     createdAt: string;
//     description: string;
//     name: string;
//     type: string;
//     updatedAt: string;
//     __v: number;
//     _id: string;
//   };
//   isClearance: boolean;
//   customer: ICustomer;
//   regCustomer: string;
//   contractNo: string;
//   receiptNo: string;
//   receiptDate: string;
//   supplierName: string;
//   buyerName: string;
//   productName: string;
//   transportName: string;
//   vehiclePlateNo: string;
//   unladedWeight: number;
//   ladedWeight: number;
//   totalWeight: number;
//   trailerPlateNumbers: string[];
//   vehicleRfidNumber: string;
//   classC: string;
//   unladadArea: {
//     createdAt: string;
//     description: string;
//     name: string;
//     type: string;
//     updatedAt: string;
//     __v: number;
//     _id: string;
//   };
//   driverName: string;
//   driverPhone: string;
//   driverPhoneSecond: string;
//   driverRegisterNo: string;
//   driverPdlNumber: string;
//   containerNumbers: string[];
//   sealNumbers: string[];
//   truckScales: string[];
//   receiptStatus: string;
//   receiptStatusDate: string;
//   createdAt: string;
//   updatedAt: string;
// };
export class Receipt implements IReceipt {
  _id: string;
  supplierName: string;
  driverPdlNumber: string;
  driverPhoneSecond: string;
  receiptNo: string;
  receiptDate: string;
  inDate: string;
  outDate: string;
  contractNo: string;
  customer: ICustomer;
  buyerName: string;
  transportName: string;
  productName: string;
  routeName: string;
  vehiclePlateNo: string;
  vehicleRfidNumber: string;
  trailerPlateNumbers: string[];
  containerNumbers: string[];
  sealNumbers: string[];
  ladedWeight: number;
  unladedWeight: number;
  totalWeight: number;
  driverRegisterNo: string;
  driverName: string;
  driverPhone: string;
  classC: string;
  unladadArea: any;
  ladedArea: any;
  isClearance: boolean;
  constructor({
    _id,
    supplierName,
    driverPdlNumber,
    driverPhoneSecond,
    receiptNo,
    receiptDate,
    inDate,
    outDate,
    contractNo,
    customer,
    buyerName,
    transportName,
    productName,
    routeName,
    vehiclePlateNo,
    vehicleRfidNumber,
    trailerPlateNumbers,
    containerNumbers,
    sealNumbers,
    ladedWeight,
    unladedWeight,
    totalWeight,
    driverRegisterNo,
    driverName,
    driverPhone,
    classC,
    unladadArea,
    ladedArea,
    isClearance,
  }: IReceipt) {
    this._id = _id;
    this.receiptNo = receiptNo;
    this.supplierName = supplierName;
    this.driverPdlNumber = driverPdlNumber;
    this.driverPhoneSecond = driverPhoneSecond;
    this.receiptDate = receiptDate;
    this.inDate = inDate;
    this.outDate = outDate;
    this.contractNo = contractNo;
    this.customer = customer;
    this.buyerName = buyerName;
    this.transportName = transportName;
    this.productName = productName;
    this.routeName = routeName;
    this.vehiclePlateNo = vehiclePlateNo;
    this.vehicleRfidNumber = vehicleRfidNumber;
    this.trailerPlateNumbers = trailerPlateNumbers;
    this.containerNumbers = containerNumbers;
    this.sealNumbers = sealNumbers;
    this.ladedWeight = ladedWeight;
    this.unladedWeight = unladedWeight;
    this.totalWeight = totalWeight;
    this.driverRegisterNo = driverRegisterNo;
    this.driverName = driverName;
    this.driverPhone = driverPhone;
    this.classC = classC;
    this.unladadArea = unladadArea;
    this.ladedArea = ladedArea;
    this.isClearance = isClearance;
  }
  static fromJson(json: any) {
    return new Receipt(json);
  }
}
