"use client";

import useSWR, { mutate } from "swr";
import { usersBaseEndpoint as cacheKey } from "@/app/httpservices/axios";
import { headers } from "@/app/tableHeaders/users";
import { FaEdit, FaTrash } from "react-icons/fa";
import Staff from "@/components/dashboard/pages/staff";
import { useDispatch } from "react-redux";
import { Suspense, useCallback, useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { setPageTitle } from "@/redux/reducers/pageTitleSwitching";
import { deleteUser, getAllUsers } from "@/app/httpservices/users";
import { NewStaff } from "@/interfaces/staff";
import { toast } from "react-toastify";
import Loader from "@/appComponents/pageBlocks/loader";
import ErrorSection from "@/appComponents/pageBlocks/errorDisplay";
import { useSession } from "next-auth/react";
import useDebounce from "@/app/utilities/debouce";
import exportDataInExcel from "@/app/utilities/exportdata";
const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const session: any = useSession();
  const userId = session?.data?.id;
  const currentpath: string = usePathname()!;
  const searchParams: any = useSearchParams();
  const searchValue = searchParams?.get("search") || "";
  const [search, setSearch] = useState(searchValue);
  const searchValues = useDebounce(search, 2000);
  const {
    data: staff,
    isLoading,
    error,
  } = useSWR([cacheKey, searchValues], () => getAllUsers(searchValues), {
    onSuccess: (data: NewStaff[]) =>
      data.sort((a, b) => (b.id ?? 0) - (a.id ?? 0)),
  });
  useEffect(() => {
    dispatch(setPageTitle("Staff"));
  }, [dispatch]);
  useEffect(() => {
    setSearch(searchValue);
  }, [searchValue]);
  useEffect(() => {
    if (searchParams?.get("export")) {
      exportDataInExcel(staff, headers, "Staff");
      router.back();
    }
  }, [searchParams]);
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
    const filteredStaff = Array.isArray(staff)
      ? staff?.filter((user: NewStaff) => user.id != userId)
      : staff;
    return <Staff headers={headers} data={filteredStaff} action={actions} />;
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
