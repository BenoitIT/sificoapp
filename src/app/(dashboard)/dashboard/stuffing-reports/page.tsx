"use client";
import useSWR from "swr";
import { FaTrash, FaEye } from "react-icons/fa";
import StaffingReports from "@/components/dashboard/pages/stuffingReports";
import { headers } from "@/app/tableHeaders/staffingReports";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { setPageTitle } from "@/redux/reducers/pageTitleSwitching";
import { useEffect, useState } from "react";
import {
  getAllStuffingReports,
  stuffingReportEndpoint,
} from "@/app/httpservices/stuffingReport";
import { StuffingReport } from "@/interfaces/stuffingreport";
import Loader from "@/appComponents/pageBlocks/loader";
import ErrorSection from "@/appComponents/pageBlocks/errorDisplay";
import { useSession } from "next-auth/react";
import useDebounce from "@/app/utilities/debouce";
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
  const {
    data: staffingReports,
    isLoading,
    error,
  } = useSWR(
    [stuffingReportEndpoint, searchValues],
    () => getAllStuffingReports(searchValues),
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
      <StaffingReports
        headers={headers}
        data={stuffingreports}
        action={actions}
      />
    );
  }
  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <ErrorSection />;
  }
};
export default Page;
