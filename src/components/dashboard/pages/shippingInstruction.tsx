"use client";
import TabularSection from "@/appComponents/pageBlocks/tabularSection";
import ExportButton from "@/components/ui/exportBtn";
import useSWR from "swr";
import { SearchBox } from "@/components/ui/searchBox";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname, useParams } from "next/navigation";
import { getStuffingReportsItems } from "@/app/httpservices/stuffingReport";
const ShippingInstruction = () => {
  const router = useRouter();
  const params: any = useParams();
  const currentPath = usePathname();
  const contId = params?.contid;
  const cacheKey = `/stuffingreports/${Number(contId)}`;
  const { data } = useSWR(cacheKey, () =>
    getStuffingReportsItems(Number(contId))
  );
  const handleAddNew = () => {
    router.push(
      `${currentPath}/newintruction?category=${data?.stuffingRpt?.packagingType}`
    );
  };
  return (
    <div>
      <div className="w-full flex flex-col-reverse md:flex-row justify-between mb-4 gap-2">
        <SearchBox />
        <div className="flex gap-2">
          <Button onClick={handleAddNew}>New instruction</Button>
          <ExportButton />
        </div>
      </div>
    </div>
  );
};
export default TabularSection(ShippingInstruction);
