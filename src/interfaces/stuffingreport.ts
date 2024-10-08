export interface StuffingReport {
    id?:number;
    origin?: string;
    destination?: number;
    status?: string;
    code?:string;
    shipper?:number|null
  }