"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setPageTitle } from "@/redux/reducers/pageTitleSwitching";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { LuPencilLine } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";

const Page = () => {
  const [editAEDValue, setEditAEDValue] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle("Settings"));
  }, [dispatch]);
  return (
    <div className="min-h-[80vh] flex justify-center items-center">
      <div className="h-full w-full md:h-[170px] md:w-[750px] bg-white rounded-xl shadow py-2">
        <div
          className={
            "w-full text-gray-500 mx-4 md:mx-8 flex flex-col gap-2 text-sm"
          }
        >
          <p className="font-semibold py-4 uppercase">
            USD to AED Conversion Rate
          </p>
          <p>
            Dollar(USD){" "}
            <span className="ml-8 text-gray-900 font-semibold">1$</span>
          </p>
          <div className="flex relative gap-2 flex-shrink">
            <p>
              United Arab Emirates dirham(AED){" "}
              <span className="text-gray-900 font-semibold">3.67</span>
            </p>
            <span
              className={
                editAEDValue
                  ? "hidden"
                  : " text-[#003472] mt-[2px] hover:cursor-pointer"
              }
              onClick={() => setEditAEDValue(true)}
            >
              <LuPencilLine />
            </span>
            <div
              className={
                editAEDValue
                  ? "flex flex-col md:flex-row gap-2 absolute left-[20px] md:left-[180px] bg-white p-2"
                  : "hidden"
              }
            >
              <Input
                type="text"
                placeholder="Enter value of 1$ in AED"
                className="w-full md:w-[270px] placeholder:text-gray-300 outline:border border-gray-400"
              />
              <Button onClick={() => setEditAEDValue(false)}>
                <FaCheck />
              </Button>
              <Button
                variant="destructive"
                onClick={() => setEditAEDValue(false)}
              >
                <RxCross2 />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Page;
