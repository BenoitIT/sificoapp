export interface TableProps<T> {
    headers: {
      header: string;
      field: string;
    }[];
    data: T[];
    action?: {
      icon: React.ReactNode;
      Click: (id: string | number) => void;
      name?: string;
    }[];
    allowItemsSummationFooter?:boolean;
  }