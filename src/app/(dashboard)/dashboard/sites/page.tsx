"use client";
import useSWR, { mutate } from "swr";
import {
  getAllsites,
  deliverySitesEndpoint,
  deleteSite,
} from "@/app/httpservices/deliverySites";
import { FaEdit, FaTrash } from "react-icons/fa";
import Sites from "@/components/dashboard/pages/sites";
import { headers } from "@/app/tableHeaders/sites";
import { useDispatch } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { setPageTitle } from "@/redux/reducers/pageTitleSwitching";
import { useEffect } from "react";
import { NewSite } from "@/interfaces/sites";
import Loader from "@/appComponents/pageBlocks/loader";
import { toast } from "react-toastify";
import ErrorSection from "@/appComponents/pageBlocks/errorDisplay";
const Page = () => {
  const dispatch = useDispatch();
  const currentpath: string = usePathname()!;
  const router = useRouter();
  const {
    data: locations,
    isLoading,
    error,
  } = useSWR(deliverySitesEndpoint, getAllsites, {
    onSuccess: (data: NewSite[]) =>
      data.sort((a, b) => (b.id ?? 0) - (a.id ?? 0)),
  });
  useEffect(() => {
    dispatch(setPageTitle("Delivery sites"));
  }, [dispatch]);
  const handleEdit = async (id: number | string) => {
    router.push(`${currentpath}/${id}`);
  };
  const handleDelete = async (id: number) => {
    try {
      const message = await deleteSite(id);
      toast.success(message);
      mutate(deliverySitesEndpoint);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete this delivery site");
    }
  };
  const actions = [
    { icon: <FaEdit />, Click: handleEdit },
    { icon: <FaTrash />, Click: handleDelete, name: "delete" },
  ];
  if (locations) {
    return <Sites headers={headers} data={locations} action={actions} />;
  }
  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <ErrorSection />;
  }
};

export default Page;
