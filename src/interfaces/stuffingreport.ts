export interface StuffingReport {
    id?:number;
    origin?: string;
    deliveryId?: number;
    destination?: any;
    packagingType?:string;
    status?: string;
    code?:string;
    shipper?:number|null,
    operatorId?:number
  }