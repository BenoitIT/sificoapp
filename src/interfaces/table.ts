export interface TableProps<T> {
    headers: {
      header: string;
      field: string;
    }[];
    data: T[];
    action?: {
      icon: React.ReactNode|JSX.Element;
      Click:((id: number) => Promise<any>);
      name?: string;
    }[];
    allowItemsSummationFooter?:boolean;
  }