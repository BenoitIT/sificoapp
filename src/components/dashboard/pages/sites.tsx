"use client";
import TabularSection from "@/appComponents/pageBlocks/tabularSection";
import { Button } from "@/components/ui/button";
import { SearchBox } from "@/components/ui/searchBox";
import { useRouter, usePathname } from "next/navigation";
const Sites = () => {
  const router = useRouter();
  const currentPath: string = usePathname();
  const handleAddNew = () => {
    router.push(`${currentPath}/newsite`);
  };
  return (
    <div>
      <div className="w-full flex flex-col-reverse md:flex-row  justify-between mb-4">
        <SearchBox />
        <div className="flex gap-2 justify-end w-full">
          <Button className="hover:bg-[#003472] bg-[#189bcc]">Export</Button>
          <Button onClick={handleAddNew}>Add new</Button>
        </div>
      </div>
    </div>
  );
};
export default TabularSection(Sites);
