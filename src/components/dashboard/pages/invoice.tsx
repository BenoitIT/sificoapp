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
import { setPageTitle } from "@/redux/reducers/pageTitleSwitching";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { InvoiceGenerationDetails } from "@/app/(dashboard)/admin/stuffing-reports/[id]/invoice/[invId]/(invoicedetails)/generationdetails";

const Invoice= () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle("Invoice"));
  }, [dispatch]);
  return (
    <div className="w-full">
      <div className="m-1 md:m-2 bg-white text-gray-700 py-6 px-10 flex justify-between  max-w-[1200px] border border-gray-100 shadow-xl sticky top-16 z-10 rounded">
        <h1 className="font-semibold uppercase text-xs md:text-base">
          Invoice preview
        </h1>
        <InvoiceGenerationDetails/>
      </div>
      <div className="m-1 md:m-2 bg-white text-gray-700 p-6 flex flex-col gap-2 max-w-[1200px] border border-gray-300 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:w-[80%] w-full">
          <Image src="/images/logoo.png" alt="logo" width={300} height={250} />
          <div className="md:text-sm text-xs overflow-x-auto w-full">
            <div className=" mb-2">
              <h1 className="text-xs md:text-base font-bold uppercase">
                Super International Freight Services LLC
              </h1>
            </div>
            <div>
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
        <div className="w-full text-base font-semibold py-3">
          <p className="text-center uppercase">
            <span className="ml-0 lg:-ml-[250px]">Invoice</span>
          </p>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="border border-b">
              <TableCell className="border-r text-black border-b border-b-white ">
                UMUTONIWASE YVETTE
              </TableCell>
              <TableCell className="border-r text-black">Invoice No.</TableCell>
              <TableCell className="border-r text-black">0155/2024/1</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="border-l border-r border-b border-b-white">
                KGL-RWANDA
              </TableCell>
              <TableCell className="border-l border-r border-b text-black">
                Date
              </TableCell>
              <TableCell className="border-l border-r border-b">
                29-AUG-2024
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="border-l border-r border-b border-b-white">
                TEL; +250788752786
              </TableCell>
              <TableCell className="border-l border-r border-b text-black">
                Currency
              </TableCell>
              <TableCell className="border-l border-r border-b ">USD</TableCell>
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
                Origin : JEBEL ALI
              </TableCell>
              <TableCell className="border-l border-r border-b text-black">
                Destination
              </TableCell>
              <TableCell className="border-l border-r border-b ">
                KIGALI-RWANDA
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
                DRYU9865306
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Table>
          <TableHeader>
            <TableRow className="border border-b">
              <TableCell className="border-r">Description</TableCell>
              <TableCell className="border-r">Qty/No of Pkg</TableCell>
              <TableCell className="border-r">Rate</TableCell>
              <TableCell className="border-r">VAT</TableCell>
              <TableCell className="border-r">Tax Amt</TableCell>
              <TableCell className="border-r">Total Amount</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="border-l border-r border-b border-b-white">
                FREIGHT CHARGES (DUBAI TO KIGALI, RWANDA)
              </TableCell>
              <TableCell className="border-l border-r border-b border-b-white">
                1.00
              </TableCell>
              <TableCell className="border-l border-r border-b border-b-white">
                1900.00
              </TableCell>
              <TableCell className="border-l border-r border-b border-b-white">
                0%
              </TableCell>
              <TableCell className="border-l border-r border-b border-b-white">
                0.00
              </TableCell>
              <TableCell className="border-l border-r border-b border-b-white">
                1900.00
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="border-l border-r border-b border-b-white">
                BL FEE
              </TableCell>
              <TableCell className="border-l border-r border-b border-b-white"></TableCell>
              <TableCell className="border-l border-r border-b border-b-white">
                75.00
              </TableCell>
              <TableCell className="border-l border-r border-b border-b-white"></TableCell>
              <TableCell className="border-l border-r border-b border-b-white"></TableCell>
              <TableCell className="border-l border-r border-b border-b-white">
                75.00
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="border-l border-r border-b border-b-white">
                LOCAL CHARGES
              </TableCell>
              <TableCell className="border-l border-r border-b border-b-white"></TableCell>
              <TableCell className="border-l border-r border-b border-b-white">
                60.00
              </TableCell>
              <TableCell className="border-l border-r border-b border-b-white"></TableCell>
              <TableCell className="border-l border-r border-b border-b-white"></TableCell>
              <TableCell className="border-l border-r border-b border-b-white">
                60.00
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="border-l border-r border-b border-b-white">
                Cash Advance
              </TableCell>
              <TableCell className="border-l border-r border-b border-b-white"></TableCell>
              <TableCell className="border-l border-r border-b border-b-white">
                0.00
              </TableCell>
              <TableCell className="border-l border-r border-b border-b-white"></TableCell>
              <TableCell className="border-l border-r border-b border-b-white"></TableCell>
              <TableCell className="border-l border-r border-b border-b-white">
                0.00
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="border-l border-r border-b">
                EXPECTION
              </TableCell>
              <TableCell className="border-b border-l border-r"></TableCell>
              <TableCell className="border-b border-l border-r">0.00</TableCell>
              <TableCell className="border-b border-l border-r"></TableCell>
              <TableCell className="border-b border-l border-r"></TableCell>
              <TableCell className="border-b border-l border-r">0.00</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter className="w-full uppercase text-gray-900 font-semibold bg-white mt-2 border">
            <TableRow>
              <TableCell colSpan={5}>
                USD Two Thousand Thirty-Five Dollas Only
              </TableCell>
              <TableCell>1550</TableCell>
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
};
export default Invoice;
