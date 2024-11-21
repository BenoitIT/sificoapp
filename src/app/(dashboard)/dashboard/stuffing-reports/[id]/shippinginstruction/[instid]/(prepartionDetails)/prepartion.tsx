import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { mutate } from "swr";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { instruction } from "@/interfaces/instruction";
import { updateShippinginstruction } from "@/app/httpservices/shippinginstruction";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { generateInvoice } from "@/app/httpservices/stuffingReport";
export const ShippingReportPreparationDetails = ({
  cacheKey,
  containerid,
  itemsId,
  invPayload,
}: {
  containerid: any;
  cacheKey: string;
  itemsId: any;
  invPayload: any;
}) => {
  const session: any = useSession();
  const role = session?.data?.role;
  const [payload, setPayload] = useState<instruction>({
    deliveryTerm: "house to house",
    prepared: true,
  });

  const handleRadioChange = (value: string) => {
    setPayload((prev) => ({
      ...prev,
      deliveryTerm: value,
    }));
  };
  const handleSubmit = async () => {
    try {
      const { message, status }: any = await updateShippinginstruction(
        Number(itemsId),
        payload
      );
      if (status == 200) {
        toast.success(message);
        mutate(cacheKey);
        const info = await generateInvoice(containerid, itemsId, invPayload);
        toast.success(info);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
      toast.error("something went wrong.");
    }
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className={role == "operation manager" ? "hidden" : ""}>
          Generate
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[24rem] mr-4 shadow-lg border border-gray-300 border-t-0">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none uppercase text-sm">
              Confirm the following fields
            </h4>
            <p className="text-sm text-gray-800">
              .....................................................
            </p>
          </div>
          <div className="grid gap-2 text-sm text-gray-600 uppercase">
            <Label>DELEIVERY TERM</Label>
            <RadioGroup
              defaultValue="house to house"
              name="deliveryTerm"
              onValueChange={handleRadioChange}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="house to house" id="r1" />
                <Label htmlFor="r1">House to house</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="port to port" id="r2" />
                <Label htmlFor="r2">Port to port</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="w-full flex justify-between">
            <span className="text-sm text-blue-400">Click for preview</span>
            <Button onClick={handleSubmit}>Confirm</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
