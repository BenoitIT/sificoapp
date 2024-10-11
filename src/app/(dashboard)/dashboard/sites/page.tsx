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
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { setPageTitle } from "@/redux/reducers/pageTitleSwitching";
import { Suspense, useCallback, useEffect, useState } from "react";
import { NewSite } from "@/interfaces/sites";
import Loader from "@/appComponents/pageBlocks/loader";
import { toast } from "react-toastify";
import ErrorSection from "@/appComponents/pageBlocks/errorDisplay";
import useDebounce from "@/app/utilities/debouce";
import Paginator from "@/components/pagination/paginator";
import exportDataInExcel from "@/app/utilities/exportdata";
const Page = () => {
  const dispatch = useDispatch();
  const currentpath: string = usePathname()!;
  const router = useRouter();
  const searchParams: any = useSearchParams();
  const searchValue = searchParams?.get("search") || "";
  const [search, setSearch] = useState(searchValue);
  const searchValues = useDebounce(search, 2000);
  const activePage = searchParams?.get("page");
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: locations,
    isLoading,
    error,
  } = useSWR(
    [deliverySitesEndpoint, searchValues, currentPage],
    () => getAllsites(searchValues, currentPage),
    {
      onSuccess: (data: NewSite[]) =>
        data.sort((a, b) => (b.id ?? 0) - (a.id ?? 0)),
    }
  );
  useEffect(() => {
    dispatch(setPageTitle("Delivery sites"));
  }, [dispatch]);
  useEffect(() => {
    setSearch(searchValue);
  }, [searchValue]);
  useEffect(() => {
    if (searchParams?.get("export")) {
      exportDataInExcel(locations, headers, "delivery destinations");
      router.back();
    }
  }, [searchParams]);
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );
  const handlePageChange = (pageNumber: number) => {
    router.push(`?${createQueryString("page", pageNumber.toString())}`);
  };
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      router.push(
        `?${createQueryString("page", (currentPage - 1).toString())}`
      );
    }
  };
  const handleNextPage = () => {
    if (Array.isArray(locations) && locations.length > currentPage) {
      router.push(
        `?${createQueryString(
          "page",
          (Number(currentPage) + Number(1)).toString()
        )}`
      );
    }
  };
  useEffect(() => {
    if (activePage) {
      setCurrentPage(activePage);
    }
  }, [activePage]);
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
    return (
      <>
        <Sites headers={headers} data={locations} action={actions} />
        <div className="flex justify-end w-full mt-2">
          <Paginator
            activePage={currentPage}
            totalPages={
              Array.isArray(locations) && Math.ceil(locations.length / 13) < 1
                ? 1
                : Math.ceil(locations.length / 13)
            }
            onPageChange={handlePageChange}
            onPreviousPageChange={handlePreviousPage}
            onNextPageChange={handleNextPage}
          />
        </div>
      </>
    );
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
