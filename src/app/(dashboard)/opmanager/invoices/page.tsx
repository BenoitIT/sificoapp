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
import { useSession } from "next-auth/react";
const Page = () => {
  const dispatch = useDispatch();
  const currentPath = usePathname();
  const session:any=useSession();
  const router = useRouter();
  const searchParams: any = useSearchParams();
  const searchValue = searchParams?.get("search") || "";
  const userId=session?.data?.id;
  const [search, setSearch] = useState(searchValue);
  const searchValues = useDebounce(search, 2000);
  const activePage = searchParams?.get("page");
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error } = useSWR(
    [invoiceEndpoint, searchValues, currentPage],
    () => getAllinvoices(searchValues, currentPage),
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
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );
  const handlePageChange = (pageNumber: number) => {
    router.push(`?${createQueryString("page", pageNumber.toString())}`);
  };
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      router.push(
        `?${createQueryString("page", (currentPage - 1).toString())}`
      );
    }
  };
  const handleNextPage = () => {
    if (Array.isArray(data) && data.length > currentPage) {
      router.push(
        `?${createQueryString(
          "page",
          (Number(currentPage) + Number(1)).toString()
        )}`
      );
    }
  };
  useEffect(() => {
    if (activePage) {
      setCurrentPage(activePage);
    }
  }, [activePage]);
  const actions = [{ icon: <FaEye />, Click: handleOpenInvoice, name: "view" }];
  if (data) {
    const myInvoices = Array.isArray(data)
      ? data.filter((invoice: invoice) => invoice.createdById == userId)
      : [];
    return (
      <div className="w-full">
        <Invoices headers={headers} data={myInvoices} action={actions} />
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
