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
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  generateInvoice,
  getStuffingReportsItemsInvoice,
} from "@/app/httpservices/stuffingReport";
import { MdDownload } from "react-icons/md";
import { InvoiceGenerationDetails } from "@/app/(dashboard)/admin/stuffing-reports/[id]/invoice/[invId]/(invoicedetails)/generationdetails";
import { Loader } from "lucide-react";
import ErrorSection from "@/appComponents/pageBlocks/errorDisplay";
import { toast } from "react-toastify";
import { formatDate } from "@/app/utilities/dateFormat";
interface invoiceProps {
  itemsId: number;
  invoiceId: number;
}
const Invoice = ({ itemsId, invoiceId }: invoiceProps) => {
  const cacheKey = `stuffingreports/${itemsId}/invoice/${invoiceId}`;
  const dispatch = useDispatch();
  const [vat, setVat] = useState<string>("");
  const [totalInwords, setTotalInwords] = useState<string>("");
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
  if (data) {
    return (
      <div className="w-full">
        {data?.totalAmountInWords == "total" ? (
          <div
            className={"m-1 md:m-2 bg-white text-gray-700 py-6 px-10 flex justify-between  max-w-[1200px] border border-gray-100 shadow-xl sticky top-16 z-10 rounded"
            }
          >
            <h1 className="font-semibold uppercase text-xs md:text-base">
              Invoice preview
            </h1>
            <InvoiceGenerationDetails
              ExportInvoicePDf={ExportInvoicePDf}
              vat={vat ?? 0}
              setVat={setVat}
              totalInwords={totalInwords}
              setTotalInwords={setTotalInwords}
            />
          </div>
        ) : (<div className="w-[95%] flex justify-end"><button className="text-blue-700 text-sm font-semibold bg-transparent border-none flex gap-1" onClick={ExportInvoicePDf}><MdDownload className="text-lg mt-[1px]" /><span>DownLoad</span></button></div>)}
        <div
          className="m-1 md:m-2 bg-white text-gray-700 p-6 flex flex-col gap-2 max-w-[1200px] border border-gray-300 shadow-xl"
          ref={invoiceRef}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:w-[80%] w-full">
            <Image
              src="/images/logoo.png"
              alt="logo"
              width={250}
              height={250}
            />
            <div className="md:text-sm text-xs w-full">
              <div className=" mb-2">
                <h1 className="text-xs md:text-base font-bold uppercase">
                  Super International Freight Services LLC
                </h1>
              </div>
              <div className="flex flex-col gap-1">
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
              <TableRow className="border border-b">
                <TableCell className="border-r text-black border-b border-b-white font-bold uppercase">
                  {data?.consigneeId}
                </TableCell>
                <TableCell className="border-r text-black">
                  Invoice No.
                </TableCell>
                <TableCell className="border-r text-black">
                  {data?.invoiceNo}
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="border-l border-r border-b border-b-white uppercase">
                  {data?.consigneeLocation}
                </TableCell>
                <TableCell className="border-l border-r border-b text-black">
                  Date
                </TableCell>
                <TableCell className="border-l border-r border-b">
                  {formatDate(data.date ? data.date : new Date().toISOString())}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-l border-r border-b border-b-white">
                  TEL: {data?.phone}
                </TableCell>
                <TableCell className="border-l border-r border-b text-black">
                  Currency
                </TableCell>
                <TableCell className="border-l border-r border-b ">
                  USD
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-l border-r border-b border-b-white"></TableCell>
                <TableCell className="border-l border-r border-b text-black">
                  Our Job No.
                </TableCell>
                <TableCell className="border-l border-r border-b "></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-l border-r border-b"></TableCell>
                <TableCell className="border-l border-r border-b text-black">
                  Your reference
                </TableCell>
                <TableCell className="border-l border-r border-b"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-l border-r border-b">
                  Origin : <span className="uppercase">{data?.origin}</span>
                </TableCell>
                <TableCell className="border-l border-r border-b text-black">
                  Destination
                </TableCell>
                <TableCell className="border-l border-r border-b uppercase">
                  {data?.destination}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-l border-r border-b text-black">
                  Remarks
                </TableCell>
                <TableCell colSpan={2} className="border-l border-r border-b">
                  LINES
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-l border-r border-b text-black">
                  Container No
                </TableCell>
                <TableCell colSpan={2} className="border-l border-r border-b">
                  {data?.containerNo}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Table>
            <TableHeader>
              <TableRow className="border border-b text-black">
                <TableCell className="border-r font-bold">
                  Description
                </TableCell>
                <TableCell className="border-r font-bold">
                  Qty/No of Pkg
                </TableCell>
                <TableCell className="border-r font-bold">Rate</TableCell>
                <TableCell className="border-r font-bold">VAT</TableCell>
                <TableCell className="border-r font-bold">Tax Amt</TableCell>
                <TableCell className="border-r font-bold">
                  Total Amount
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="border-l border-r border-b border-b-white uppercase">
                  FREIGHT CHARGES ({data?.origin} TO {data?.destination})
                </TableCell>
                <TableCell className="border-l border-r border-b border-b-white">
                  {data?.noOfPkgs}
                </TableCell>
                <TableCell className="border-l border-r border-b border-b-white">
                  {data?.freight}
                </TableCell>
                <TableCell className="border-l border-r border-b border-b-white">
                  {vat !== "" ? Number(vat) : data?.vat ?? 0 * 100}%
                </TableCell>
                <TableCell className="border-l border-r border-b border-b-white">
                  {(data?.freight *
                    (vat !== "" ? Number(vat) : data?.vat ?? 0)) /
                    100}
                </TableCell>
                <TableCell className="border-l border-r border-b border-b-white">
                  {data?.freight +
                    (data?.freight *
                      (vat !== "" ? Number(vat) : data?.vat ?? 0)) /
                    100}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-l border-r border-b border-b-white">
                  BL FEE
                </TableCell>
                <TableCell className="border-l border-r border-b border-b-white"></TableCell>
                <TableCell className="border-l border-r border-b border-b-white"></TableCell>
                <TableCell className="border-l border-r border-b border-b-white"></TableCell>
                <TableCell className="border-l border-r border-b border-b-white"></TableCell>
                <TableCell className="border-l border-r border-b border-b-white">
                  {data?.blFee}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-l border-r border-b border-b-white">
                  LOCAL CHARGES
                </TableCell>
                <TableCell className="border-l border-r border-b border-b-white"></TableCell>
                <TableCell className="border-l border-r border-b border-b-white"></TableCell>
                <TableCell className="border-l border-r border-b border-b-white"></TableCell>
                <TableCell className="border-l border-r border-b border-b-white"></TableCell>
                <TableCell className="border-l border-r border-b border-b-white">
                  {data?.handling + data?.others + data?.jb}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-l border-r border-b border-b-white uppercase">
                  Cash Advance
                </TableCell>
                <TableCell className="border-l border-r border-b border-b-white"></TableCell>
                <TableCell className="border-l border-r border-b border-b-white"></TableCell>
                <TableCell className="border-l border-r border-b border-b-white"></TableCell>
                <TableCell className="border-l border-r border-b border-b-white"></TableCell>
                <TableCell className="border-l border-r border-b border-b-white">
                  0.00
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-b border-b-white border-l border-r">
                  EXPECTION
                </TableCell>
                <TableCell className="border-b border-b-white border-l border-r"></TableCell>
                <TableCell className="border-b border-b-white border-l border-r"></TableCell>
                <TableCell className="border-b border-b-white border-l border-r"></TableCell>
                <TableCell className="border-b border-b-white border-l border-r"></TableCell>
                <TableCell className="border-b border-b-white border-l border-r"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-l border-r border-b uppercase">
                  ({data?.origin} TO {data?.destination})
                </TableCell>
                <TableCell className="border-b border-l border-r"></TableCell>
                <TableCell className="border-b border-l border-r"></TableCell>
                <TableCell className="border-b border-l border-r"></TableCell>
                <TableCell className="border-b border-l border-r"></TableCell>
                <TableCell className="border-b border-l border-r"></TableCell>
              </TableRow>
            </TableBody>
            <TableFooter className="w-full uppercase text-gray-900 font-semibold bg-white mt-2 border">
              <TableRow>
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
                    data?.handling +
                    data?.others +
                    data?.jb
                    : data?.blFee +
                    data?.handling +
                    data?.others +
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
            <p>A/C NAME: SUPER INTERNATIONAL FREIGHT SERVICES COMPANY LTD</p>
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
