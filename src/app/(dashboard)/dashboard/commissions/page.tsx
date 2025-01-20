"use client";
import useSWR from "swr";
import { useEffect } from "react";
import { setPageTitle } from "@/redux/reducers/pageTitleSwitching";
import { useDispatch } from "react-redux";
import CommissionSection from "@/components/dashboard/pages/commission";
import { commissionsHeaders } from "@/app/tableHeaders/commisions";
import { useState } from "react";
import {
  commisionsEndpoint,
  getAllCommissions,
} from "@/app/httpservices/commision";
import Loader from "@/appComponents/pageBlocks/loader";
import ErrorSection from "@/appComponents/pageBlocks/errorDisplay";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import useDebounce from "@/app/utilities/debouce";
import { withRolesAccess } from "@/components/auth/accessRights";
import Paginator from "@/components/pagination/paginator";
import usePagination from "@/app/utilities/usePagination";
import { sifcoApi } from "@/app/httpservices/axios";
const Page = () => {
  const dispatch = useDispatch();
  const session: any = useSession();
  const token = session?.data?.accessToken;
  const searchParams = useSearchParams();
  const searchValue = searchParams?.get("search") || "";
  const [search, setSearch] = useState(searchValue);
  const searchValues = useDebounce(search, 1000);
  const [currentPage, setCurrentPage] = useState(1);
  const activePage = searchParams?.get("page");
  const { data, isLoading, error } = useSWR(
    [commisionsEndpoint, searchValues, currentPage,token],
    () => getAllCommissions(searchValues, currentPage)
  );
  const { handlePageChange, handleNextPage, handlePreviousPage } =
    usePagination(data?.data, currentPage);
  useEffect(() => {
    dispatch(setPageTitle("Commission debursement"));
    sifcoApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }, [dispatch]);
  useEffect(() => {
    setSearch(searchValue);
  }, [searchValue]);
  useEffect(() => {
    if (activePage) {
      setCurrentPage(Number(activePage));
    }
  }, [activePage]);
 

  if (data?.data) {
    return (
      <div className="w-full">
        <CommissionSection
          headers={commissionsHeaders}
          data={data?.data}
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
    return <ErrorSection message={error.message}/>;
  }
};
export default withRolesAccess(Page, [
  "finance",
  "admin",
  "head of finance",
]) as React.FC;
