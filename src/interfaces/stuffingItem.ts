export interface NewStuffingItem {
  shipper?: number | string;
  consignee?: number | string;
  code?: string;
  mark?: string;
  salesAgent?: number | string;
  noOfPkgs?: number;
  typeOfPkgs?: string;
  weight?: number;
  line?: number;
  handling?: number;
  type?: string;
  cbm?: number | string;
  description?: string;
  freight?: number;
  blFee?: number;
  jb?: number;
  others?: number;
}
export interface NewStuffingItemErrors {
  shipper?: string | null;
  consignee?: string | null;
  code?: string | null;
  mark?: string | null;
  salesAgent?: string | null;
  noOfPkgs?: number;
  typeOfPkgs?: string | null;
  weight?: number;
  line?: number;
  handling?: number;
  type?: string | null;
  cbm?: string | null;
  description?: string | null;
  freight?: string | null;
  blFee?: string | null;
  jb?: string | null;
  others?: string | null;
}
