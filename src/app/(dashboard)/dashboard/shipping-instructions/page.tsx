"use client";
import { FaEye } from "react-icons/fa";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { setPageTitle } from "@/redux/reducers/pageTitleSwitching";
import { Suspense, useEffect, useState, useCallback } from "react";
import Loader from "@/appComponents/pageBlocks/loader";
import Paginator from "@/components/pagination/paginator";
import usePagination from "@/app/utilities/usePagination";
import ShippingInstruction from "@/components/dashboard/pages/shippingInstruction";
import { headersShippingInstructions } from "@/app/tableHeaders/shiipingInstruction";
import useSWR from "swr";
import {
  getAllshippinginstructions,
  getShippinginstructioninLocation,
  shippinginstructionEndpoint,
} from "@/app/httpservices/shippinginstruction";
import ErrorSection from "@/appComponents/pageBlocks/errorDisplay";
import { withRolesAccess } from "@/components/auth/accessRights";
import { useSession } from "next-auth/react";
import useDebounce from "@/app/utilities/debouce";

const Page = () => {
  const router = useRouter();
  const currentPath = usePathname();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const session: any = useSession();
  const userId = session?.data?.id;
  const role = session?.data?.role;
  const searchValue = searchParams?.get("search") || "";
  const activePage = searchParams?.get("page");
  const [search, setSearch] = useState(searchValue);
  const searchValues = useDebounce(search, 1000);
  const [currentPage, setCurrentPage] = useState(1);
  const fetcher = useCallback(async () => {
    if (role === "operation manager" && userId) {
      return getShippinginstructioninLocation(userId, searchValue, currentPage);
    } else {
      return getAllshippinginstructions(searchValues, currentPage);
    }
  }, [role, userId, searchValues, currentPage]);
  const { data, isLoading, error } = useSWR(
    [role ? shippinginstructionEndpoint : null, searchValues, currentPage],
    fetcher
  );

  useEffect(() => {
    dispatch(setPageTitle("Shipping instructions"));
  }, [dispatch]);

  useEffect(() => {
    setSearch(searchValue);
  }, [searchValue]);

  const { handlePageChange, handleNextPage, handlePreviousPage } =
    usePagination(data, currentPage);

  useEffect(() => {
    if (activePage) {
      setCurrentPage(Number(activePage));
    }
  }, [activePage]);

  const handleOpenStaffingReport = async (id: number | string) => {
    router.push(`${currentPath}/${id}`);
  };

  const actions = [
    { icon: <FaEye />, Click: handleOpenStaffingReport, name: "view" },
  ];

  if (isLoading) return <Loader />;
  if (error) return <ErrorSection />;

  return (
    <div className="w-full">
      <ShippingInstruction
        headers={headersShippingInstructions}
        data={data?.data}
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
};

const SuspensePage = () => (
  <Suspense fallback={<Loader />}>
    <Page />
  </Suspense>
);

export default withRolesAccess(SuspensePage, [
  "origin agent",
  "admin",
  "operation manager",
  "finance",
  "head of finance",
]) as React.FC;
