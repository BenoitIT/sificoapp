"use client";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setPageTitle } from "@/redux/reducers/pageTitleSwitching";
import Shippers from "@/components/dashboard/pages/shippers";
import { headers } from "@/app/tableHeaders/invoices";
import { shippingInvoices } from "@/app/dummyData/invoices";
import Invoices from "@/components/dashboard/pages/invoices";
const Page = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle("Invoices"));
  }, [dispatch]);
  const handleOpenStaffingReport = (id: number | string) => {
    console.log("Edit clicked", id);
  };
  const actions = [
    { icon: <FaEye />, Click: handleOpenStaffingReport, name: "view" },
  ];
  return (
    <Invoices headers={headers} data={shippingInvoices} action={actions} />
  );
};

export default Page;
