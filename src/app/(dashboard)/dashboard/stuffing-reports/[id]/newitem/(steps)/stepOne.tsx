import { usersBaseEndpoint } from "@/app/httpservices/axios";
import {
  consigneesEndpoint,
  getAllconsignees,
} from "@/app/httpservices/consignee";
import { getAllUsers } from "@/app/httpservices/users";
import ErrorSection from "@/appComponents/pageBlocks/errorDisplay";
import Loader from "@/appComponents/pageBlocks/loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NewShipper } from "@/interfaces/shipper";
import { NewStaff } from "@/interfaces/staff";
import {
  NewStuffingItem,
  NewStuffingItemErrors,
  StepFormProps,
} from "@/interfaces/stuffingItem";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent } from "react";
import useSWR from "swr";

const SetpOneForm = ({
  setItemsData,
  setValidationErrors,
  ErrorLogger,
  newItemPayload,
  errors,
  setActiveForm,
}: StepFormProps) => {
  const router = useRouter();
  const { data: consignees,isLoading,error } = useSWR(
    consigneesEndpoint,
    () => getAllconsignees("",1),
    {
      onSuccess: (data: NewShipper[]) =>
        data.sort((a, b) => (b.id ?? 0) - (a.id ?? 0)),
    }
  );
  const { data: staff } = useSWR(usersBaseEndpoint, () => getAllUsers(""));
  const customerr = consignees?.find(
    (customer: NewShipper) => customer?.id == newItemPayload?.consignee
  );
  const salesAgent = staff?.find(
    (staff: NewStaff) => staff.id == newItemPayload?.salesAgent
  );
  const handleSelectConsigneeChange = (value: string | number) => {
    const customer = consignees?.find(
      (customer: NewShipper) => customer?.id == value
    );
    setItemsData((prevState: NewStuffingItem) => ({
      ...prevState,
      consignee: Number(value),
      customername: customer ? customer?.name : "",
      code: customer ? customer?.itemsCode : "",
    }));
  };
  const handleSelectAgentChange = (value: string | number) => {
    const userr = staff?.find((user: NewStaff) => user.id == value);
    setItemsData((prevState: NewStuffingItem) => ({
      ...prevState,
      salesAgent: Number(value),
      agentname: userr ? userr?.firstName + " " + userr?.lastName : "",
    }));
    setValidationErrors((prevState: NewStuffingItemErrors) => ({
      ...prevState,
      salesAgent: null,
    }));
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.type == "number") {
      setItemsData((prevState: NewStuffingItem) => ({
        ...prevState,
        [e.target.name]: Number(e.target.value),
      }));
    } else {
      setItemsData((prevState: NewStuffingItem) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
    ErrorLogger(e.target.name, null);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const noOfPackages = form.elements.namedItem(
      "noOfPkgs"
    ) as HTMLInputElement;
    const typeOfPage = form.elements.namedItem("typeOfPkg") as HTMLInputElement;
    const weight = form.elements.namedItem("weight") as HTMLInputElement;
    if (noOfPackages.value === "" || !Number(noOfPackages.value)) {
      ErrorLogger("noOfPkgs", "Number of packages is required.");
    } else if (typeOfPage.value === "") {
      ErrorLogger("typeOfPkg", "type of package is required.");
    } else if (!newItemPayload.consignee) {
      ErrorLogger("consignee", "Consignee must be chosen.");
    } else if (weight.value == "" || !Number(weight.value)) {
      ErrorLogger("weight", "weight is required.");
    } else {
      setActiveForm(2);
    }
  };
  if(consignees){
  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="grid gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Select onValueChange={handleSelectConsigneeChange}>
              <Label>
                Customer <span className="text-red-500">*</span>
              </Label>
              <SelectTrigger className="w-full placeholder:text-gray-300">
                {customerr ? (
                  <SelectValue placeholder={customerr ? customerr?.name : ""} />
                ) : (
                  <SelectValue placeholder="Select..." />
                )}
              </SelectTrigger>
              <SelectContent>
                {consignees?.map((consignee: NewShipper) => (
                  <SelectItem
                    key={consignee.id}
                    value={consignee.id!.toString()}
                  >
                    {consignee.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span
              className={
                errors["consignee"] ? "text-xs text-red-500" : "hidden"
              }
            >
              {errors?.consignee}
            </span>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="type">Type</Label>
            <Input
              id="type"
              name="type"
              type="text"
              placeholder="type.."
              value={newItemPayload?.type ?? ""}
              onChange={handleChange}
              className={"placeholder:text-gray-400"}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="code">Code</Label>
            <Input
              id="code"
              name="code"
              placeholder="type.."
              value={newItemPayload?.code ?? ""}
              disabled
              className={"placeholder:text-gray-400"}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="mark">Mark</Label>
            <Input
              id="mark"
              name="mark"
              placeholder="type.."
              value={newItemPayload?.mark ?? ""}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Select onValueChange={handleSelectAgentChange}>
              <Label>
                Sales agent <span className="text-red-500">*</span>
              </Label>
              <SelectTrigger className="w-full placeholder:text-gray-300">
                {salesAgent ? (
                  <SelectValue
                    placeholder={
                      salesAgent
                        ? salesAgent?.firstName + " " + salesAgent?.lastName
                        : ""
                    }
                  />
                ) : (
                  <SelectValue placeholder="Select..." />
                )}
              </SelectTrigger>
              <SelectContent>
                {staff?.map((user: NewStaff) => (
                  <SelectItem key={user.id} value={user.id!.toString()}>
                    {user.firstName} {user.lastName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span
              className={
                errors["salesAgent"] ? "text-xs text-red-500" : "hidden"
              }
            >
              {errors?.salesAgent}
            </span>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="noOfPkgs">
              No of packages<span className="text-red-500">*</span>
            </Label>
            <Input
              id="noOfPkgs"
              name="noOfPkgs"
              type="number"
              placeholder="type.."
              onChange={handleChange}
              value={newItemPayload?.noOfPkgs ?? ""}
              className={
                errors?.noOfPkgs
                  ? "text-xs text-red-500 border-red-500"
                  : "placeholder:text-gray-400"
              }
            />
            <span
              className={errors?.noOfPkgs ? "text-xs text-red-500" : "hidden"}
            >
              {errors?.noOfPkgs}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="typeOfPkg">
              Type of package<span className="text-red-500">*</span>
            </Label>
            <Input
              id="typeOfPkg"
              name="typeOfPkg"
              placeholder="type.."
              onChange={handleChange}
              value={newItemPayload?.typeOfPkg ?? ""}
              className={
                errors["typeOfPkg"]
                  ? "text-xs text-red-500 border-red-500"
                  : "placeholder:text-gray-400"
              }
            />
            <span
              className={errors?.typeOfPkg ? "text-xs text-red-500" : "hidden"}
            >
              {errors?.typeOfPkg}
            </span>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="weight">
              Weight<span className="text-red-500">*</span>
            </Label>
            <Input
              id="weight"
              name="weight"
              type="number"
              placeholder="type.."
              value={newItemPayload?.weight ?? ""}
              onChange={handleChange}
              className={
                errors["weight"]
                  ? "text-xs text-red-500 border-red-500"
                  : "placeholder:text-gray-400"
              }
            />
            <span
              className={errors?.weight ? "text-xs text-red-500" : "hidden"}
            >
              {errors?.weight}
            </span>
          </div>
        </div>
        <div className="flex justify-between gap-4">
          <Button
            type="button"
            className="w-fit"
            variant="destructive"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button type="submit" className="w-fit">
            Continue
          </Button>
        </div>
      </div>
    </form>
  );
}
if(isLoading){
  return <Loader/>
}
if(error){
  return <ErrorSection/>
}
};
export default SetpOneForm;
