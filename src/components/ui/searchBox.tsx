import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
export const SearchBox = () => {
  return (
    <div className="flex items-center w-full md:w-[480px] max-w-fit h-fit space-x-2 rounded-lg border border-gray-300 bg-white px-3.5 py-2">
      <SearchIcon className="h-5 w-5 text-gray-500" />
      <Input
        type="search"
        placeholder="Search..."
        className="w-full border-0 h-6 font-normal placeholder:font-normal text-black"
      />
    </div>
  );
};
