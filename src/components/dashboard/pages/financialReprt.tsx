"use client";
import TabularSection from "@/appComponents/pageBlocks/tabularSection";
import DatePickerWithRange from "@/components/ui/dateSelector";
import ExportButton from "@/components/ui/exportBtn";
import { SearchBox } from "@/components/ui/searchBox";
import { useState } from "react";
import { DateRange } from "react-day-picker";
const FinancialReport = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  });
  return (
    <div>
      <div className="w-full flex flex-col-reverse md:flex-row justify-between mb-4 gap-2">
        <SearchBox />
        <div className="flex gap-2 justify-end w-full flex-col-reverse md:flex-row">
          <div className="h-fit">
            <DatePickerWithRange date={date} setDate={setDate} />
          </div>
          <ExportButton />
        </div>
      </div>
    </div>
  );
};
export default TabularSection(FinancialReport);
