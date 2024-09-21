"use client";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import StaffingReportsItems from "@/components/dashboard/pages/reportItems";
import { headers } from "@/app/tableHeaders/staffingItems";
import { useRouter, usePathname } from "next/navigation";
import { dummyItemsData } from "@/app/dummyData/staffingItem";
const Page = () => {
  const router = useRouter();
  const currentPath = usePathname();
  const handleEdit = (id: number | string) => {
    console.log("Edit clicked", id);
  };
  const handleDelete = (id: number | string) => {
    console.log("Delete clicked", id);
  };
  const handleOpenStaffingReport = (id: number | string) => {
    router.push(`${currentPath}/invoice/${id}`);
  };
  const actions = [
    { icon: <FaEye />, Click: handleOpenStaffingReport, name: "view" },
    { icon: <FaEdit />, Click: handleEdit },
    { icon: <FaTrash />, Click: handleDelete, name: "delete" },
  ];
  return (
    <StaffingReportsItems
      headers={headers}
      data={dummyItemsData}
      action={actions}
      allowItemsSummationFooter={true}
    />
  );
};
export default Page;
