"use client";
import useSWR, { mutate } from "swr";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setPageTitle } from "@/redux/reducers/pageTitleSwitching";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { LuPencilLine } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import {
  dependanceEndpoint,
  getDependancies,
  updateDepndancies,
} from "../../../httpservices/dependacies";
import Loader from "@/appComponents/pageBlocks/loader";
import ErrorSection from "@/appComponents/pageBlocks/errorDisplay";
import { toast } from "react-toastify";

const Page = () => {
  const [editAEDValue, setEditAEDValue] = useState(false);
  const [editrate, setEditRate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aed, setAed] = useState<number>();
  const [rate, setRate] = useState<number>();
  const { data, isLoading, error } = useSWR(
    dependanceEndpoint,
    getDependancies
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle("Settings"));
  }, [dispatch]);
  useEffect(() => {
    if (data) {
      setAed(data?.aed);
      setRate(data?.freightRate);
    }
  }, [data]);
  const handleUpdateInfo = async () => {
    setLoading(true);
    const payload = {
      aed: aed ?? data?.aed,
      freightRate: rate ?? data?.freightRate,
    };
    try {
      const { message, status } = await updateDepndancies(payload);
      if (status == 200) {
        toast.success(message);
        mutate(dependanceEndpoint);
      } else {
        toast.error(message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Update success");
    }
    setLoading(false);
  };
  if (data) {
    return (
      <div className="min-h-[80vh] flex justify-center items-center flex-col gap-2">
        <div className="h-full w-full md:h-[170px] md:w-[750px] bg-white rounded-xl shadow py-2">
          <div
            className={
              "w-full text-gray-600 mx-4 md:mx-8 flex flex-col gap-2 text-sm"
            }
          >
            <p className="font-semibold py-4 uppercase">
              USD to AED Conversion Rate
            </p>
            <p>
              Dollar(USD){" "}
              <span className="ml-8 text-gray-900 font-semibold">
                {data?.usd}$
              </span>
            </p>
            <div className="flex relative gap-2 flex-shrink">
              <p>
                United Arab Emirates dirham(AED){" "}
                <span className="text-gray-900 font-semibold">{data?.aed}</span>
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
                  type="number"
                  placeholder="Enter value of 1$ in AED"
                  onChange={(e) => setAed(Number(e.target.value))}
                  value={aed}
                  className="w-full md:w-[270px] placeholder:text-gray-300 outline:border border-gray-400"
                />
                <Button onClick={handleUpdateInfo} disabled={loading}>
                  <FaCheck />
                </Button>
                <Button
                  variant="destructive"
                  disabled={loading}
                  onClick={() => {
                    setEditAEDValue(false);
                    setAed(data?.aed);
                  }}
                >
                  <RxCross2 />
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="h-full w-full md:h-[100px] md:w-[750px] bg-white rounded-xl shadow py-2">
          <div
            className={
              "w-full text-gray-600 mx-4 md:mx-8 flex flex-col text-sm"
            }
          >
            <p className="font-semibold py-4 uppercase">Shipping rate</p>
            <div className="flex relative gap-2 flex-shrink">
              <p>
                Rate{" "}
                <span className="text-gray-900 font-semibold">
                  {data?.freightRate}
                </span>
              </p>
              <span
                className={
                  editrate
                    ? "hidden"
                    : " text-[#003472] mt-[2px] hover:cursor-pointer"
                }
                onClick={() => setEditRate(true)}
              >
                <LuPencilLine />
              </span>
              <div
                className={
                  editrate
                    ? "flex flex-col md:flex-row gap-2 absolute left-[20px] md:left-[180px] bg-white p-2"
                    : "hidden"
                }
              >
                <Input
                  type="number"
                  placeholder="Enter rate"
                  onChange={(e) => setRate(Number(e.target.value))}
                  value={rate}
                  className="w-full md:w-[270px] placeholder:text-gray-300 outline:border border-gray-400"
                />
                <Button onClick={handleUpdateInfo} disabled={loading}>
                  <FaCheck />
                </Button>
                <Button
                  variant="destructive"
                  disabled={loading}
                  onClick={() => {
                    setEditRate(false);
                    setRate(data?.freightRate);
                  }}
                >
                  <RxCross2 />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <ErrorSection />;
  }
};
export default Page;
