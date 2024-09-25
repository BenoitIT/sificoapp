"use client";
import { FaEye } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setPageTitle } from "@/redux/reducers/pageTitleSwitching";
import { headers } from "@/app/tableHeaders/invoices";
import { shippingInvoices } from "@/app/dummyData/invoices";
import { usePathname, useRouter } from "next/navigation";
import Invoices from "@/components/dashboard/pages/invoices";
const Page = () => {
  const dispatch = useDispatch();
  const currentPath = usePathname();
  const router = useRouter();
  useEffect(() => {
    dispatch(setPageTitle("Invoices"));
  }, [dispatch]);
  const handleOpenInvoice = async(id: number | string) => {
    router.push(`${currentPath}/${id}`);
  };
  const actions = [{ icon: <FaEye />, Click: handleOpenInvoice, name: "view" }];
  return (
    <Invoices headers={headers} data={shippingInvoices} action={actions} />
  );
};

export default Page;
