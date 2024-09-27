import {
  consigneesEndpoint,
  getAllconsignees,
} from "@/app/httpservices/consignee";
import { getAllshippers, shippersEndpoint } from "@/app/httpservices/shipper";
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
  const { data: shippingCompanies } = useSWR(shippersEndpoint, getAllshippers, {
    onSuccess: (data: NewShipper[]) =>
      data.sort((a, b) => (b.id ?? 0) - (a.id ?? 0)),
  });
  const { data: consignees } = useSWR(consigneesEndpoint, getAllconsignees, {
    onSuccess: (data: NewShipper[]) =>
      data.sort((a, b) => (b.id ?? 0) - (a.id ?? 0)),
  });
  const handleSelectShipperChange = (value: string | number) => {
    setItemsData((prevState: NewStuffingItem) => ({
      ...prevState,
      shipper: Number(value),
    }));
    setValidationErrors((prevState: NewStuffingItemErrors) => ({
      ...prevState,
      shipper: null,
    }));
  };
  const handleSelectConsigneeChange = (value: string | number) => {
    setItemsData((prevState: NewStuffingItem) => ({
      ...prevState,
      consignee: Number(value),
    }));
    setValidationErrors((prevState: NewStuffingItemErrors) => ({
      ...prevState,
      consignee: null,
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
    } else if (!newItemPayload.shipper) {
      ErrorLogger("shipper", "Shipper must be chosen.");
    } else if (weight.value == "" || !Number(weight.value)) {
      ErrorLogger("weight", "weight is required.");
    } else {
      setActiveForm(2);
    }
  };
  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="grid gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Select onValueChange={handleSelectShipperChange}>
              <Label htmlFor="shipper" className="mb-2">
                Shipper <span className="text-red-500">*</span>
              </Label>
              <SelectTrigger className="w-full placeholder:text-gray-300">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                {shippingCompanies?.map((shipper: NewShipper) => (
                  <SelectItem key={shipper.id} value={shipper.id!.toString()}>
                    {shipper.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span
              className={errors["shipper"] ? "text-xs text-red-500" : "hidden"}
            >
              {errors?.shipper}
            </span>
          </div>
          <div className="grid gap-2">
            <Select onValueChange={handleSelectConsigneeChange}>
              <Label htmlFor="consignee" className="mb-2">
                Consignee <span className="text-red-500">*</span>
              </Label>
              <SelectTrigger className="w-full placeholder:text-gray-300">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                {consignees?.map((consignee: NewShipper) => (
                  <SelectItem key={consignee.id} value={consignee.id!.toString()}>
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
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="code">Code</Label>
            <Input
              id="code"
              name="code"
              placeholder="type.."
              onChange={handleChange}
              className={"placeholder:text-gray-400"}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="mark">Mark</Label>
            <Input
              id="mark"
              name="mark"
              placeholder="type.."
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="salesAgent">Sales agent</Label>
            <Input
              id="salesAgent"
              name="salesAgent"
              placeholder="type.."
              onChange={handleChange}
            />
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
            <Label htmlFor="typeOfPackage">
              Type of package<span className="text-red-500">*</span>
            </Label>
            <Input
              id="typeOfPkg"
              name="typeOfPkg"
              placeholder="type.."
              onChange={handleChange}
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
};
export default SetpOneForm;
