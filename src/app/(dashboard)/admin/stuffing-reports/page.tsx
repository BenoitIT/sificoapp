"use client";
import useSWR from "swr";
import { FaTrash, FaEye } from "react-icons/fa";
import StaffingReports from "@/components/dashboard/pages/stuffingReports";
import { headers } from "@/app/tableHeaders/staffingReports";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { setPageTitle } from "@/redux/reducers/pageTitleSwitching";
import { useEffect } from "react";
import {
  getAllStuffingReports,
  stuffingReportEndpoint,
} from "@/app/httpservices/stuffingReport";
import { StuffingReport } from "@/interfaces/stuffingreport";
import Loader from "@/appComponents/pageBlocks/loader";
import ErrorSection from "@/appComponents/pageBlocks/errorDisplay";
const Page = () => {
  const router = useRouter();
  const currentPath = usePathname();
  const dispatch = useDispatch();
  const {
    data: staffingReports,
    isLoading,
    error,
  } = useSWR(stuffingReportEndpoint, getAllStuffingReports, {
    onSuccess: (data: StuffingReport[]) =>
      data.sort((a, b) => (b.id ?? 0) - (a.id ?? 0)),
  });
  useEffect(() => {
    dispatch(setPageTitle("Stuffing reports"));
  }, [dispatch]);
  const handleDelete = async (id: number | string) => {
    console.log("Delete clicked", id);
  };
  const handleOpenStaffingReport = async (id: number | string) => {
    router.push(`${currentPath}/${id}`);
  };
  const actions = [
    { icon: <FaEye />, Click: handleOpenStaffingReport, name: "view" },
    { icon: <FaTrash />, Click: handleDelete, name: "delete" },
  ];
  if (staffingReports) {
    return (
      <StaffingReports
        headers={headers}
        data={staffingReports}
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
