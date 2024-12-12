"use client";
import useSWR, { mutate } from "swr";
import { FaTrash, FaEye } from "react-icons/fa";
import ContainerListShipp from "@/components/dashboard/pages/shippContainerList";
import { containerListHeaders } from "@/app/tableHeaders/staffingReports";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { setPageTitle } from "@/redux/reducers/pageTitleSwitching";
import { Suspense, useEffect, useState } from "react";
import {
  deleteStuffingReports,
  stuffingReportEndpoint,
} from "@/app/httpservices/stuffingReport";
import { StuffingReport } from "@/interfaces/stuffingreport";
import Loader from "@/appComponents/pageBlocks/loader";
import ErrorSection from "@/appComponents/pageBlocks/errorDisplay";
import { useSession } from "next-auth/react";
import useDebounce from "@/app/utilities/debouce";
import Paginator from "@/components/pagination/paginator";
import usePagination from "@/app/utilities/usePagination";
import { toast } from "react-toastify";
import { getAllContainers } from "@/app/httpservices/stuffingReport";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
const Page = () => {
  const router = useRouter();
  const currentPath = usePathname();
  const searchParams: any = useSearchParams();
  const dispatch = useDispatch();
  const session: any = useSession();
  const role = session?.data?.role;
  const userId = session?.data?.id;
  const workPlace=session?.data?.workCountry;
  const searchValue = searchParams?.get("search") || "";
  const addData = searchParams?.get("added") || "";
  const [search, setSearch] = useState(searchValue);
  const searchValues = useDebounce(search, 1000);
  const activePage = searchParams?.get("page");
  const [currentPage, setCurrentPage] = useState(1);
  const [reload, setReload] = useState(false);
  const [rowId, setRowId] = useState<any>();
  const { data, isLoading, error } = useSWR(
    [stuffingReportEndpoint, searchValues, currentPage, reload, addData],
    () => getAllContainers(searchValues, currentPage,workPlace)
  );
  useEffect(() => {
    dispatch(setPageTitle("Containers - Instructions"));
  }, [dispatch]);
  useEffect(() => {
    setSearch(searchValue);
  }, [searchValue]);
  const { handlePageChange, handleNextPage, handlePreviousPage } =
    usePagination(data?.customers, currentPage);
  useEffect(() => {
    if (activePage) {
      setCurrentPage(activePage);
    }
  }, [activePage]);
  const handleOpenStaffingReport = async (id: number | string) => {
    router.push(`${currentPath}/${id}/shipping-instructions`);
  };
  const handleDelete = async (id: number) => {
    setRowId(id);
  };
  const handleConfirmDelete = async (id: number) => {
    try {
      const response = await deleteStuffingReports(id);
      if (response.status == 200) {
        toast.success(response.message);
        mutate(stuffingReportEndpoint);
        setReload(!reload);
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      toast.error("Failed to delete container.");
    }
  };
  const actions = [
    { icon: <FaEye />, Click: handleOpenStaffingReport, name: "view" },
    {
      icon: (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <FaTrash className={role != "senior operation manager" ? "hidden" : ""} />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription className="text-sm text-white opacity-65">
                This action cannot be undone. This will permanently container
                and associated data.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  handleConfirmDelete(rowId);
                }}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ),
      Click: handleDelete,
      name: "delete",
    },
  ];
  if (data?.containers) {
    const stuffingreports =
      role == "operation manager" && Array.isArray(data?.containers)
        ? data?.containers.filter(
            (stuff: StuffingReport) => stuff.operatorId == userId
          )
        : data?.containers;
    return (
      <div className="w-full">
        <ContainerListShipp
          headers={containerListHeaders}
          data={stuffingreports}
          action={actions}
        />
        <div className="flex justify-end w-full mt-2">
          <Paginator
            activePage={currentPage}
            totalPages={data?.count || 1}
            onPageChange={handlePageChange}
            onPreviousPageChange={handlePreviousPage}
            onNextPageChange={handleNextPage}
          />
        </div>
      </div>
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
