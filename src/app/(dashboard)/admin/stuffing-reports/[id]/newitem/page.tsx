"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent, FormEvent, useState } from "react";
import {
  NewStuffingItem,
  NewStuffingItemErrors,
} from "@/interfaces/stuffingItem";
const Page = () => {
  const [newItemPayload, setItemsData] = useState<NewStuffingItem>({});
  const [errors, setValidationErrors] = useState<NewStuffingItemErrors>({});
  const ErrorLogger = (errorKey: string, errorMessage: string | null) => {
    setValidationErrors((prevState: NewStuffingItemErrors) => ({
      ...prevState,
      [errorKey]: errorMessage,
    }));
  };
  const handleSelectRoleChange = (value: string | number) => {
    setItemsData({ ...newItemPayload, shipper: value });
    setValidationErrors((prevState: NewStuffingItemErrors) => ({
      ...prevState,
      role: "",
    }));
  };
  const handleSelectGenderChange = (value: string | number) => {
    setItemsData({ ...newItemPayload, consignee: value });
    setValidationErrors((prevState: NewStuffingItemErrors) => ({
      ...prevState,
      gender: "",
    }));
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setItemsData((prevState: NewStuffingItem) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    ErrorLogger(e.target.name, null);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const firstName = form.elements.namedItem("firstName") as HTMLInputElement;
    const email = form.elements.namedItem("email") as HTMLInputElement;
    if (firstName.value === "") {
      ErrorLogger("firstName", "First name is required.");
    } else if (email.value === "") {
      ErrorLogger("email", "Email is required.");
    } else if (!newItemPayload.consignee) {
      ErrorLogger("consignee", "Consignee must be chosen.");
    } else if (!newItemPayload.shipper) {
      ErrorLogger("shipper", "Shipper must be chosen.");
    } else {
      console.log("payload", newItemPayload);
    }
  };
  return (
    <Card className="mx-auto w-sm md:w-[700px] py-3">
      <CardHeader>
        <CardTitle className="text-xl text-center">New item</CardTitle>
        <CardDescription className="text-center">
          Enter all details in provided fields. Note that all fields with
          <br />
          <span className="text-sm">
            (<span className="text-red-500 text-base">*</span>) are mandatory
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Select onValueChange={handleSelectRoleChange}>
                  <Label htmlFor="role" className="mb-2">
                    Shipper <span className="text-red-500">*</span>
                  </Label>
                  <SelectTrigger className="w-full placeholder:text-gray-300">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">James</SelectItem>
                    <SelectItem value="2">Paul</SelectItem>
                    <SelectItem value="3">Emmanuel</SelectItem>
                    <SelectItem value="4">Jammy</SelectItem>
                  </SelectContent>
                </Select>
                <span
                  className={
                    errors?.shipper ? "text-xs text-red-500" : "hidden"
                  }
                >
                  {errors?.shipper}
                </span>
              </div>
              <div className="grid gap-2">
                <Select onValueChange={handleSelectGenderChange}>
                  <Label htmlFor="role" className="mb-2">
                    Consignee <span className="text-red-500">*</span>
                  </Label>
                  <SelectTrigger className="w-full placeholder:text-gray-300">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">Paul</SelectItem>
                    <SelectItem value="3">Peter</SelectItem>
                    <SelectItem value="4">James</SelectItem>
                  </SelectContent>
                </Select>
                <span
                  className={
                    errors?.consignee ? "text-xs text-red-500" : "hidden"
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
                <Select onValueChange={handleSelectRoleChange}>
                  <Label htmlFor="role" className="mb-2">
                    Sales agent <span className="text-red-500">*</span>
                  </Label>
                  <SelectTrigger className="w-full placeholder:text-gray-300">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">James</SelectItem>
                    <SelectItem value="2">Paul</SelectItem>
                    <SelectItem value="3">Emmanuel</SelectItem>
                    <SelectItem value="4">Jammy</SelectItem>
                  </SelectContent>
                </Select>
                <span
                  className={
                    errors?.salesAgent ? "text-xs text-red-500" : "hidden"
                  }
                >
                  {errors?.salesAgent}
                </span>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="noOfPackages">No of packages</Label>
                <Input
                  id="noOfPackages"
                  name="noOfPackages"
                  placeholder="type.."
                  onChange={handleChange}
                  className={
                    errors?.noOfPkgs
                      ? "text-xs text-red-500 border-red-500"
                      : "placeholder:text-gray-400"
                  }
                />
                <span
                  className={
                    errors?.noOfPkgs ? "text-xs text-red-500" : "hidden"
                  }
                >
                  {errors?.noOfPkgs}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="noOfPackages">Type of package</Label>
                <Input
                  id="typeOfPackages"
                  name="typeOfPackages"
                  placeholder="type.."
                  onChange={handleChange}
                  className={
                    errors?.typeOfPkgs
                      ? "text-xs text-red-500 border-red-500"
                      : "placeholder:text-gray-400"
                  }
                />
                <span
                  className={
                    errors?.typeOfPkgs ? "text-xs text-red-500" : "hidden"
                  }
                >
                  {errors?.typeOfPkgs}
                </span>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="noOfPackages">Weight</Label>
                <Input
                  id="weight"
                  name="weight"
                  placeholder="type.."
                  onChange={handleChange}
                  className={
                    errors?.weight
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
              <Button type="button" className="w-fit" variant="destructive">
                Cancel
              </Button>
              <Button type="submit" className="w-fit">
                Continue
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
export default Page;
