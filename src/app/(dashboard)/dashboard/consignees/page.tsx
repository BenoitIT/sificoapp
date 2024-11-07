"use client"; // This ensures the component is rendered on the client-side

import useSWR, { mutate } from "swr";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useEffect, useState, Suspense } from "react";
import { setPageTitle } from "@/redux/reducers/pageTitleSwitching";
import { headers } from "@/app/tableHeaders/consignees";
import Consignee from "@/components/dashboard/pages/consignee";
import {
  getAllconsignees,
  consigneesEndpoint,
  deleteConsignee,
} from "@/app/httpservices/consignee";
import { NewShipper } from "@/interfaces/shipper";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Loader from "@/appComponents/pageBlocks/loader";
import { toast } from "react-toastify";
import ErrorSection from "@/appComponents/pageBlocks/errorDisplay";
import useDebounce from "@/app/utilities/debouce";
import Paginator from "@/components/pagination/paginator";
import exportDataInExcel from "@/app/utilities/exportdata";
import usePagination from "@/app/utilities/usePagination";
import { withRolesAccess } from "@/components/auth/accessRights";

const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const currentpath: string = usePathname()!;
  const searchParams: any = useSearchParams();
  const searchValue = searchParams?.get("search") || "";
  const [search, setSearch] = useState(searchValue);
  const searchValues = useDebounce(search, 1000);
  const activePage = searchParams?.get("page");
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error } = useSWR(
    [consigneesEndpoint, searchValues, currentPage],
    () => getAllconsignees(searchValues, currentPage),
    {
      onSuccess: (data: NewShipper[]) =>
        data.sort((a, b) => (b.id ?? 0) - (a.id ?? 0)),
    }
  );
  const { handlePageChange, handleNextPage, handlePreviousPage } =
    usePagination(data?.customers, currentPage);
  useEffect(() => {
    dispatch(setPageTitle("Customers"));
  }, [dispatch]);

  useEffect(() => {
    setSearch(searchValue);
  }, [searchValue]);

  const handleEdit = async (id: number | string) => {
    router.push(`${currentpath}/${id}`);
  };
  useEffect(() => {
    if (searchParams?.get("export") && Array.isArray(data?.customers)) {
      exportDataInExcel(
        data?.customers,
        headers,
        `customers-page${currentPage}`
      );
      router.back();
    }
  }, [searchParams, data?.customers, currentPage, router]);
  const handleDelete = async (id: number) => {
    try {
      const message = await deleteConsignee(id);
      toast.success(message);
      mutate(consigneesEndpoint);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete this customer");
    }
  };
  useEffect(() => {
    if (activePage) {
      setCurrentPage(activePage);
    }
  }, [activePage]);
  const actions = [
    { icon: <FaEdit />, Click: handleEdit },
    { icon: <FaTrash />, Click: handleDelete, name: "delete" },
  ];

  if (data?.customers) {
    return (
      <div className="w-full">
        <Consignee headers={headers} data={data?.customers} action={actions} />
        <div className="flex justify-end w-full mt-2">
          <Paginator
            activePage={currentPage}
            totalPages={data?.count || 1}
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

  return null;
};
const SuspensePage = () => (
  <Suspense fallback={<Loader />}>
    <Page />
  </Suspense>
);

export default withRolesAccess(SuspensePage, ["origin agent", "admin"])as React.FC;
