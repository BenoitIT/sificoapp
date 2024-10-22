"use client";
import { FaEye } from "react-icons/fa";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { setPageTitle } from "@/redux/reducers/pageTitleSwitching";
import { Suspense, useEffect, useState } from "react";
import Loader from "@/appComponents/pageBlocks/loader";
import Paginator from "@/components/pagination/paginator";
import usePagination from "@/app/utilities/usePagination";
import ShippingInstruction from "@/components/dashboard/pages/shippingInstruction";
import { headersShippingInstructions } from "@/app/tableHeaders/shiipingInstruction";
import useSWR from "swr";
import {
  getAllshippinginstructions,
  shippinginstructionEndpoint,
} from "@/app/httpservices/shippinginstruction";
import ErrorSection from "@/appComponents/pageBlocks/errorDisplay";
import { withRolesAccess } from "@/components/auth/accessRights";
const Page = () => {
  const router = useRouter();
  const currentPath = usePathname();
  const searchParams: any = useSearchParams();
  const dispatch = useDispatch();
  // const session: any = useSession();
  const searchValue = searchParams?.get("search") || "";
  // const addData = searchParams?.get("added") || "";
  const [search, setSearch] = useState(searchValue);
  console.log(search)
  // const searchValues = useDebounce(search, 1000);
  const activePage = searchParams?.get("page");
  const [currentPage, setCurrentPage] = useState(1);
  // const [reload, setReload] = useState(false);
  const { data, isLoading, error } = useSWR(
    shippinginstructionEndpoint,
    getAllshippinginstructions
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
      setCurrentPage(activePage);
    }
  }, [activePage]);

  const handleOpenStaffingReport = async (id: number | string) => {
    router.push(`${currentPath}/${id}`);
  };
  const actions = [
    { icon: <FaEye />, Click: handleOpenStaffingReport, name: "view" },
  ];
  if (data) {
    return (
      <div className="w-full">
        <ShippingInstruction
          headers={headersShippingInstructions}
          data={data}
          action={actions}
        />
        <div className="flex justify-end w-full mt-2">
          <Paginator
            activePage={currentPage}
            totalPages={1}
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

export default withRolesAccess(SuspensePage, ["origin agent", "admin"]) as React.FC;
