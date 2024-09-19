"use client";
import { FaEdit, FaTrash } from "react-icons/fa";
import Sites from "@/components/dashboard/pages/sites";
import { headers } from "@/app/tableHeaders/sites";
import { locations } from "@/app/dummyData/locations";
import { useDispatch } from "react-redux";
import { setPageTitle } from "@/redux/reducers/pageTitleSwitching";
import { useEffect } from "react";
const Page = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle("Admin - Delivery sites"));
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
  return <Sites headers={headers} data={locations} action={actions} />;
};

export default Page;
