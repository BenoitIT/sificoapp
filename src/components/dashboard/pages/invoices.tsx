"use client";
import TabularSection from "@/appComponents/pageBlocks/tabularSection";
import { Button } from "@/components/ui/button";
import { SearchBox } from "@/components/ui/searchBox";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
const Invoices = () => {
  const router = useRouter();
  const searchParams: any = useSearchParams();
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  });
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );
  useEffect(() => {
    router.push(
      `?${createQueryString("start", date?.from as unknown as string)+`&`+createQueryString("end", date?.to as unknown as string)}`
    );
  }, [date]);
  return (
    <div>
      <div className="w-full flex flex-col-reverse md:flex-row justify-between mb-4 gap-2">
        <SearchBox />
        <div className="flex gap-2 justify-end w-full flex-col-reverse md:flex-row">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-[270px] md:w-[300px] justify-start text-left font-normal relative text-gray-700 bg-white"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                      <span
                        className="absolute text-gray-600 text-sm hover:cursor-pointer right-2"
                        onClick={() => setDate(undefined)}
                      >
                        x
                      </span>
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <div className="flex flex-row gap-1">
                    <span className="text-gray-700">Start date</span>
                    <span className="text-gray-700">and </span>
                    <span className="text-gray-700">End date</span>
                  </div>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
          <Button>Export</Button>
        </div>
      </div>
    </div>
  );
};
export default TabularSection(Invoices);
