import { StuffingReportTotals } from "@/interfaces/stuffingItem";
import { TableCell, TableFooter, TableRow } from "../ui/table";
interface footer {
  summation?: StuffingReportTotals;
}
export const ItemsSummationTableFooter = ({ summation }: footer) => {
  return (
    <TableFooter className="bg-blue-400 text-white w-full uppercase font-semibold">
      <TableRow>
        <TableCell colSpan={7} className="text-center">
          Total
        </TableCell>
        <TableCell>{summation?.noOfPkgs}</TableCell>
        <TableCell>PKGS</TableCell>
        <TableCell className="text-center">{summation?.weight}</TableCell>
        <TableCell className="text-center">{summation?.line}</TableCell>
        <TableCell className="text-center">{summation?.handling}</TableCell>
        <TableCell className="text-center">LINES</TableCell>
        <TableCell className="text-center">{summation?.cbm}</TableCell>
        <TableCell className="text-center"></TableCell>
        <TableCell className="text-center">{summation?.freight}</TableCell>
        <TableCell className="text-center">{summation?.blFee}</TableCell>
        <TableCell className="text-center">{summation?.jb}</TableCell>
        <TableCell className="text-center">{summation?.others}</TableCell>
        <TableCell className="text-center">{summation?.totalUsd}</TableCell>
        <TableCell className="text-center">{summation?.totalAed}</TableCell>
        <TableCell className="text-center"></TableCell>
        <TableCell className="text-center"></TableCell>
      </TableRow>
    </TableFooter>
  );
};
