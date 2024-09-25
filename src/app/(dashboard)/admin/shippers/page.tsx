"use client";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setPageTitle } from "@/redux/reducers/pageTitleSwitching";
import { headers } from "@/app/tableHeaders/shippers";
import { shippingCompanies } from "@/app/dummyData/shippers";
import Shippers from "@/components/dashboard/pages/shippers";
const Page = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle("Shippers"));
  }, [dispatch]);
  const handleEdit = async(id: number | string) => {
    console.log("Edit clicked", id);
  };
  const handleDelete = async(id: number | string) => {
    console.log("Delete clicked", id);
  };
  const actions = [
    { icon: <FaEdit />, Click: handleEdit },
    { icon: <FaTrash />, Click: handleDelete, name: "delete" },
  ];
  return <Shippers headers={headers} data={shippingCompanies} action={actions} />;
};

export default Page;
