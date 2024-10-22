"use client";
import TabularSection from "@/appComponents/pageBlocks/tabularSection";
import { SearchBox } from "@/components/ui/searchBox";
const ShippingInstruction = () => {
  return (
    <div>
      <div className="w-full flex flex-col-reverse md:flex-row justify-between mb-4 gap-2">
        <SearchBox />
      </div>
    </div>
  );
};
export default TabularSection(ShippingInstruction);
