"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { setPageTitle } from "@/redux/reducers/pageTitleSwitching";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Page = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle("Invoice"));
  }, [dispatch]);
  return (
    <div className="m-6 bg-white text-gray-700 p-3 flex flex-col gap-2">
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
  );
};
export default Page;
