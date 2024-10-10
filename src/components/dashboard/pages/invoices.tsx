"use client";
import TabularSection from "@/appComponents/pageBlocks/tabularSection";
import { Button } from "@/components/ui/button";
import { SearchBox } from "@/components/ui/searchBox";
const Invoices = () => {
 
  return (
    <div>
      <div className="w-full flex flex-col-reverse md:flex-row justify-between mb-4 gap-2">
        <SearchBox />
        <div className="flex gap-2 justify-end w-full flex-col-reverse md:flex-row">
          <Button>Export</Button>
        </div>
      </div>
    </div>
  );
};
export default TabularSection(Invoices);
