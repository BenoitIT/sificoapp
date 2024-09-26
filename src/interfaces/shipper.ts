export interface NewShipper {
  id?:number;
  name?: string;
  location?: string;
  email?: string;
  phone?: string;
}
export interface newShipperErrors {
  name?: string | null;
  location?: string | null;
  email?: string | null;
  phone?: string | null;
}
