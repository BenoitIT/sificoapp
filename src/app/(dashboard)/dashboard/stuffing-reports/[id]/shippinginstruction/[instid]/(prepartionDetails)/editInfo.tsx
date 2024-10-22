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
import { ChangeEvent, useEffect, useState } from "react";
import { instruction } from "@/interfaces/instruction";
import { updateShippinginstruction } from "@/app/httpservices/shippinginstruction";
import { toast } from "react-toastify";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
export const ShippingReportEditDetails = ({
  cacheKey,
  totalInwords,
  data,
  itemsId,
  setTotalInwords,
}: {
  totalInwords: string;
  cacheKey: string;
  itemsId: any;
  data: instruction;
  setTotalInwords: (val: string) => void;
}) => {
  const [payload, setPayload] = useState<instruction>(data);
  const [date, setDate] = useState<Date>();
  const session: any = useSession();
  const role = session?.data?.role;
  useEffect(() => {
    if (data) {
      setPayload(data);
      setDate(data.updatedAt as unknown as Date);
    }
  }, [data]);
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
    delete payload.id;
    delete payload?.createdAt;
    delete payload?.finaldeliverId;
    delete payload?.itemId;
    delete payload?.stuffingReportItems;
    delete payload?.finaldelivery;
    payload.updatedAt = date?.toString();
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
        <Button variant="secondary">Edit</Button>
      </PopoverTrigger>
      <PopoverContent className="w-[24rem] mr-4 shadow-lg border border-gray-300 border-t-0">
        <div className="grid gap-4">
          <div className="space-y-2">
            <p className="text-sm text-gray-800">
              .....................................................
            </p>
          </div>
          {role == "origin agent" ? (
            <>
              <div className="grid gap-2 text-sm text-gray-600 uppercase">
                <Label>PORT OF DISCHARGE</Label>
                <Input
                  type="text"
                  placeholder="Ex: Mombasa"
                  className="w-full border  placeholder:text-gray-300"
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
                  className="w-full border  placeholder:text-gray-300"
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
                  className="w-full border  placeholder:text-gray-300"
                  name="prepaidBlFee"
                  onChange={handleChange}
                  value={payload?.prepaidBlFee}
                />
              </div>
              <div className="grid gap-2 text-sm text-gray-600 uppercase">
                <Label>DELEIVERY TERM</Label>
                <RadioGroup
                  defaultValue={data?.deliveryTerm}
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
                  value={
                    totalInwords ? totalInwords : payload?.totalamountinword
                  }
                  onChange={(e) => setTotalInwords(e.target.value)}
                  placeholder="Ex: Twenty thousands dollars"
                  className="w-full border  placeholder:text-gray-300"
                />
              </div>
            </>
          ) : (
            ""
          )}
          <div className="grid gap-2 text-sm text-gray-600 uppercase">
            <Label>Received date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="w-full flex justify-between">
            <span className="text-sm text-blue-400">Click for preview</span>
            <Button onClick={handleSubmit}>Update</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
