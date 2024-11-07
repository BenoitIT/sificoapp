"use client";
import useSWR, { mutate } from "swr";
import TabularSection from "@/appComponents/pageBlocks/tabularSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SearchBox } from "@/components/ui/searchBox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { StuffingReport } from "@/interfaces/stuffingreport";
import {
  ChangeEvent,
  FormEvent,
  useState,
  useCallback,
  useEffect,
} from "react";
import { toast } from "react-toastify";
import { NewShipper } from "@/interfaces/shipper";
import { getAllshippers, shippersEndpoint } from "@/app/httpservices/shipper";
import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  createStuffingReports,
  stuffingReportEndpoint,
} from "@/app/httpservices/stuffingReport";
import {
  getAllDeliveriesUnpaginated,
  deliveryEndpoint,
} from "@/app/httpservices/deliveries";
import { NewDelivery } from "@/interfaces/deliveries";
const StaffingReports = () => {
  const session: any = useSession();
  const searchParams: any = useSearchParams();
  const role = session?.data?.role;
  const pathname = usePathname();
  const router = useRouter();
  const [payload, setPayload] = useState<StuffingReport>({
    packagingType: "LCL",
  });
  const [validationErrors, setValidationErrors] = useState<StuffingReport>({});
  const { data: shippingCompanies } = useSWR(
    shippersEndpoint,
    () => getAllshippers(""),
    {
      onSuccess: (data: NewShipper[]) =>
        data.sort((a, b) => (b.id ?? 0) - (a.id ?? 0)),
    }
  );
  const { data: deliveries } = useSWR(
    deliveryEndpoint,
    getAllDeliveriesUnpaginated,
    {
      onSuccess: (data: NewDelivery[]) =>
        data.sort((a, b) => (b.id ?? 0) - (a.id ?? 0)),
    }
  );
  const handleSelectChange = (value: string) => {
    setPayload({ ...payload, deliveryId: Number(value) });
    delete validationErrors.deliveryId;
  };
  const ErrorLogger = (errorKey: string, errorMessage: string | null) => {
    setValidationErrors((prevState: StuffingReport) => ({
      ...prevState,
      [errorKey]: errorMessage,
    }));
  };
  const handleSelectShipperChange = (value: string | number) => {
    setPayload((prevState: StuffingReport) => ({
      ...prevState,
      shipper: Number(value),
    }));
    setValidationErrors((prevState: StuffingReport) => ({
      ...prevState,
      shipper: null,
    }));
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPayload((prevState: StuffingReport) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    ErrorLogger(e.target.name, "");
  };
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const origin = form.elements.namedItem("origin") as HTMLInputElement;
    if (origin.value === "") {
      ErrorLogger("origin", "Delivery origin must be specified.");
    } else if (!payload.shipper) {
      ErrorLogger("shipper", "Shipper must be chosen.");
    } else {
      try {
        delete payload.id;
        delete payload.status;
        delete payload.code;
        const { message, status } = await createStuffingReports(payload);
        if (status == 201) {
          form.reset();
          toast.success(message);
          router.refresh();
          mutate(stuffingReportEndpoint);
          return router.push(`${pathname + `?added=true`}`);
        } else {
          toast.error(message);
        }
      } catch (err) {
        toast.error("Failed to create new stuffing report");
      }
    }
  };
  const handleValueChange = (value: string) => {
    router.push(`?${createQueryString("filter", value)}`);
  };
  useEffect(() => {
    router.push(`?${createQueryString("filter", "preview")}`);
  }, []);
  const handlePkGingTypeChange = (value: string) => {
    setPayload({ ...payload, packagingType: value });
  };
  return (
    <>
      <div className="w-full flex flex-col-reverse md:flex-row justify-between mb-4 gap-2">
        <SearchBox />
        <div className="flex flex-wrap gap-2 text-sm">
          <RadioGroup
            defaultValue="preview"
            className="flex flex-wrap"
            onValueChange={handleValueChange}
          >
            <div className="flex items-center space-x-2 text-black">
              <RadioGroupItem value="preview" id="preview" />
              <Label htmlFor="preview">In progress</Label>
            </div>
            <div className="flex items-center space-x-2 text-black">
              <RadioGroupItem value="generated" id="generated" />
              <Label htmlFor="generated">Completed</Label>
            </div>
          </RadioGroup>

          <div
            className={
              role == "origin agent"
                ? "flex gap-2 justify-end w-full"
                : "hidden"
            }
          >
            <Popover>
              <PopoverTrigger asChild>
                <Button>Add new</Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 mr-4 shadow-md">
                <form className="w-full" onSubmit={handleSubmit}>
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">
                        New stuffing report
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Fill delivery information for the stuffs
                      </p>
                    </div>

                    <div className="grid gap-2">
                      <div className="grid gap-2">
                        <Select onValueChange={handleSelectShipperChange}>
                          <Label htmlFor="shipper">
                            Shipper <span className="text-red-500">*</span>
                          </Label>
                          <SelectTrigger className="w-full placeholder:text-gray-300">
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                          <SelectContent>
                            {shippingCompanies?.map((shipper: NewShipper) => (
                              <SelectItem
                                key={shipper.id}
                                value={shipper.id!.toString()}
                              >
                                {shipper.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <span
                          className={
                            validationErrors["shipper"]
                              ? "text-xs text-red-500"
                              : "hidden"
                          }
                        >
                          {validationErrors?.shipper}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 items-center gap-2 mr-4 w-full">
                        <Label>Delivery</Label>
                        <Select onValueChange={handleSelectChange}>
                          <SelectTrigger className="w-full">
                            <SelectValue
                              placeholder="Select..."
                              className="placeholder:text-gray-300"
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {deliveries &&
                              deliveries?.map((location: NewDelivery) => (
                                <SelectItem
                                  key={location.id!}
                                  value={location.id!.toString()}
                                >
                                  {location.country +
                                    "," +
                                    location.deliveryName}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2 text-sm text-gray-700">
                        <Label>Origin</Label>
                        <Input
                          type="text"
                          placeholder="Ex: Dubai"
                          name="origin"
                          onChange={handleChange}
                          className={
                            validationErrors.origin
                              ? "text-xs text-red-500 border-red-500"
                              : "placeholder:text-gray-400"
                          }
                        />
                        <span
                          className={
                            validationErrors.origin
                              ? "text-xs text-red-500"
                              : "hidden"
                          }
                        >
                          {validationErrors.origin}
                        </span>
                      </div>
                      <div className="grid gap-2 text-sm">
                        <Label>Packaging type</Label>
                        <RadioGroup
                          defaultValue="LCL"
                          name="LCL"
                          onValueChange={handlePkGingTypeChange}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="LCL" id="r1" />
                            <Label htmlFor="r1">Groupage (LCL)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="FCL" id="r2" />
                            <Label htmlFor="r2">Full Container (FCL)</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                    <div className="w-full flex justify-between">
                      <Button>save</Button>
                    </div>
                  </div>
                </form>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </>
  );
};
export default TabularSection(StaffingReports);
