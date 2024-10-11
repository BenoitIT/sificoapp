"use client";
import useSWR from "swr";
import { FaEye } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Suspense, useCallback, useEffect, useState } from "react";
import { setPageTitle } from "@/redux/reducers/pageTitleSwitching";
import { headers } from "@/app/tableHeaders/invoices";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Invoices from "@/components/dashboard/pages/invoices";
import { getAllinvoices, invoiceEndpoint } from "@/app/httpservices/invoices";
import { invoice } from "@/interfaces/invoice";
import Loader from "@/appComponents/pageBlocks/loader";
import ErrorSection from "@/appComponents/pageBlocks/errorDisplay";
import useDebounce from "@/app/utilities/debouce";
import Paginator from "@/components/pagination/paginator";
import exportDataInExcel from "@/app/utilities/exportdata";
import usePagination from "@/app/utilities/usePagination";
const Page = () => {
  const dispatch = useDispatch();
  const currentPath = usePathname();
  const router = useRouter();
  const searchParams: any = useSearchParams();
  const searchValue = searchParams?.get("search") || "";
  const [search, setSearch] = useState(searchValue);
  const searchValues = useDebounce(search, 2000);
  const [currentPage, setCurrentPage] = useState(1);
  const activePage = searchParams?.get("page");
  const { data, isLoading, error } = useSWR(
    [invoiceEndpoint, searchValues, currentPage],
    () => getAllinvoices(searchValues, currentPage),
    {
      onSuccess: (data: invoice[]) =>
        data.sort((a, b) => (b.id ?? 0) - (a.id ?? 0)),
    }
  );
  const { handlePageChange, handleNextPage, handlePreviousPage } =
    usePagination(data, currentPage);
  useEffect(() => {
    dispatch(setPageTitle("Invoices"));
  }, [dispatch]);
  useEffect(() => {
    setSearch(searchValue);
  }, [searchValue]);
  useEffect(() => {
    if (searchParams?.get("export")) {
      exportDataInExcel(data, headers, `Invoices-page ${currentPage}`);
      router.back();
    }
  }, [searchParams]);
  useEffect(() => {
    if (activePage) {
      setCurrentPage(activePage);
    }
  }, [activePage]);
  const handleOpenInvoice = async (id: number | string) => {
    router.push(`${currentPath}/${id}`);
  };
  const actions = [{ icon: <FaEye />, Click: handleOpenInvoice, name: "view" }];
  if (data) {
    return (
      <div className="w-full">
        <Invoices headers={headers} data={data} action={actions} />
        <div className="flex justify-end w-full mt-2">
          <Paginator
            activePage={currentPage}
            totalPages={
              Array.isArray(data) && Math.ceil(data.length / 13) < 1
                ? 1
                : Math.ceil(data.length / 13)
            }
            onPageChange={handlePageChange}
            onPreviousPageChange={handlePreviousPage}
            onNextPageChange={handleNextPage}
          />
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

const SuspensePage = () => (
  <Suspense fallback={<Loader />}>
    <Page />
  </Suspense>
);

export default SuspensePage;
