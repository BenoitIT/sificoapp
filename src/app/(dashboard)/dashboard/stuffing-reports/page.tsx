"use client";
import useSWR from "swr";
import { FaTrash, FaEye } from "react-icons/fa";
import StaffingReports from "@/components/dashboard/pages/stuffingReports";
import { headers } from "@/app/tableHeaders/staffingReports";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { setPageTitle } from "@/redux/reducers/pageTitleSwitching";
import { Suspense, useCallback, useEffect, useState } from "react";
import {
  getAllStuffingReports,
  stuffingReportEndpoint,
} from "@/app/httpservices/stuffingReport";
import { StuffingReport } from "@/interfaces/stuffingreport";
import Loader from "@/appComponents/pageBlocks/loader";
import ErrorSection from "@/appComponents/pageBlocks/errorDisplay";
import { useSession } from "next-auth/react";
import useDebounce from "@/app/utilities/debouce";
import Paginator from "@/components/pagination/paginator";
const Page = () => {
  const router = useRouter();
  const currentPath = usePathname();
  const searchParams: any = useSearchParams();
  const dispatch = useDispatch();
  const session: any = useSession();
  const role = session?.data?.role;
  const userId = session?.data?.id;
  const searchValue = searchParams?.get("search") || "";
  const [search, setSearch] = useState(searchValue);
  const searchValues = useDebounce(search, 2000);
  const activePage = searchParams?.get("page");
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: staffingReports,
    isLoading,
    error,
  } = useSWR(
    [stuffingReportEndpoint, searchValues,currentPage],
    () => getAllStuffingReports(searchValues,currentPage),
    {
      onSuccess: (data: StuffingReport[]) =>
        data.sort((a, b) => (b.id ?? 0) - (a.id ?? 0)),
    }
  );
  useEffect(() => {
    dispatch(setPageTitle("Stuffing reports"));
  }, [dispatch]);
  useEffect(() => {
    setSearch(searchValue);
  }, [searchValue]);
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
    if (
      Array.isArray(staffingReports) &&
      staffingReports.length > currentPage
    ) {
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
  const handleDelete = async (id: number | string) => {
    console.log("Delete clicked", id);
  };
  const handleOpenStaffingReport = async (id: number | string) => {
    router.push(`${currentPath}/${id}`);
  };
  const actions = [
    { icon: <FaEye />, Click: handleOpenStaffingReport, name: "view" },
    {
      icon: <FaTrash className={role == "operation manager" ? "hidden" : ""} />,
      Click: handleDelete,
      name: "delete",
    },
  ];
  if (staffingReports) {
    const stuffingreports =
      role == "operation manager" && Array.isArray(staffingReports)
        ? staffingReports.filter(
            (stuff: StuffingReport) => stuff.operatorId == userId
          )
        : staffingReports;
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
            totalPages={
              Array.isArray(stuffingreports) &&
              Math.ceil(stuffingreports.length / 13) < 1
                ? 1
                : Math.ceil(stuffingreports.length / 13)
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
