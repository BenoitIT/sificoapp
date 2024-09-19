"use client";
import { Users } from "@/app/dummyData/users";
import { headers } from "@/app/tableHeaders/users";
import { FaEdit, FaTrash } from "react-icons/fa";
import Staff from "@/components/dashboard/pages/staff";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setPageTitle } from "@/redux/reducers/pageTitleSwitching";
const Page = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle("Admin - staff"));
  }, [dispatch]);
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
  return <Staff headers={headers} data={Users} action={actions} />;
};

export default Page;
