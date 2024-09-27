"use client";
import useSWR, { mutate } from "swr";
import {
  createStuffingReports,
  stuffingReportEndpoint,
} from "@/app/httpservices/stuffingReport";
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
import { StuffingReport } from "@/interfaces/stuffingreport";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";
import {
  deliverySitesEndpoint,
  getAllsites,
} from "@/app/httpservices/deliverySites";
import { NewSite } from "@/interfaces/sites";
const StaffingReports = () => {
  const [payload, setPayload] = useState<StuffingReport>({});
  const [validationErrors, setValidationErrors] = useState<StuffingReport>({});
  const { data: destinations } = useSWR(deliverySitesEndpoint, getAllsites, {
    onSuccess: (data: NewSite[]) =>
      data.sort((a, b) => (b.id ?? 0) - (a.id ?? 0)),
  });
  const ErrorLogger = (errorKey: string, errorMessage: string | null) => {
    setValidationErrors((prevState: StuffingReport) => ({
      ...prevState,
      [errorKey]: errorMessage,
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
  const handleSelectChange = (value: string) => {
    setPayload({ ...payload, destination: Number(value) });
    delete validationErrors.destination;
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const origin = form.elements.namedItem("origin") as HTMLInputElement;
    if (origin.value === "") {
      ErrorLogger("origin", "Delivery origin must be specified.");
    } else {
      try {
        delete payload.id;
        delete payload.status;
        delete payload.code;
        const message = await createStuffingReports(payload);
        mutate(stuffingReportEndpoint);
        form.reset();
        toast.success(message);
      } catch (err) {
        toast.error("Failed to create new stuffing report");
      }
    }
  };
  return (
    <div>
      <div className="w-full flex flex-col-reverse md:flex-row justify-between mb-4 gap-2">
        <SearchBox />
        <div className="flex gap-2 justify-end w-full">
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
                    <div className="grid grid-cols-1 items-center gap-2 mr-4 w-full">
                      <Label>Delivery Destination</Label>
                      <Select onValueChange={handleSelectChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue
                            placeholder="Select..."
                            className="placeholder:text-gray-300"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {destinations &&
                            destinations.map((location: NewSite) => (
                              <SelectItem key={location.id!} value={location.id!.toString()}>
                                {location.country + "," + location.locationName}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
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
  );
};
export default TabularSection(StaffingReports);
