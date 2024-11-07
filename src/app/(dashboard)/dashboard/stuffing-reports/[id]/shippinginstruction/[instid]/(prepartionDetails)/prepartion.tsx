import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { mutate } from "swr";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChangeEvent,useState } from "react";
import { instruction } from "@/interfaces/instruction";
import { updateShippinginstruction } from "@/app/httpservices/shippinginstruction";
import { toast } from "react-toastify";
export const ShippingReportPreparationDetails = ({
  cacheKey,
  totalInwords,
  itemsId,
  setTotalInwords,
}: {
  totalInwords: string;
  cacheKey: string;
  itemsId: any;
  setTotalInwords: (val: string) => void;
}) => {
  const [payload, setPayload] = useState<instruction>({
    deliveryTerm: "house to house",
    prepared: true,
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.type == "number") {
      setPayload((prev: instruction) => ({
        ...prev,
        [e.target.name]: Number(e.target.value),
      }));
    } else {
      setPayload((prev: instruction) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };
  const handleRadioChange = (value: string) => {
    setPayload((prev) => ({
      ...prev,
      deliveryTerm: value,
    }));
  };
  const handleSubmit = async () => {
    if (totalInwords !== "") {
      payload.totalamountinword = totalInwords;
    }
    try {
      const { message, status }: any = await updateShippinginstruction(
        Number(itemsId),
        payload
      );
      if (status == 200) {
        toast.success(message);
        mutate(cacheKey);
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
        <Button>Prepare</Button>
      </PopoverTrigger>
      <PopoverContent className="w-[24rem] mr-4 shadow-lg border border-gray-300 border-t-0">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none uppercase text-sm">
              Fill the following fields
            </h4>
            <p className="text-sm text-gray-800">
              .....................................................
            </p>
          </div>
          <div className="grid gap-2 text-sm text-gray-600 uppercase">
            <Label>PORT OF DISCHARGE</Label>
            <Input
              type="text"
              placeholder="Ex: Mombasa"
              className="w-full border border-gray-400 placeholder:text-gray-300"
              name="portOfdischarge"
              onChange={handleChange}
              value={payload?.portOfdischarge}
            />
          </div>
          <div className="grid gap-2 text-sm text-gray-600 uppercase">
            <Label>Prepared freight</Label>
            <Input
              type="number"
              placeholder="Ex: 100"
              className="w-full border border-gray-400 placeholder:text-gray-300"
              name="prepaidFreight"
              onChange={handleChange}
              value={payload?.prepaidFreight}
            />
          </div>
          <div className="grid gap-2 text-sm text-gray-600 uppercase">
            <Label>prepared B/L Fee</Label>
            <Input
              type="number"
              placeholder="Ex: 100"
              className="w-full border border-gray-400 placeholder:text-gray-300"
              name="prepaidBlFee"
              onChange={handleChange}
              value={payload?.prepaidBlFee}
            />
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
          <div className="grid gap-2 text-sm text-gray-600 uppercase">
            <Label>Total amount in word</Label>
            <Input
              type="text"
              value={totalInwords}
              onChange={(e) => setTotalInwords(e.target.value)}
              placeholder="Ex: Twenty thousands dollars"
              className="w-full border border-gray-400 placeholder:text-gray-300"
            />
          </div>
          <div className="w-full flex justify-between">
            <span className="text-sm text-blue-400">Click for preview</span>
            <Button onClick={handleSubmit}>Save</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
