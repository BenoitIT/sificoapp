"use client";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import StaffingReports from "@/components/dashboard/pages/stuffingReports";
import { staffingReports } from "@/app/dummyData/staffingReport";
import { headers } from "@/app/tableHeaders/staffingReports";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { setPageTitle } from "@/redux/reducers/pageTitleSwitching";
import { useEffect } from "react";
const Page = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle("Stuffing reports"));
  }, [dispatch]);
  const router = useRouter();
  const currentPath = usePathname();
  const handleEdit = async(id: number | string) => {
    console.log("Edit clicked", id);
  };
  const handleDelete = async(id: number | string) => {
    console.log("Delete clicked", id);
  };
  const handleOpenStaffingReport = async(id: number | string) => {
    router.push(`${currentPath}/${id}`);
  };
  const actions = [
    { icon: <FaEye />, Click: handleOpenStaffingReport, name: "view" },
    { icon: <FaEdit />, Click: handleEdit },
    { icon: <FaTrash />, Click: handleDelete, name: "delete" },
  ];
  return (
    <StaffingReports
      headers={headers}
      data={staffingReports}
      action={actions}
    />
  );
};
export default Page;
