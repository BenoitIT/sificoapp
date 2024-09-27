"use client";
import { getStuffingReportsItems } from "@/app/httpservices/stuffingReport";
import TabularSection from "@/appComponents/pageBlocks/tabularSection";
import { Button } from "@/components/ui/button";
import { SearchBox } from "@/components/ui/searchBox";
import { useRouter, usePathname, useParams } from "next/navigation";
import useSWR from "swr";
const StaffingReportsItems = () => {
  const router = useRouter();
  const params = useParams();
  const staffReportId = params?.id;
  const cacheKey = `/stuffingreports/${Number(staffReportId)}`;
  const { data } = useSWR(cacheKey, () =>
    getStuffingReportsItems(Number(staffReportId))
  );
  const currentPath: string | null = usePathname();
  const handleAddNew = () => {
    router.push(`${currentPath}/newitem`);
  };
  return (
    <div>
      <div className="w-full flex justify-between mb-4 flex-col gap-2 md:flex-row">
        <div className=" w-full md:w-[400px] flex flex-col text-[14px] bg-white px-4 py-2 rounded shadow gap-1">
          <p className=" text-gray-600">
            Stuffing report ID:{" "}
            <span className="font-medium"> {data?.stuffingRpt?.code}</span>
          </p>
          <p className=" text-gray-600">
            Container status:
            <span className="text-[#189bcc]"> {data?.stuffingRpt?.status}</span>
          </p>
          <p className=" text-gray-600">
            Delivery destination:
            <span className="font-medium">
              {" "}
              {data?.stuffingRpt?.deliverysite?.country +
                "," +
                data?.stuffingRpt?.deliverysite?.locationName}
            </span>
          </p>
        </div>
        <div className="w-full md:w-[400px] flex flex-col-reverse md:flex-col gap-2">
          <div className="flex justify-end">
            <SearchBox />
          </div>
          <div className="flex gap-2 justify-end w-full">
            <Button className="hover:bg-[#003472] bg-[#189bcc]">
              Export items
            </Button>
            <Button onClick={handleAddNew}>Add new item</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TabularSection(StaffingReportsItems);
