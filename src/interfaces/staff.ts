export interface NewStaff {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    gender?: string;
    role?: string;
  }
export interface newStaffErrors{
    firstName?: string|null;
    lastName?: string|null;
    email?: string|null;
    phone?: string|null;
    gender?: string|null;
    role?: string|null;
}