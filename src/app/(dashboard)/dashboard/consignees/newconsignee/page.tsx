"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent, FormEvent, useState } from "react";
import { NewCustomer, newCustomerErrors } from "@/interfaces/shipper";
import { useRouter } from "next/navigation";
import { createNewConsignee } from "@/app/httpservices/consignee";
import { toast } from "react-toastify";
import {
  deliverySitesEndpoint,
  getAllsitesUnpaginated,
} from "@/app/httpservices/deliverySites";
import { NewSite } from "@/interfaces/sites";
import useSWR from "swr";
const Page = () => {
  const router = useRouter();
  const [newConsigneepayload, setStaffData] = useState<NewCustomer>({
    email: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setValidationErrors] = useState<newCustomerErrors>({});
  const phoneRegx =
    /^\+?(\d{1,3})?[-.\s]?(\(?\d{1,4}\)?)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
  const ErrorLogger = (errorKey: string, errorMessage: string | null) => {
    setValidationErrors((prevState: newCustomerErrors) => ({
      ...prevState,
      [errorKey]: errorMessage,
    }));
  };
  const { data: destinations } = useSWR(
    deliverySitesEndpoint,
    getAllsitesUnpaginated,
    {
      onSuccess: (data: NewSite[]) =>
        data.sort((a, b) => (b.id ?? 0) - (a.id ?? 0)),
    }
  );
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setStaffData((prevState: NewCustomer) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    ErrorLogger(e.target.name, null);
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const consigneeName = form.elements.namedItem("name") as HTMLInputElement;
    const consigneePhone = form.elements.namedItem("phone") as HTMLInputElement;
    if (consigneeName.value === "") {
      ErrorLogger("name", "Consignee name is required.");
    } else if (
      consigneePhone.value == "" ||
      !phoneRegx.test(consigneePhone.value)
    ) {
      ErrorLogger("phone", "Valid phone number is required.");
    } else {
      try {
        setLoading(true);
        const { message, status } = await createNewConsignee(
          newConsigneepayload
        );
        if (status == 201) {
          toast.success(message);
          router.back();
          form.reset();
        } else {
          toast.error(message);
        }
      } catch (error) {
        toast.error("Failed to add a new shipper");
      }
      setLoading(false);
    }
  };
  const handleSelectChange = (value: string) => {
    setStaffData({ ...newConsigneepayload, location: Number(value) });
    delete errors.location;
  };
  return (
    <div className="w-full min-h-[88vh] flex justify-center items-center">
      <Card className="mx-auto w-sm md:w-[700px] py-3 border-none">
        <CardHeader>
          <CardTitle className="text-xl text-center">New customer</CardTitle>
          <CardDescription className="text-center">
            Enter a new customer{"'"}s information. Note that all fields with
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
                  <Label htmlFor="name">
                    Customer name<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="type.."
                    onChange={handleChange}
                    className={
                      errors["name"]
                        ? "text-xs text-red-500 border-red-500"
                        : "placeholder:text-gray-400"
                    }
                  />
                  <span
                    className={errors?.name ? "text-xs text-red-500" : "hidden"}
                  >
                    {errors?.name}
                  </span>
                </div>
                <div className="grid grid-cols-1 items-center gap-2 mr-4 w-full">
                  <Label>Location</Label>
                  <Select onValueChange={handleSelectChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder="Select..."
                        className="placeholder:text-gray-300"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {destinations &&
                        destinations?.map((location: NewSite) => (
                          <SelectItem
                            key={location.id!}
                            value={location.id!.toString()}
                          >
                            {location.country + "," + location.locationName}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="text"
                    name="phone"
                    type="text"
                    placeholder="Ex:0788888888"
                    onChange={handleChange}
                    className={
                      errors["phone"]
                        ? "text-xs text-red-500 border-red-500"
                        : "placeholder:text-gray-400"
                    }
                  />
                  <span
                    className={
                      errors?.phone ? "text-xs text-red-500" : "hidden"
                    }
                  >
                    {errors?.phone}
                  </span>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="tinnumber">
                    TIN Number<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="text"
                    name="tinnumber"
                    type="text"
                    placeholder="Ex:123456777"
                    onChange={handleChange}
                    className={
                      errors["tinnumber"]
                        ? "text-xs text-red-500 border-red-500"
                        : "placeholder:text-gray-400"
                    }
                  />
                  <span
                    className={
                      errors?.tinnumber ? "text-xs text-red-500" : "hidden"
                    }
                  >
                    {errors?.tinnumber}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="mail@example.com"
                    onChange={handleChange}
                    className={"placeholder:text-gray-400"}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="itemscode">
                    Shipping code<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="itemscode"
                    type="text"
                    name="itemsCode"
                    placeholder="xxxxx"
                    onChange={handleChange}
                    className={"placeholder:text-gray-400"}
                  />
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
                <Button type="submit" className="w-fit" disabled={loading}>
                  Register
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
export default Page;
