import { TableCell, TableFooter, TableRow } from "../ui/table"

export const ItemsSummationTableFooter=()=>{
    return(
        <TableFooter className="bg-blue-400 text-white w-full uppercase font-semibold">
        <TableRow>
          <TableCell colSpan={8} className="text-center">
            Total
          </TableCell>
          <TableCell>45</TableCell>
          <TableCell>PKGS</TableCell>
          <TableCell className="text-center">1550</TableCell>
          <TableCell className="text-center">0.0</TableCell>
          <TableCell className="text-center">0.0</TableCell>
          <TableCell className="text-center">LINES</TableCell>
          <TableCell className="text-center">0.00</TableCell>
          <TableCell className="text-center"></TableCell>
          <TableCell className="text-center">3100</TableCell>
          <TableCell className="text-center">290</TableCell>
          <TableCell className="text-center">00</TableCell>
          <TableCell className="text-center">80</TableCell>
          <TableCell className="text-center">2762</TableCell>
          <TableCell className="text-center">8162</TableCell>
          <TableCell className="text-center"></TableCell>
          <TableCell className="text-center"></TableCell>
        </TableRow>
      </TableFooter>
    )
}