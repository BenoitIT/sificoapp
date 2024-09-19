import DynamicTable from "@/components/table/table";
import { TableProps } from "@/interfaces/table";
const TabularSection = (Component: React.FC) => {
  const modifiedSection = <T extends Record<string, string | number>>(
    props: TableProps<T>
  ) => {
    const { headers, action, data, allowItemsSummationFooter } = props;
    return (
      <>
        <Component />
        <DynamicTable
          headers={headers}
          data={data}
          action={action}
          allowItemsSummationFooter={allowItemsSummationFooter}
        />
      </>
    );
  };
  return modifiedSection;
};
export default TabularSection;
