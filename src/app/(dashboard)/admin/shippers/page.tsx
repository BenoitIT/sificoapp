"use client";
import useSWR, { mutate } from "swr";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setPageTitle } from "@/redux/reducers/pageTitleSwitching";
import { headers } from "@/app/tableHeaders/shippers";
import {
  deleteShipper,
  getAllshippers,
  shippersEndpoint,
} from "@/app/http/shipper";
import Shippers from "@/components/dashboard/pages/shippers";
import { NewShipper } from "@/interfaces/shipper";
import Loader from "@/appComponents/pageBlocks/loader";
import { toast } from "react-toastify";
import ErrorSection from "@/appComponents/pageBlocks/errorDisplay";
const Page = () => {
  const dispatch = useDispatch();
  const {
    data: shippingCompanies,
    isLoading,
    error,
  } = useSWR(shippersEndpoint, getAllshippers, {
    onSuccess: (data: NewShipper[]) =>
      data.sort((a, b) => (b.id ?? 0) - (a.id ?? 0)),
  });
  useEffect(() => {
    dispatch(setPageTitle("Shippers"));
  }, [dispatch]);
  const handleEdit = async (id: number | string) => {
    console.log("Edit clicked", id);
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
