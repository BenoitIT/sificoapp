"use client";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setPageTitle } from "@/redux/reducers/pageTitleSwitching";
import { shippingCompanies } from "@/app/dummyData/shippers";
import { headers } from "@/app/tableHeaders/consignees";
import Consignee from "@/components/dashboard/pages/consignee";
const Page = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle("Consignees"));
  }, [dispatch]);
  const handleEdit = (id: number | string) => {
    console.log("Edit clicked", id);
  };
  const handleDelete = (id: number | string) => {
    console.log("Delete clicked", id);
  };
  const actions = [
    { icon: <FaEdit />, Click: handleEdit },
    { icon: <FaTrash />, Click: handleDelete, name: "delete" },
  ];
  return <Consignee headers={headers} data={shippingCompanies} action={actions} />;
};

export default Page;
