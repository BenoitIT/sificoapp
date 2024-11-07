"use client";
import useSWR, { mutate } from "swr";
import {
  getAlldeliveries,
  deliveryEndpoint,
  deleteDelivery,
} from "@/app/httpservices/deliveries";
import { FaEdit, FaTrash } from "react-icons/fa";
import Delivery from "@/components/dashboard/pages/delivery";
import { headers } from "@/app/tableHeaders/deliveries";
import { useDispatch } from "react-redux";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { setPageTitle } from "@/redux/reducers/pageTitleSwitching";
import { Suspense, useEffect, useState } from "react";
import Loader from "@/appComponents/pageBlocks/loader";
import { toast } from "react-toastify";
import ErrorSection from "@/appComponents/pageBlocks/errorDisplay";
import useDebounce from "@/app/utilities/debouce";
import Paginator from "@/components/pagination/paginator";
import exportDataInExcel from "@/app/utilities/exportdata";
import usePagination from "@/app/utilities/usePagination";
import { NewDelivery } from "@/interfaces/deliveries";
import { withRolesAccess } from "@/components/auth/accessRights";
const Page = () => {
  const dispatch = useDispatch();
  const currentpath: string = usePathname()!;
  const router = useRouter();
  const searchParams: any = useSearchParams();
  const searchValue = searchParams?.get("search") || "";
  const [search, setSearch] = useState(searchValue);
  const searchValues = useDebounce(search, 1000);
  const activePage = searchParams?.get("page");
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error } = useSWR(
    [deliveryEndpoint, searchValues, currentPage],
    () => getAlldeliveries(searchValues, currentPage),
    {
      onSuccess: (data: NewDelivery[]) =>
        data.sort((a, b) => (b.id ?? 0) - (a.id ?? 0)),
    }
  );
  const { handlePageChange, handleNextPage, handlePreviousPage } =
    usePagination(data?.customers, currentPage);
  useEffect(() => {
    dispatch(setPageTitle("Deliveries"));
  }, [dispatch]);
  useEffect(() => {
    setSearch(searchValue);
  }, [searchValue]);
  useEffect(() => {
    if (searchParams?.get("export")) {
      exportDataInExcel(data?.sites, headers, "deliveries");
      router.back();
    }
  }, [searchParams, data?.sites, router]);
  useEffect(() => {
    if (activePage) {
      setCurrentPage(activePage);
    }
  }, [activePage]);
  const handleEdit = async (id: number | string) => {
    router.push(`${currentpath}/${id}`);
  };
  const handleDelete = async (id: number) => {
    try {
      const message = await deleteDelivery(id);
      toast.success(message);
      mutate(deliveryEndpoint);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete this delivery");
    }
  };
  const actions = [
    { icon: <FaEdit />, Click: handleEdit },
    { icon: <FaTrash />, Click: handleDelete, name: "delete" },
  ];
  if (data?.sites) {
    return (
      <>
        <Delivery headers={headers} data={data?.sites} action={actions} />
        <div className="flex justify-end w-full mt-2">
          <Paginator
            activePage={currentPage}
            totalPages={data?.count || 1}
            onPageChange={handlePageChange}
            onPreviousPageChange={handlePreviousPage}
            onNextPageChange={handleNextPage}
          />
        </div>
      </>
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

export default withRolesAccess(SuspensePage, [
  "origin agent",
  "admin",
  "finance",
  "head of finance"
])as React.FC;
