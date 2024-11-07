"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import useSWR, { mutate } from "swr";
import jsPdf from "jspdf";
import html2Canvas from "html2canvas";
import { setPageTitle } from "@/redux/reducers/pageTitleSwitching";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  generateInvoice,
  getStuffingReportsItemsInvoice,
  PayInvoice,
} from "@/app/httpservices/stuffingReport";
import { MdDownload } from "react-icons/md";
import { InvoiceGenerationDetails } from "@/app/(dashboard)/dashboard/stuffing-reports/[id]/invoice/[invId]/(invoicedetails)/generationdetails";
import { Loader } from "lucide-react";
import ErrorSection from "@/appComponents/pageBlocks/errorDisplay";
import { toast } from "react-toastify";
import { formatDate } from "@/app/utilities/dateFormat";
import Back from "@/components/ui/back";
import { useSession } from "next-auth/react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { GiTakeMyMoney } from "react-icons/gi";
interface invoiceProps {
  itemsId: number;
  invoiceId: number;
}
const Invoice = ({ itemsId, invoiceId }: invoiceProps) => {
  const session: any = useSession();
  const staffId = session?.data?.id;
  const currentUserName = session?.data?.firstname;
  const cacheKey = `stuffingreports/${itemsId}/invoice/${invoiceId}`;
  const dispatch = useDispatch();
  const [vat, setVat] = useState<string>("");
  const [totalInwords, setTotalInwords] = useState<string>("");
  const [paidAmount, setPaidAmount] = useState<number>();
  const { data, isLoading, error } = useSWR(cacheKey, () =>
    getStuffingReportsItemsInvoice(itemsId, invoiceId)
  );
  const invoiceRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    dispatch(setPageTitle("Invoice"));
  }, [dispatch]);

  const ExportInvoicePDf = async () => {
    const invoice = invoiceRef?.current;
    if (totalInwords == "" && !data?.totalAmountInWords) {
      return toast.error("Write total amount in words please.");
    }
    const payload = {
      vat: Number(vat),
      totalAmountInWords: totalInwords,
      detailsId: data?.invoiceNo,
      createdBy: staffId,
    };
    try {
      if (totalInwords) {
        const message = await generateInvoice(itemsId, invoiceId, payload);
        toast.success(message);
      }
      if (invoice) {
        const canvas = await html2Canvas(invoice);
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPdf({
          orientation: "portrait",
          unit: "px",
          format: "a4",
        });
        const width = pdf.internal.pageSize.getWidth();
        const height = (canvas.height * width) / canvas.width;
        pdf.addImage(imgData, "PNG", 0, 0, width, height);
        pdf.save(`${data?.consigneeId}-invoice.pdf`);
      }
      mutate(cacheKey);
    } catch (err) {
      console.error(err);
    }
  };
  const handlePayment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (paidAmount && paidAmount > 0) {
      const payload = {
        amountPaid: paidAmount,
        recievedBy: currentUserName,
      };
      try {
        const response: any = await PayInvoice(
          Number(itemsId),
          Number(invoiceId),
          payload
        );
        if (response?.status == 200) {
          toast.success(response?.message);
          setPaidAmount(0);
          mutate(cacheKey);
        } else {
          toast.error(response?.message);
        }
      } catch (err) {
        toast.error("failed to process payment");
      }
    } else {
      toast.error("Amount to pay should be provided.");
    }
  };

  if (data) {
    return (
      <div className="w-full text-black text-sm">
        {data?.totalAmountInWords == "total" ? (
          <div
            className={
              "m-1 md:m-2 bg-white py-6 px-10 flex justify-between  max-w-[1200px] border border-gray-100 shadow-xl sticky top-16 z-10 rounded"
            }
          >
            <div className="flex gap-2 items-center">
              <Back />
              <h1 className="font-semibold uppercase text-xs md:text-base">
                Invoice preview
              </h1>
            </div>
            <InvoiceGenerationDetails
              ExportInvoicePDf={ExportInvoicePDf}
              vat={vat ?? 0}
              setVat={setVat}
              totalInwords={totalInwords}
              setTotalInwords={setTotalInwords}
            />
          </div>
        ) : (
          <div className="w-[95%] flex flex-col md:flex-row justify-between pl-3">
            <Back />
            <div className="flex gap-2 flex-wrap text-sm">
              <em>
                Currently Paid amount:
                <span className="font-bold">
                  {" "}
                  {Intl.NumberFormat("en-us").format(data?.amountPaid)}$
                </span>
              </em>
              <em>
                invoice payment status:
                <span className="font-bold">
                  {data?.paymentStatus
                    ? "Paid"
                    : data.amountPaid > 0
                    ? "Partially paid"
                    : "Unpaid"}
                </span>
              </em>
              <em>
                Recieved by:
                <span className="font-bold">{data?.recievedBy ?? "-"}</span>
              </em>
              <Popover>
                <PopoverTrigger asChild>
                  <p
                    className={
                      data?.amountPaid == data?.totalUsd
                        ? "hidden"
                        : "font-bold text-blue-700 hover:cursor-pointer flex text-sm gap-1"
                    }
                  >
                    <span className="text-base">
                      <GiTakeMyMoney />
                    </span>
                    <span>Pay for invoice</span>
                  </p>
                </PopoverTrigger>
                <PopoverContent className="w-80 mr-4 shadow-md">
                  <form className="w-full" onSubmit={handlePayment}>
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          Enter amount, a customer is paying.
                        </p>
                      </div>
                      <div className="grid gap-3">
                        <div className="grid gap-2 text-sm text-gray-700">
                          <Label>Amount</Label>
                          <Input
                            type="number"
                            placeholder={data?.stuffingRpt?.origin}
                            name="amaount"
                            value={paidAmount || ""}
                            onChange={(e) =>
                              setPaidAmount(Number(e.target.value))
                            }
                            className={"placeholder:text-black"}
                          />
                        </div>
                      </div>
                      <div className="w-full flex justify-between">
                        <Button type="submit">save payment</Button>
                      </div>
                    </div>
                  </form>
                </PopoverContent>
              </Popover>

              <button
                className="text-blue-700 text-sm font-semibold bg-transparent border-none flex gap-1"
                onClick={ExportInvoicePDf}
              >
                <MdDownload className="text-lg mt-[1px]" />
                <span>DownLoad</span>
              </button>
            </div>
          </div>
        )}
        <div
          className="m-1 md:m-2 bg-white p-6 flex flex-col gap-2 max-w-[1200px] border border-gray-300 shadow-xl"
          ref={invoiceRef}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:w-[100%] w-full">
            <Image
              src="/images/logoo.png"
              alt="logo"
              width={250}
              height={250}
            />
            <div className="md:text-sm text-xs w-full">
              <div className=" mb-2 w-full">
                <h1 className="text-xs md:text-base font-bold uppercase text-right w-full">
                  Super International Freight Services company ltd
                </h1>
              </div>
              <div className="flex flex-col gap-1  text-right w-full">
                <p className="uppercase">
                  Makuza Peace Plaza - 4<sup>th</sup> Floor/ Kigali - Rwanda
                </p>
                <p>Tel: +250788713189 / 0799373436</p>
                <p>
                  Email:{" "}
                  <a
                    href="mailto:info@superfreightservice.com"
                    className="underline text-blue-600"
                  >
                    info@superfreightservice.com
                  </a>
                </p>
                <p>TIN NUMBER: 121348946</p>
              </div>
            </div>
          </div>
          <div className="w-full text-base font-semibold py-3 mt-2">
            <p className="text-center uppercase">
              <span className="ml-0 lg:-ml-[250px]">Invoice</span>
            </p>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="border border-b border-black">
                <TableCell className="border-r border-black text-black border-b border-b-white font-bold uppercase">
                  {data?.consigneeId}
                </TableCell>
                <TableCell className="border-r border-black text-black">
                  Invoice No.
                </TableCell>
                <TableCell className="border-r border-black text-black">
                  {data?.invoiceNo}
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="border-l border-r border-black border-b border-b-white uppercase">
                  {data?.consigneeLocation}
                </TableCell>
                <TableCell className="border-l border-r border-black border-b text-black">
                  Date
                </TableCell>
                <TableCell className="border-l border-r border-black border-b">
                  {formatDate(data.date ? data.date : new Date().toISOString())}
                </TableCell>
              </TableRow>
              <TableRow className="h-6">
                <TableCell className="border-l border-r border-black border-b border-b-white">
                  TEL: {data?.phone}
                </TableCell>
                <TableCell className="border-l border-r border-black border-b text-black">
                  Currency
                </TableCell>
                <TableCell className="border-l border-r border-black border-b ">
                  USD
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-l border-r border-black border-b border-b-white"></TableCell>
                <TableCell className="border-l border-r border-black border-b text-black">
                  Our Job No.
                </TableCell>
                <TableCell className="border-l border-r border-black border-b "></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-l border-r border-black border-b"></TableCell>
                <TableCell className="border-l border-r border-black border-b text-black">
                  Your reference
                </TableCell>
                <TableCell className="border-l border-r border-black border-b"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-l border-r border-black border-b">
                  Origin : <span className="uppercase">{data?.origin}</span>
                </TableCell>
                <TableCell className="border-l border-r border-black border-b text-black">
                  Destination
                </TableCell>
                <TableCell className="border-l border-r border-black border-b uppercase">
                  {data?.destination}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-l border-r border-black border-b text-black">
                  Remarks
                </TableCell>
                <TableCell className="border-l border-r border-black border-b capitalize">
                  Lines
                </TableCell>
                <TableCell className="border-l border-r border-black border-b">
                  {data?.line}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-l border-r border-black border-b text-black">
                  Container No
                </TableCell>
                <TableCell
                  colSpan={2}
                  className="border-l border-r border-black border-b"
                >
                  {data?.containerNo}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-l border-r border-black border-b text-black">
                  BL Number
                </TableCell>
                <TableCell
                  colSpan={2}
                  className="border-l border-r border-black border-b"
                >
                  {data?.blCode}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Table>
            <TableHeader>
              <TableRow className="border border-b text-black border-black">
                <TableCell className="border-r border-black font-bold">
                  Description
                </TableCell>
                <TableCell className="border-r border-black font-bold">
                  Qty/No of Pkg
                </TableCell>
                <TableCell className="border-r border-black font-bold">
                  Rate
                </TableCell>
                <TableCell className="border-r border-black font-bold">
                  VAT
                </TableCell>
                <TableCell className="border-r border-black font-bold">
                  Tax Amt
                </TableCell>
                <TableCell className="border-r border-black font-bold">
                  Total Amount
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="border-l border-r border-black border-b border-b-white uppercase">
                  FREIGHT CHARGES
                </TableCell>
                <TableCell className="border-l border-r border-black border-b border-b-white">
                  {data?.noOfPkgs}
                </TableCell>
                <TableCell className="border-l border-r border-black border-b border-b-white">
                  {data?.freight}
                </TableCell>
                <TableCell className="border-l border-r border-black border-b border-b-white">
                  {vat !== "" ? Number(vat) : data?.vat ?? 0 * 100}%
                </TableCell>
                <TableCell className="border-l border-r border-black border-b border-b-white">
                  {(data?.freight *
                    (vat !== "" ? Number(vat) : data?.vat ?? 0)) /
                    100}
                </TableCell>
                <TableCell className="border-l border-r border-black border-b border-b-white">
                  {data?.freight +
                    (data?.freight *
                      (vat !== "" ? Number(vat) : data?.vat ?? 0)) /
                      100}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-l border-r border-black border-b border-b-white uppercase">
                  BL FEE
                </TableCell>
                <TableCell className="border-l border-r border-black border-b border-b-white"></TableCell>
                <TableCell className="border-l border-r border-black border-b border-b-white"></TableCell>
                <TableCell className="border-l border-r border-black border-b border-b-white"></TableCell>
                <TableCell className="border-l border-r border-black border-b border-b-white"></TableCell>
                <TableCell className="border-l border-r border-black border-b border-b-white">
                  {data?.blFee}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-l border-r border-black border-b border-b-white uppercase">
                  LOCAL CHARGES
                </TableCell>
                <TableCell className="border-l border-r border-black border-b border-b-white"></TableCell>
                <TableCell className="border-l border-r border-black border-b border-b-white"></TableCell>
                <TableCell className="border-l border-r border-black border-b border-b-white"></TableCell>
                <TableCell className="border-l border-r border-black border-b border-b-white"></TableCell>
                <TableCell className="border-l border-r border-black border-b border-b-white">
                  {data?.localCharges}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-l border-r border-black border-b border-b-white uppercase">
                  Loading/lashing
                </TableCell>
                <TableCell className="border-l border-r border-black border-b border-b-white"></TableCell>
                <TableCell className="border-l border-r border-black border-b border-b-white"></TableCell>
                <TableCell className="border-l border-r border-black border-b border-b-white"></TableCell>
                <TableCell className="border-l border-r border-black border-b border-b-white"></TableCell>
                <TableCell className="border-l border-r border-black border-b border-b-white">
                  {data?.carHanging}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-l border-r border-black border-b border-b-white uppercase">
                  recovery
                </TableCell>
                <TableCell className="border-l border-r border-black border-b border-b-white"></TableCell>
                <TableCell className="border-l border-r border-black border-b border-b-white"></TableCell>
                <TableCell className="border-l border-r border-black border-b border-b-white"></TableCell>
                <TableCell className="border-l border-r border-black border-b border-b-white"></TableCell>
                <TableCell className="border-l border-r border-black border-b border-b-white">
                  {data?.recovery}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-l border-r border-black border-b border-b-white uppercase">
                  Insurance
                </TableCell>
                <TableCell className="border-l border-r border-black border-b border-b-white"></TableCell>
                <TableCell className="border-l border-r border-black border-b border-b-white"></TableCell>
                <TableCell className="border-l border-r border-black border-b border-b-white"></TableCell>
                <TableCell className="border-l border-r border-black border-b border-b-white"></TableCell>
                <TableCell className="border-l border-r border-black border-b border-b-white">
                  {data?.insurance}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-l border-r border-black border-b border-b-white uppercase">
                  Job Advance
                </TableCell>
                <TableCell className="border-l border-r border-black border-b border-b-white"></TableCell>
                <TableCell className="border-l border-r border-black border-b border-b-white"></TableCell>
                <TableCell className="border-l border-r border-black border-b border-b-white"></TableCell>
                <TableCell className="border-l border-r border-black border-b border-b-white"></TableCell>
                <TableCell className="border-l border-r border-black border-b border-b-white">
                  {data?.jb}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-b border-b-white border-l border-r border-black uppercase">
                  INSPECTION
                </TableCell>
                <TableCell className="border-b border-b-white border-l border-r border-black"></TableCell>
                <TableCell className="border-b border-b-white border-l border-r border-black"></TableCell>
                <TableCell className="border-b border-b-white border-l border-r border-black"></TableCell>
                <TableCell className="border-b border-b-white border-l border-r border-black"></TableCell>
                <TableCell className="border-b border-b-white border-l border-r border-black">
                  {data?.inspection}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-l border-r border-black border-b uppercase">
                  ({data?.origin} TO Kigali)
                </TableCell>
                <TableCell className="border-b border-l border-r border-black"></TableCell>
                <TableCell className="border-b border-l border-r border-black"></TableCell>
                <TableCell className="border-b border-l border-r border-black"></TableCell>
                <TableCell className="border-b border-l border-r border-black"></TableCell>
                <TableCell className="border-b border-l border-r border-black"></TableCell>
              </TableRow>
            </TableBody>
            <TableFooter className="w-full uppercase text-gray-900 font-semibold bg-white mt-2 border border-black">
              <TableRow className="max-h-4">
                <TableCell colSpan={5}>
                  {totalInwords !== ""
                    ? totalInwords
                    : data?.totalAmountInWords}
                </TableCell>
                <TableCell>
                  {vat !== ""
                    ? data?.freight +
                      (data?.freight *
                        (vat !== "" ? Number(vat) : data?.vat ?? 0)) /
                        100 +
                      data?.blFee +
                      data?.localCharges +
                      data?.carHanging +
                      data?.inspection +
                      data?.recovery +
                      data?.insurance +
                      data?.jb
                    : data?.blFee +
                      data?.localCharges +
                      data?.carHanging +
                      data?.inspection +
                      data?.recovery +
                      data?.insurance +
                      data?.jb +
                      data?.freight +
                      (data?.freight *
                        (vat !== "" ? Number(vat) : data?.vat ?? 0)) /
                        100}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
          <div className="m-4 flex flex-col gap-2">
            <p>A/C NAME: Super INTERNATIONAL FREIGHT SERVICES COMPANY LTD</p>
            <p>BANK OF KIGALI</p>
            <p>A/C NO(USD): 100105759775</p>
            <p>A/C NO (RWF): 100105758132</p>
          </div>
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
export default Invoice;
