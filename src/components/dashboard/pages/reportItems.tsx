"use client";
import {
  getStuffingReport,
  getStuffingReportsItems,
  stuffingReportEndpoint,
} from "@/app/httpservices/stuffingReport";
import TabularSection from "@/appComponents/pageBlocks/tabularSection";
import { Button } from "@/components/ui/button";
import { SearchBox } from "@/components/ui/searchBox";
import { useRouter, usePathname, useParams } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { StuffingReport } from "@/interfaces/stuffingreport";
import { NewSite } from "@/interfaces/sites";
import {
  deliverySitesEndpoint,
  getAllsitesUnpaginated,
} from "@/app/httpservices/deliverySites";
import { updateStuffingReport } from "@/app/httpservices/stuffingReport";
import { toast } from "react-toastify";
import useSWR, { mutate } from "swr";
import { useSession } from "next-auth/react";
import ExportButton from "@/components/ui/exportBtn";
const StaffingReportsItems = () => {
  const router = useRouter();
  const params = useParams();
  const session: any = useSession();
  const role = session?.data?.role;
  const [payload, setPayload] = useState<StuffingReport>({});
  const [validationErrors, setValidationErrors] = useState<StuffingReport>({});
  const staffReportId = params?.id;
  const cacheKey = `/stuffingreports/${Number(staffReportId)}`;
  const { data } = useSWR(cacheKey, () =>
    getStuffingReportsItems(Number(staffReportId))
  );
  const { data: stuffingreport } = useSWR(stuffingReportEndpoint, () =>
    getStuffingReport(Number(staffReportId))
  );
  const { data: destinations } = useSWR(deliverySitesEndpoint, getAllsitesUnpaginated, {
    onSuccess: (data: NewSite[]) =>
      data.sort((a, b) => (b.id ?? 0) - (a.id ?? 0)),
  });
  const currentPath: string | null = usePathname();
  const handleAddNew = () => {
    router.push(`${currentPath}/newitem`);
  };
  useEffect(() => {
    setPayload(stuffingreport);
  }, [stuffingreport]);
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
  const handleSelectStatusChange = (value: string) => {
    setPayload({ ...payload, status: value });
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
        delete payload.code;
        const { message, status } = await updateStuffingReport(
          Number(staffReportId),
          payload
        );
        if (status == 200) {
          toast.success(message);
          mutate(cacheKey);
        } else {
          toast.error(message);
        }
      } catch (err) {
        toast.error("Failed to create new stuffing report");
      }
    }
  };
  return (
    <div>
      <div className="w-full flex justify-between mb-4 flex-col gap-2 md:flex-row">
        <div className=" w-full md:w-[400px] flex flex-col text-[14px] bg-white px-4 py-2 rounded shadow gap-1">
          <p className=" text-gray-600">
            Stuffing report ID:{" "}
            <span className="font-medium"> {data?.stuffingRpt?.code}</span>
          </p>
          <p className=" text-gray-600">
            Container status:
            <span
              className={
                data?.stuffingRpt?.status?.toLowerCase() != "available"
                  ? "text-red-500 capitalize"
                  : "text-[#189bcc] capitalize"
              }
            >
              {" "}
              {data?.stuffingRpt?.status}
            </span>
          </p>
          <p className=" text-gray-600">
            Delivery destination:
            <span className="font-medium">
              {" "}
              {data?.stuffingRpt?.deliverysite?.country +
                "," +
                data?.stuffingRpt?.deliverysite?.locationName}
            </span>
          </p>
        </div>
        <div className="w-full md:w-[400px] flex flex-col-reverse gap-2">
          <div className="flex justify-end">
            <SearchBox />
          </div>
          <div
            className={
              role == "origin agent"
                ? "flex gap-2 justify-end w-full"
                : "hidden"
            }
          >
            <div className="flex gap-2 justify-end w-full">
              <Popover>
                <PopoverTrigger asChild>
                  <Button>Update</Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 mr-4 shadow-md">
                  <form className="w-full" onSubmit={handleSubmit}>
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">
                          Update {data?.stuffingRpt?.code}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Edit delivery information for the stuffs
                        </p>
                      </div>
                      <div className="grid gap-3">
                        <div className="grid gap-2 text-sm text-gray-700">
                          <Label>Origin</Label>
                          <Input
                            type="text"
                            placeholder={data?.stuffingRpt?.origin}
                            name="origin"
                            value={payload?.origin}
                            onChange={handleChange}
                            className={
                              validationErrors.origin
                                ? "text-xs text-red-500 border-red-500"
                                : "placeholder:text-black"
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
                                placeholder={
                                  data?.stuffingRpt?.deliverysite?.country +
                                  "," +
                                  data?.stuffingRpt?.deliverysite?.locationName
                                }
                              />
                            </SelectTrigger>
                            <SelectContent>
                              {destinations &&
                                destinations?.map((location: NewSite) => (
                                  <SelectItem
                                    key={location.id!}
                                    value={location.id!.toString()}
                                  >
                                    {location.country +
                                      "," +
                                      location.locationName}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-1 items-center gap-2 mr-4 w-full">
                          <Label>Container status</Label>
                          <Select onValueChange={handleSelectStatusChange}>
                            <SelectTrigger className="w-full">
                              <SelectValue
                                placeholder={data?.stuffingRpt?.status}
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="available">
                                Available
                              </SelectItem>
                              <SelectItem value="closed">Closed</SelectItem>
                              <SelectItem value="full">Full</SelectItem>
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
              <Button onClick={handleAddNew}>Add new item</Button>
              <ExportButton/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TabularSection(StaffingReportsItems);
