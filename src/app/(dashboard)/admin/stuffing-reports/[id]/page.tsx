"use client";
import useSWR from "swr";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import StaffingReportsItems from "@/components/dashboard/pages/reportItems";
import { headers } from "@/app/tableHeaders/staffingItems";
import { useRouter, usePathname, useParams } from "next/navigation";
import { useEffect } from "react";
import { setPageTitle } from "@/redux/reducers/pageTitleSwitching";
import { useDispatch } from "react-redux";
import { getStuffingReportsItems } from "@/app/httpservices/stuffingReport";
import { NewStuffingItem } from "@/interfaces/stuffingItem";
import { StuffingReport } from "@/interfaces/stuffingreport";
import Loader from "@/appComponents/pageBlocks/loader";
import ErrorSection from "@/appComponents/pageBlocks/errorDisplay";
const Page = () => {
  const router = useRouter();
  const params = useParams();
  const currentPath = usePathname();
  const dispatch = useDispatch();
  const staffReportId = params?.id;
  const cacheKey = `/stuffingreports/${Number(staffReportId)}`;
  const { data, isLoading, error } = useSWR(
    cacheKey,
    () => getStuffingReportsItems(Number(staffReportId)),
    {
      onSuccess: (data: {
        shipments: NewStuffingItem[];
        stuffingRpt: StuffingReport;
      }) => data.shipments.sort((a, b) => (b.id ?? 0) - (a.id ?? 0)),
    }
  );

  useEffect(() => {
    dispatch(setPageTitle("Stuffing report"));
  }, [dispatch]);
  const handleEdit = async (id: number | string) => {
    console.log("Edit clicked", id);
  };
  const handleDelete = async (id: number | string) => {
    console.log("Delete clicked", id);
  };
  const handleOpenStaffingReport = async (id: number | string) => {
    router.push(`${currentPath}/invoice/${id}`);
  };
  const actions = [
    { icon: <FaEye />, Click: handleOpenStaffingReport, name: "view" },
    { icon: <FaEdit />, Click: handleEdit },
    { icon: <FaTrash />, Click: handleDelete, name: "delete" },
  ];
  if (data?.shipments) {
    return (
      <StaffingReportsItems
        headers={headers}
        data={data?.shipments}
        action={actions}
        allowItemsSummationFooter={true}
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
