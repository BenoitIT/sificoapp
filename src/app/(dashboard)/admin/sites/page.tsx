"use client";
import { Users } from "@/app/dummyData/users";
import { headers } from "@/app/tableHeaders/users";
import { FaEdit, FaTrash } from "react-icons/fa";
import Sites from "@/components/dashboard/pages/sites";
const Page = () => {
  const handleEdit = (id: number | string) => {
    console.log("Edit clicked", id);
  };
  const handleDelete = (id: number | string) => {
    console.log("Delete clicked", id);
  };
  const actions = [
    { icon: <FaEdit />, Click: handleEdit },
    { icon: <FaTrash />, Click: handleDelete, name: "delete" },
  ];
  return <Sites headers={headers} data={Users} action={actions} />;
};

export default Page;
