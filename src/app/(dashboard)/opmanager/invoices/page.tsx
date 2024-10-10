"use client";
import useSWR from "swr";
import { FaEye } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setPageTitle } from "@/redux/reducers/pageTitleSwitching";
import { headers } from "@/app/tableHeaders/invoices";
import { usePathname, useRouter } from "next/navigation";
import Invoices from "@/components/dashboard/pages/invoices";
import { getAllinvoices, invoiceEndpoint } from "@/app/httpservices/invoices";
import { invoice } from "@/interfaces/invoice";
import Loader from "@/appComponents/pageBlocks/loader";
import ErrorSection from "@/appComponents/pageBlocks/errorDisplay";
import { useSession } from "next-auth/react";
const Page = () => {
  const dispatch = useDispatch();
  const currentPath = usePathname();
  const router = useRouter();
  const session: any = useSession();
  const userId = session?.data?.id;
  const { data, isLoading, error } = useSWR(invoiceEndpoint, getAllinvoices, {
    onSuccess: (data: invoice[]) =>
      data.sort((a, b) => (b.id ?? 0) - (a.id ?? 0)),
  });
  useEffect(() => {
    dispatch(setPageTitle("Invoices"));
  }, [dispatch]);
  const handleOpenInvoice = async (id: number | string) => {
    router.push(`${currentPath}/${id}`);
  };
  const actions = [{ icon: <FaEye />, Click: handleOpenInvoice, name: "view" }];
  if (data) {
    const myInvoices = Array.isArray(data)
      ? data.filter((invoice: invoice) => invoice.createdById == userId)
      : [];
    return <Invoices headers={headers} data={myInvoices} action={actions} />;
  }
  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <ErrorSection />;
  }
};

export default Page;
