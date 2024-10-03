"use client";
import useSWR, { mutate } from "swr";
import { usersBaseEndpoint as cacheKey } from "@/app/httpservices/axios";
import { headers } from "@/app/tableHeaders/users";
import { FaEdit, FaTrash } from "react-icons/fa";
import Staff from "@/components/dashboard/pages/staff";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useRouter,usePathname } from "next/navigation";
import { setPageTitle } from "@/redux/reducers/pageTitleSwitching";
import { deleteUser, getAllUsers } from "@/app/httpservices/users";
import { NewStaff } from "@/interfaces/staff";
import { toast } from "react-toastify";
import Loader from "@/appComponents/pageBlocks/loader";
import ErrorSection from "@/appComponents/pageBlocks/errorDisplay";
const Page = () => {
  const dispatch = useDispatch();
  const router=useRouter();
  const currentpath:string=usePathname()!;
  const {
    data: staff,
    isLoading,
    error,
  } = useSWR(cacheKey, getAllUsers, {
    onSuccess: (data: NewStaff[]) =>
      data.sort((a, b) => (b.id ?? 0) - (a.id ?? 0)),
  });
  useEffect(() => {
    dispatch(setPageTitle("Staff"));
  }, [dispatch]);
  const handleEdit = async (id: number) => {
    router.push(`${currentpath}/${id}`);
  };
  const handleDelete = async (id: number) => {
    try {
      const message = await deleteUser(id);
      toast.success(message);
      mutate(cacheKey);
    } catch (err) {
      toast.error("Failed to delete this staff.");
    }
  };
  const actions = [
    { icon: <FaEdit />, Click: handleEdit },
    { icon: <FaTrash />, Click: handleDelete, name: "delete" },
  ];
  if (staff) {
    return <Staff headers={headers} data={staff} action={actions} />;
  }
  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <ErrorSection />;
  }
};

export default Page;
