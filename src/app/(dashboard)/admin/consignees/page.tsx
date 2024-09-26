"use client";
import useSWR, { mutate } from "swr";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setPageTitle } from "@/redux/reducers/pageTitleSwitching";
import { headers } from "@/app/tableHeaders/consignees";
import Consignee from "@/components/dashboard/pages/consignee";
import {
  getAllconsignees,
  consigneesEndpoint,
  deleteConsignee,
} from "@/app/httpservices/consignee";
import { NewShipper } from "@/interfaces/shipper";
import Loader from "@/appComponents/pageBlocks/loader";
import { toast } from "react-toastify";
import ErrorSection from "@/appComponents/pageBlocks/errorDisplay";
const Page = () => {
  const dispatch = useDispatch();
  const {
    data: consignees,
    isLoading,
    error,
  } = useSWR(consigneesEndpoint, getAllconsignees, {
    onSuccess: (data: NewShipper[]) =>
      data.sort((a, b) => (b.id ?? 0) - (a.id ?? 0)),
  });
  useEffect(() => {
    dispatch(setPageTitle("Consignees"));
  }, [dispatch]);
  const handleEdit = async (id: number | string) => {
    console.log("Edit clicked", id);
  };
  const handleDelete = async (id: number) => {
    try {
      const message = await deleteConsignee(id);
      toast.success(message);
      mutate(consigneesEndpoint);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete this consignee");
    }
  };
  const actions = [
    { icon: <FaEdit />, Click: handleEdit },
    { icon: <FaTrash />, Click: handleDelete, name: "delete" },
  ];
  if (consignees) {
    return <Consignee headers={headers} data={consignees} action={actions} />;
  }
  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <ErrorSection />;
  }
};

export default Page;
