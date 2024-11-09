"use client";
import useSWR, { mutate } from "swr";
import { FaTrash, FaEye } from "react-icons/fa";
import StaffingReports from "@/components/dashboard/pages/stuffingReports";
import { headers } from "@/app/tableHeaders/staffingReports";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { setPageTitle } from "@/redux/reducers/pageTitleSwitching";
import { Suspense, useEffect, useState } from "react";
import {
  deleteStuffingReports,
  getAllStuffingReports,
  stuffingReportEndpoint,
} from "@/app/httpservices/stuffingReport";
import { StuffingReport } from "@/interfaces/stuffingreport";
import Loader from "@/appComponents/pageBlocks/loader";
import ErrorSection from "@/appComponents/pageBlocks/errorDisplay";
import { useSession } from "next-auth/react";
import useDebounce from "@/app/utilities/debouce";
import Paginator from "@/components/pagination/paginator";
import usePagination from "@/app/utilities/usePagination";
import { toast } from "react-toastify";
import { withRolesAccess } from "@/components/auth/accessRights";
const Page = () => {
  const router = useRouter();
  const currentPath = usePathname();
  const searchParams: any = useSearchParams();
  const dispatch = useDispatch();
  const session: any = useSession();
  const role = session?.data?.role;
  const userId = session?.data?.id;
  const searchValue = searchParams?.get("search") || "";
  const FilterValue = searchParams?.get("filter") || "";
  const addData = searchParams?.get("added") || "";
  const [search, setSearch] = useState(searchValue);
  const searchValues = useDebounce(search, 1000);
  const activePage = searchParams?.get("page");
  const [currentPage, setCurrentPage] = useState(1);
  const [reload, setReload] = useState(false);
  const { data, isLoading, error } = useSWR(
    [
      stuffingReportEndpoint,
      searchValues,
      currentPage,
      reload,
      addData,
      FilterValue,
    ],
    () => getAllStuffingReports(searchValues, FilterValue, currentPage)
  );
  useEffect(() => {
    dispatch(setPageTitle("Stuffing reports"));
  }, [dispatch]);
  useEffect(() => {
    setSearch(searchValue);
  }, [searchValue]);
  const { handlePageChange, handleNextPage, handlePreviousPage } =
    usePagination(data?.customers, currentPage);
  useEffect(() => {
    if (activePage) {
      setCurrentPage(activePage);
    }
  }, [activePage]);
  const handleDelete = async (id: number) => {
    const response = await deleteStuffingReports(id);
    if (response.status == 200) {
      toast.success(response.message);
      mutate(stuffingReportEndpoint);
      setReload(!reload);
    } else {
      toast.error(response.message);
    }
  };
  const handleOpenStaffingReport = async (id: number | string) => {
    router.push(`${currentPath}/${id}`);
  };
  const actions = [
    { icon: <FaEye />, Click: handleOpenStaffingReport, name: "view" },
    {
      icon: <FaTrash className={role != "origin agent" ? "hidden" : ""} />,
      Click: handleDelete,
      name: "delete",
    },
  ];
  if (data?.containers) {
    const stuffingreports =
      role == "operation manager" && Array.isArray(data?.containers)
        ? data?.containers.filter(
            (stuff: StuffingReport) => stuff.operatorId == userId
          )
        : data?.containers;
    return (
      <div className="w-full">
        <StaffingReports
          headers={headers}
          data={stuffingreports}
          action={actions}
        />
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
};
const SuspensePage = () => (
  <Suspense fallback={<Loader />}>
    <Page />
  </Suspense>
);

export default withRolesAccess(SuspensePage, ["origin agent", "admin","finance","head of finance"]);
