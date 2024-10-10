"use client";
import useSWR from "swr";
import { FaEye } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Suspense, useEffect, useState } from "react";
import { setPageTitle } from "@/redux/reducers/pageTitleSwitching";
import { headers } from "@/app/tableHeaders/invoices";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Invoices from "@/components/dashboard/pages/invoices";
import { getAllinvoices, invoiceEndpoint } from "@/app/httpservices/invoices";
import { invoice } from "@/interfaces/invoice";
import Loader from "@/appComponents/pageBlocks/loader";
import ErrorSection from "@/appComponents/pageBlocks/errorDisplay";
import useDebounce from "@/app/utilities/debouce";
const Page = () => {
  const dispatch = useDispatch();
  const currentPath = usePathname();
  const router = useRouter();
  const searchParams: any = useSearchParams();
  const start = searchParams?.get("start");
  const end = searchParams?.get("end");
  const searchValue = searchParams?.get("search") || "";
  const [search, setSearch] = useState(searchValue);
  const searchValues = useDebounce(search, 2000);
  const { data, isLoading, error } = useSWR(
    [invoiceEndpoint, searchValues],
    () => getAllinvoices(searchValues),
    {
      onSuccess: (data: invoice[]) =>
        data.sort((a, b) => (b.id ?? 0) - (a.id ?? 0)),
    }
  );
  useEffect(() => {
    dispatch(setPageTitle("Invoices"));
  }, [dispatch]);
  useEffect(() => {
    setSearch(searchValue);
  }, [searchValue]);
  const handleOpenInvoice = async (id: number | string) => {
    router.push(`${currentPath}/${id}`);
  };
  const actions = [{ icon: <FaEye />, Click: handleOpenInvoice, name: "view" }];
  if (data) {
    return <Invoices headers={headers} data={data} action={actions} />;
  }
  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <ErrorSection />;
  }
};

const SuspensePage = () => (
  <Suspense fallback={<Loader />}>
    <Page />
  </Suspense>
);

export default SuspensePage;
