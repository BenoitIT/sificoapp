
export interface NewStuffingItem {
  shipper?: number | string;
  consignee?: number | string;
  code?: string;
  mark?: string;
  salesAgent?: number | string;
  noOfPkgs?: number;
  typeOfPkg?: string;
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
  typeOfPkg?: string | null;
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

export interface StepFormProps {
  setItemsData: (
    value:
      | Partial<NewStuffingItem>
      | ((prevState: NewStuffingItem) => Partial<NewStuffingItem>)
  ) => void;
  setValidationErrors: (
    value:
      | Partial<NewStuffingItemErrors>
      | ((prevState: NewStuffingItemErrors) => Partial<NewStuffingItemErrors>)
  ) => void;
  errors: NewStuffingItemErrors;
  ErrorLogger: (key: string, message: string | null) => void;
  newItemPayload: NewStuffingItem;
  setActiveForm:(val:number)=>void;
}
