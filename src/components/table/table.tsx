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
const DynamicTable = <T extends Record<string, string | number>>({
  headers,
  data,
  action,
}: TableProps<T>) => {
  return (
    <Table className="bg-white shadow rounded">
      <TableHeader>
        <TableRow className="bg-gray-100">
          <TableHead className="font-semibold text-sm">#</TableHead>
          {headers.map((header, index) => (
            <TableHead key={index} className="font-semibold text-sm">
              {header.header}
            </TableHead>
          ))}
          {action ? (
            <TableHead className="font-semibold text-sm">Action</TableHead>
          ) : (
            ""
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, rowIndex) => (
          <TableRow key={rowIndex} className="text-gray-700">
            <TableCell className="text-sm  text-gray-700">
              {rowIndex + 1}
            </TableCell>
            {headers.map((header, colIndex) => (
              <TableCell key={colIndex} className="text-sm">
                {row[header.field] as string | number}
              </TableCell>
            ))}
            <TableCell className="text-sm">
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
                        onClick={() => action.Click(row.id)}
                      >
                        {action.icon}
                      </Label>
                    ))
                  : ""}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default DynamicTable;