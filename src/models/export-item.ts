import { ICustomer } from "@/interface/customer";
import { IExportItem } from "@/interface/export-item";
import { IReceipt } from "@/interface/receipt";

export class ExportItem implements IExportItem {
  isClearance: boolean;
  code: string;
  createdAt: string;
  customer: ICustomer;
  exportItemStatus: string;
  exportItemStatusDate: string;
  processChangeAgv: {
    date: string;
    status: string;
    tosAgvTruck: {
      agvPlateNumber: string;
      agvRfid: string;
      containerNumbers: string[];
      containerRfids: string[];
      createdAt: string;
      sentTime: string;
      truckPlateNumber: string;
      truckRfid: string;
      updatedAt: string;
      _id: string;
    };
    tosAgvTruck2: {
      agvPlateNumber: string;
      agvRfid: string;
      containerNumbers: string[];
      containerRfids: string[];
      createdAt: string;
      sentTime: string;
      truckPlateNumber: string;
      truckRfid: string;
      updatedAt: string;
      _id: string;
    };
  };
  processClearance: {
    clearanceType: string;
    date: string;
    isClearance: boolean;
    status: string;
    totalWeight: number;
  };
  processCustomZone: {
    date: string;
    status: string;
  };
  processExport: {
    date: string;
    status: string;
    tosAgvTrucks: string[];
  };
  processTruck: {
    date: string;
    status: string;
  };
  processTruckExit: {
    date: string;
    status: string;
  };
  processWarehouse: {
    date: string;
    status: string;
    weight: number;
  };
  receipt: IReceipt;
  truckScale: string;
  truckScales: {
    containerNumbers: string[];
    containerRfids: string[];
    createdAt: string;
    detect: string;
    netWeight: string;
    platformScaleName: string;
    receipt: string;
    remarks: string;
    scaleCode: string;
    scaledWeight: string;
    sort: string;
    truckType: string;
    type: string;
    updatedAt: string;
    vehiclePlateNumber: string;
    vehicleRfid: string;
    vehicleWeight: string;
    weighingTime: string;
    _id: string;
  }[];
  updatedAt: string;
  vehiclePlateNumber: string;
  vehicleRfid: string;
  _id: string;
  constructor({
    isClearance,
    code,
    createdAt,
    customer,
    exportItemStatus,
    exportItemStatusDate,
    processChangeAgv,
    processClearance,
    processCustomZone,
    processExport,
    processTruck,
    processTruckExit,
    processWarehouse,
    receipt,
    truckScale,
    truckScales,
    updatedAt,
    vehiclePlateNumber,
    vehicleRfid,
    _id,
  }: IExportItem) {
    this.isClearance = isClearance;
    this.code = code;
    this.createdAt = createdAt;
    this.customer = customer;
    this.exportItemStatus = exportItemStatus;
    this.exportItemStatusDate = exportItemStatusDate;
    this.processChangeAgv = processChangeAgv;
    this.processClearance = processClearance;
    this.processCustomZone = processCustomZone;
    this.processExport = processExport;
    this.processTruck = processTruck;
    this.processTruckExit = processTruckExit;
    this.processWarehouse = processWarehouse;
    this.receipt = receipt;
    this.truckScale = truckScale;
    this.truckScales = truckScales;
    this.updatedAt = updatedAt;
    this.vehiclePlateNumber = vehiclePlateNumber;
    this.vehicleRfid = vehicleRfid;
    this._id = _id;
  }
  static fromJson(json: any) {
    return new ExportItem(json);
  }
}
