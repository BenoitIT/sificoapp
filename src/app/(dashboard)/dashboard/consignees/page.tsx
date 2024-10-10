"use client"; // This ensures the component is rendered on the client-side

import useSWR, { mutate } from "swr";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useEffect, useState, Suspense } from "react";
import { setPageTitle } from "@/redux/reducers/pageTitleSwitching";
import { headers } from "@/app/tableHeaders/consignees";
import Consignee from "@/components/dashboard/pages/consignee";
import {
  getAllconsignees,
  consigneesEndpoint,
  deleteConsignee,
} from "@/app/httpservices/consignee";
import { NewShipper } from "@/interfaces/shipper";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Loader from "@/appComponents/pageBlocks/loader";
import { toast } from "react-toastify";
import ErrorSection from "@/appComponents/pageBlocks/errorDisplay";
import useDebounce from "@/app/utilities/debouce";

const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const currentpath: string = usePathname()!;
  const searchParams: any = useSearchParams();
  const searchValue = searchParams?.get("search") || "";
  const [search, setSearch] = useState(searchValue);
  const searchValues = useDebounce(search, 2000);

  const {
    data: consignees,
    isLoading,
    error,
  } = useSWR(
    [consigneesEndpoint, searchValues],
    () => getAllconsignees(searchValues),
    {
      onSuccess: (data: NewShipper[]) =>
        data.sort((a, b) => (b.id ?? 0) - (a.id ?? 0)),
    }
  );

  useEffect(() => {
    dispatch(setPageTitle("Customers"));
  }, [dispatch]);

  useEffect(() => {
    setSearch(searchValue);
  }, [searchValue]);

  const handleEdit = async (id: number | string) => {
    router.push(`${currentpath}/${id}`);
  };

  const handleDelete = async (id: number) => {
    try {
      const message = await deleteConsignee(id);
      toast.success(message);
      mutate(consigneesEndpoint);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete this customer");
    }
  };

  const actions = [
    { icon: <FaEdit />, Click: handleEdit },
    { icon: <FaTrash />, Click: handleDelete, name: "delete" },
  ];

  if (consignees) {
    return <Consignee headers={headers} data={consignees} action={actions} />;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorSection />;
  }

  return null;
};
const SuspensePage = () => (
  <Suspense fallback={<Loader />}>
    <Page />
  </Suspense>
);

export default SuspensePage;
