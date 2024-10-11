"use client";
import useSWR from "swr";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import StaffingReportsItems from "@/components/dashboard/pages/reportItems";
import { headers } from "@/app/tableHeaders/staffingItems";
import {
  useRouter,
  usePathname,
  useParams,
  useSearchParams,
} from "next/navigation";
import { useEffect } from "react";
import { setPageTitle } from "@/redux/reducers/pageTitleSwitching";
import { useDispatch } from "react-redux";
import {
  getStuffingReport,
  getStuffingReportsItems,
  stuffingReportEndpoint,
} from "@/app/httpservices/stuffingReport";
import {
  NewStuffingItem,
  StuffingReportTotals,
} from "@/interfaces/stuffingItem";
import { StuffingReport } from "@/interfaces/stuffingreport";
import Loader from "@/appComponents/pageBlocks/loader";
import ErrorSection from "@/appComponents/pageBlocks/errorDisplay";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import exportDataInExcel from "@/app/utilities/exportdata";
const Page = () => {
  const router = useRouter();
  const params = useParams();
  const currentPath = usePathname();
  const dispatch = useDispatch();
  const searchParams: any = useSearchParams();
  const staffReportId = params?.id;
  const session: any = useSession();
  const role = session?.data?.role;
  const cacheKey = `/stuffingreports/${Number(staffReportId)}`;
  const { data: stuffingreport } = useSWR(stuffingReportEndpoint, () =>
    getStuffingReport(Number(staffReportId))
  );
  const { data, isLoading, error } = useSWR(
    cacheKey,
    () => getStuffingReportsItems(Number(staffReportId)),
    {
      onSuccess: (data: {
        shipments: NewStuffingItem[];
        stuffingRpt: StuffingReport;
        totals: StuffingReportTotals;
      }) => data.shipments.sort((a, b) => (b.id ?? 0) - (a.id ?? 0)),
    }
  );

  useEffect(() => {
    dispatch(setPageTitle("Stuffing report"));
  }, [dispatch]);
  useEffect(() => {
    if (searchParams?.get("export") && Array.isArray(data?.shipments)) {
      exportDataInExcel(data?.shipments, headers, `${data?.stuffingRpt?.code}`);
      router.back();
    }
  }, [searchParams]);
  const handleEdit = async (id: number | string) => {
    if (stuffingreport?.status != "closed") {
      router.push(`${currentPath}/edit/${id}`);
    } else {
      toast.error("This stuffing report is closed");
    }
  };
  const handleDelete = async (id: number | string) => {
    if (stuffingreport?.status != "closed") {
      router.push(`${currentPath}/edit/${id}`);
    } else {
      toast.error("This stuffing report is closed");
    }
  };
  const handleOpenStaffingReport = async (id: number | string) => {
    router.push(`${currentPath}/invoice/${id}`);
  };
  const actions = [
    { icon: <FaEye />, Click: handleOpenStaffingReport, name: "view" },
    {
      icon: <FaEdit className={role == "operation manager" ? "hidden" : ""} />,
      Click: handleEdit,
    },
    {
      icon: <FaTrash className={role == "operation manager" ? "hidden" : ""} />,
      Click: handleDelete,
      name: "delete",
    },
  ];
  if (data?.shipments) {
    return (
      <StaffingReportsItems
        headers={headers}
        data={data?.shipments}
        action={actions}
        allowItemsSummationFooter={true}
        summation={data?.totals}
      />
    );
  }
  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <ErrorSection />;
  }
};
export default Page;
