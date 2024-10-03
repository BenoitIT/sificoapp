"use client";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableProps } from "@/interfaces/table";
import { ItemsSummationTableFooter } from "./summationTFooter";
const DynamicTable = <T extends Record<string, string | number>>({
  headers,
  data,
  action,
  allowItemsSummationFooter,
  summation
}: TableProps<T>) => {
  return (
    <Table className="bg-white shadow rounded">
      <TableHeader>
        <TableRow className="bg-gray-50 text-gray-900">
          <TableHead className="font-semibold text-xs md:text-sm">#</TableHead>
          {headers.map((header, index) => (
            <TableHead key={index} className="font-medium text-xs md:text-sm">
              {header.header}
            </TableHead>
          ))}
          {action ? (
            <TableHead className="font-medium  text-xs md:text-sm">
              Action
            </TableHead>
          ) : (
            ""
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length > 0 ? data.map((row, rowIndex) => (
          <TableRow key={rowIndex} className="text-gray-700">
            <TableCell className="text-xs md:text-sm  text-gray-700">
              {rowIndex + 1}
            </TableCell>
            {headers.map((header, colIndex) => (
              <TableCell key={colIndex} className="text-xs md:text-sm">
                {row[header.field] as string | number}
              </TableCell>
            ))}
            <TableCell className="text-xs md:text-sm">
              <div className={`flex w-fit gap-2`}>
                {action
                  ? action.map((action, index) => (
                    <Label
                      key={index}
                      className={
                        action.name == "delete"
                          ? "text-red-400 hover:cursor-pointer"
                          : "cursor-pointer"
                      }
                      onClick={() => action.Click(row.id as number)}
                    >
                      {action.icon}
                    </Label>
                  ))
                  : ""}
              </div>
            </TableCell>
          </TableRow>
        )) : (
          <TableRow>
            <TableCell colSpan={Array.from(Object.keys(headers)).length}>
              <div className="rounded w-full h-[40px] flex justify-center items-center capitalize text-sm text-black">
                no record found
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
      {allowItemsSummationFooter ? <ItemsSummationTableFooter summation={summation} /> : ""}
    </Table>
  );
};
export default DynamicTable;
