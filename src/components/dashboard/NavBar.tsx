"use client";
import { IoIosNotifications } from "react-icons/io";
import { useAppSelector } from "@/redux/store";
const Navbar = () => {
  const pageTitle = useAppSelector((state) => state.pageTitle.pageTitle);
  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-sm">
      <div className=" flex flex-shrink w-full items-left gap-2  [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] font-normal uppercase text-gray-800 text-base md:text-lg">
        {pageTitle}
      </div>
      <div className="flex items-center gap-2 md:gap-4 justify-end w-full">
        <div className="border rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative">
          <IoIosNotifications className="w-5 h-5 text-[#003472]" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs md:text-sm leading-3 font-medium text-gray-700">
            John Doe
          </span>
          <span className="text-[10px] text-gray-500 text-right">Admin</span>
        </div>
        <div className=" bg-white border font-semibold rounded-full w-9 h-9 flex items-center justify-center cursor-pointer text-[#003472] shadow-xl">
          JD
        </div>
      </div>
    </div>
  );
};

export default Navbar;
