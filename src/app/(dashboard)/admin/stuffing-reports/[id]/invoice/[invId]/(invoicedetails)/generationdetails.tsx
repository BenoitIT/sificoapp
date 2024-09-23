import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const InvoiceGenerationDetails = ({
  ExportInvoicePDf,
}: {
  ExportInvoicePDf: () => void;
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Genarate</Button>
      </PopoverTrigger>
      <PopoverContent className="w-[24rem] mr-4 shadow-lg border border-gray-300 border-t-0">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none uppercase">
              Invoice Details
            </h4>
            <p className="text-sm text-gray-800">
              Record VAT and tatal amount in word
            </p>
          </div>
          <div className="grid gap-2 text-sm text-gray-600">
            <Label>
              VAT (%){" "}
              <span className="lowercase">
                on FREIGHT CHARGES (DUBAI TO KIGALI, RWANDA)
              </span>
            </Label>
            <Input
              type="number"
              placeholder="Ex: 2.5"
              className="w-full border border-gray-400 placeholder:text-gray-300"
            />
          </div>
          <div className="grid gap-2 text-sm text-gray-600">
            <Label>Total amount in word</Label>
            <Input
              type="text"
              placeholder="Ex: Twenty thousands dollars"
              className="w-full border border-gray-400 placeholder:text-gray-300"
            />
          </div>
          <div className="w-full flex justify-between">
            <Button onClick={ExportInvoicePDf}>Export invoice in PDF</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
