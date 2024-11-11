"use client";
import useSWR, { mutate } from "swr";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import StaffingReportsItems from "@/components/dashboard/pages/reportItems";
import { headers } from "@/app/tableHeaders/staffingItems";
import {
  useRouter,
  usePathname,
  useParams,
  useSearchParams,
} from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { setPageTitle } from "@/redux/reducers/pageTitleSwitching";
import { useDispatch } from "react-redux";
import {
  deleteStuffingReportsItemsDetail,
  generateStuffingReport,
  getStuffingReportsItems,
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
import { Button } from "@/components/ui/button";
import { withRolesAccess } from "@/components/auth/accessRights";
import {
  generateTableHTML,
  printStyles,
} from "@/app/utilities/stiffingReportprintFormat";
const Page = () => {
  const router = useRouter();
  const params = useParams();
  const reportRef = useRef(null);
  const currentPath = usePathname();
  const dispatch = useDispatch();
  const searchParams: any = useSearchParams();
  const staffReportId = params?.id;
  const session: any = useSession();
  const UserRole = session?.data?.role;
  const [generateReprt, setGenerateReport] = useState<boolean>(false);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const cacheKey = `/stuffingreports/${Number(staffReportId)}`;
  const { data, isLoading, error } = useSWR(
    [cacheKey, reload],
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
    if (data?.shipments && data?.stuffingRpt?.stuffingstatus !== "preview") {
      dispatch(setPageTitle("Stuffing report"));
    } else {
      dispatch(setPageTitle("Stuffing report preview"));
    }
  }, [dispatch, data]);
  useEffect(() => {
    if (searchParams?.get("export") && Array.isArray(data?.shipments)) {
      exportDataInExcel(data?.shipments, headers, `${data?.stuffingRpt?.code}`);
      router.back();
    }
  }, [searchParams, data?.shipments, router, data?.stuffingRpt?.code]);
  const handleEdit = async (id: number | string) => {
    if (data?.status != "closed") {
      router.push(`${currentPath}/edit/${id}`);
    } else {
      toast.error("This stuffing report is closed");
    }
  };
  const handleDelete = async (id: number) => {
    if (data?.status != "closed") {
      const response = await deleteStuffingReportsItemsDetail(
        Number(staffReportId),
        id
      );
      if (response.status == 200) {
        toast.success(response.message);
        mutate(cacheKey);
      } else {
        toast.error(response.message);
      }
    } else {
      toast.error("Could not delete this product.");
    }
  };
  const handleOpenStaffingReport = async (id: number | string) => {
    router.push(`${currentPath}/shippinginstruction/${id}`);
  };
  const generateStuffingReprt = async () => {
    setLoading(true);
    try {
      const { message, status } = await generateStuffingReport(
        Number(staffReportId)
      );
      if (status == 200) {
        toast.success(message);
        setReload(!reload);
        mutate(cacheKey);
      } else {
        toast.error(message);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };
  const actions = [
    { icon: <FaEye />, Click: handleOpenStaffingReport, name: "view" },
    {
      icon: <FaEdit className={role !== "origin agent" ? "hidden" : ""} />,
      Click: handleEdit,
    },
    {
      icon: <FaTrash className={role !== "origin agent" ? "hidden" : ""} />,
      Click: handleDelete,
      name: "delete",
    },
  ];
  useEffect(() => {
    const allShippingInstructionAvailable =
      Array.isArray(data?.shipments) &&
      data.shipments.every(
        (shipment: NewStuffingItem) => shipment?.instructionPrepared == true
      );
    setGenerateReport(allShippingInstructionAvailable);
  }, [data?.shipments]);
  useEffect(() => {
    setRole(UserRole);
  }, [UserRole]);

  const printReport = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      toast.error("Please allow popups for printing");
      return;
    }
    const headerInfo = {
      containerNumber: data?.stuffingRpt?.code || "",
      blNumber: data?.stuffingRpt?.blCode || "",
      packagingType: data?.stuffingRpt?.packagingType || "",
      containerStatus: data?.stuffingRpt?.stuffingstatus || "",
      reportStatus: data?.stuffingRpt?.status || "",
    };
    const headerTemplate = `
      <div class="header-info">
        <p>Container number: ${headerInfo.containerNumber}</p>
        <p>BL Number: ${headerInfo.blNumber}</p>
        <p>Packaging type: ${headerInfo.packagingType}</p>
        <p>Container status: <span class="status-${headerInfo.containerStatus.toLowerCase()}">${
      headerInfo.containerStatus
    }</span></p>
        <p>Stuffing report status: <span class="status-${headerInfo.reportStatus.toLowerCase()}">${
      headerInfo.reportStatus
    }</span></p>
      </div>
    `;

    // Generate clean table HTML
    const tableHTML = generateTableHTML(data.shipments, headers, data.totals);
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Stuffing Report - ${headerInfo.containerNumber}</title>
          ${printStyles}
        </head>
        <body>
          <div class="print-container">
            ${headerTemplate}
            <div class="table-container">
              ${tableHTML}
            </div>
          </div>
          <script>
            window.onload = () => {
              window.print();
              window.onafterprint = () => {
                window.close();
              };
            }
          </script>
        </body>
      </html>
    `);

    printWindow.document.close();
  };
  if (data?.shipments && data?.stuffingRpt?.stuffingstatus == "preview") {
    return (
      <div className="w-full overflow-scroll">
        <StaffingReportsItems
          headers={headers}
          data={data?.shipments}
          action={actions}
          allowItemsSummationFooter={true}
          summation={data?.totals}
          stuffingRprt={true}
        />
        <div
          className={
            generateReprt &&
            data?.shipments?.length > 0 &&
            role == "origin agent"
              ? "mt-8"
              : "hidden"
          }
        >
          <Button
            variant="secondary"
            onClick={generateStuffingReprt}
            disabled={loading}
            className="disabled:opacity-70 disabled:cursor-not-allowed"
          >
            Generate stuffing report
          </Button>
        </div>
      </div>
    );
  }
  if (data?.shipments && data?.stuffingRpt?.stuffingstatus !== "preview") {
    return (
      <>
        <div className="w-full overflow-scroll" ref={reportRef}>
          <StaffingReportsItems
            headers={headers}
            data={data?.shipments}
            allowItemsSummationFooter={true}
            summation={data?.totals}
            stuffingRprt={true}
            preparedRprt={true}
          />
        </div>
        <div className="mt-6">
          <Button
            variant="secondary"
            onClick={printReport}
            disabled={loading}
            className="disabled:opacity-70 disabled:cursor-not-allowed"
          >
            Print report
          </Button>
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
export default withRolesAccess(Page, [
  "origin agent",
  "admin",
  "finance",
  "head of finance",
]);
