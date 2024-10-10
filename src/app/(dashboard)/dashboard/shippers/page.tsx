"use client";
import useSWR, { mutate } from "swr";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setPageTitle } from "@/redux/reducers/pageTitleSwitching";
import { headers } from "@/app/tableHeaders/shippers";
import {
  deleteShipper,
  getAllshippers,
  shippersEndpoint,
} from "@/app/httpservices/shipper";
import Shippers from "@/components/dashboard/pages/shippers";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { NewShipper } from "@/interfaces/shipper";
import Loader from "@/appComponents/pageBlocks/loader";
import { toast } from "react-toastify";
import ErrorSection from "@/appComponents/pageBlocks/errorDisplay";
import useDebounce from "@/app/utilities/debouce";
const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const currentpath = usePathname();
  const searchParams: any = useSearchParams();
  const searchValue = searchParams?.get("search") || "";
  const [search, setSearch] = useState(searchValue);
  const searchValues = useDebounce(search, 2000);
  const {
    data: shippingCompanies,
    isLoading,
    error,
  } = useSWR(
    [shippersEndpoint, searchValues],
    () => getAllshippers(searchValues),
    {
      onSuccess: (data: NewShipper[]) =>
        data.sort((a, b) => (b.id ?? 0) - (a.id ?? 0)),
    }
  );
  useEffect(() => {
    dispatch(setPageTitle("Shippers"));
  }, [dispatch]);
  useEffect(() => {
    setSearch(searchValue);
  }, [searchValue]);
  const handleEdit = async (id: number | string) => {
    router.push(`${currentpath}/${id}`);
  };
  const handleDelete = async (id: number) => {
    try {
      const message = await deleteShipper(id);
      toast.success(message);
      mutate(shippersEndpoint);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete this shipper");
    }
  };
  const actions = [
    { icon: <FaEdit />, Click: handleEdit },
    { icon: <FaTrash />, Click: handleDelete, name: "delete" },
  ];
  if (shippingCompanies) {
    return (
      <Shippers headers={headers} data={shippingCompanies} action={actions} />
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
