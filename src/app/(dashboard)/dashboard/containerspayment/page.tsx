"use client";
import useSWR from "swr";
import { useEffect, Suspense, useState } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "@/redux/reducers/pageTitleSwitching";
import ContainersPayments from "@/components/dashboard/pages/containersPayment";
import { contPymentheaders } from "@/app/tableHeaders/containerPayment";
import { FaEye } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import Loader from "@/appComponents/pageBlocks/loader";
import {
  containersPyamentEndpoint,
  getAllContainerPaymentPerPlace,
} from "@/app/httpservices/containerPayment";
import ErrorSection from "@/appComponents/pageBlocks/errorDisplay";
import { useSearchParams } from "next/navigation";
import useDebounce from "@/app/utilities/debouce";
import { withRolesAccess } from "@/components/auth/accessRights";
const Page = () => {
  const dispatch = useDispatch();
  const searchParam = useSearchParams();
  const currentPath = usePathname();
  const router = useRouter();
  const searchParams: any = useSearchParams();
  const locationCode = searchParam?.get("location") || "KGL";
  const searchValue = searchParams?.get("search") || "";
  const [search, setSearch] = useState(searchValue);
  const searchValues = useDebounce(search, 1000);
  const { data, isLoading, error } = useSWR(
    [containersPyamentEndpoint, locationCode, searchValues],
    () => getAllContainerPaymentPerPlace(locationCode, searchValues)
  );
  useEffect(() => {
    dispatch(setPageTitle("Containers Payments"));
  }, [dispatch]);
  useEffect(() => {
    setSearch(searchValue);
  }, [searchValue]);
  const handleView = async (id: number) => {
    router.push(`${currentPath}/${id}`);
  };
  const actions = [
    { icon: <FaEye className="ml-4" />, Click: handleView, name: "view" },
  ];
  if (data) {
    return (
      <Suspense fallback={<Loader />}>
        <ContainersPayments
          headers={contPymentheaders}
          data={data}
          action={actions}
        />
      </Suspense>
    );
  }
  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    <ErrorSection />;
  }
};
export default withRolesAccess(Page, ["admin","finance","head of finance"]) as React.FC;
