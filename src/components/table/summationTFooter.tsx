import { StuffingReportTotals } from "@/interfaces/stuffingItem";
import { TableCell, TableFooter, TableRow } from "../ui/table";
interface footer {
  summation?: StuffingReportTotals;
  stuffingRprt?: boolean;
}
export const ItemsSummationTableFooter = ({ summation }: footer) => {
  return (
    <TableFooter className="bg-blue-400 text-white w-full uppercase font-semibold text-xs">
      <TableRow>
        <TableCell className="text-center"></TableCell>
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
        <TableCell className="text-center">{summation?.carHanging}</TableCell>
        <TableCell className="text-center">{summation?.recovery}</TableCell>
        <TableCell className="text-center">{summation?.insurance}</TableCell>
        <TableCell className="text-center">{summation?.inspection}</TableCell>
        <TableCell className="text-center">{summation?.carLashing}</TableCell>
        <TableCell className="text-center">{summation?.totalUsd}</TableCell>
        <TableCell className="text-center">{summation?.totalAed}</TableCell>
        <TableCell className="text-center"></TableCell>
        <TableCell className="text-center"></TableCell>
      </TableRow>
    </TableFooter>
  );
};
