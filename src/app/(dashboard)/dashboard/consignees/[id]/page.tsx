"use client";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import {
  NewCustomer,
  newCustomerErrors,
  NewShipper,
  newShipperErrors,
} from "@/interfaces/shipper";
import { useRouter, useParams } from "next/navigation";
import {
  updateShipper,
  getConsignee,
  consigneesEndpoint,
} from "@/app/httpservices/consignee";
import { useDispatch } from "react-redux";
import { setPageTitle } from "@/redux/reducers/pageTitleSwitching";
import { toast } from "react-toastify";
const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const params: any = useParams();
  const cId = params?.id;
  const { data: consignee } = useSWR(consigneesEndpoint, () =>
    getConsignee(Number(cId))
  );
  const [newConsigneepayload, setStaffData] = useState<NewCustomer>({
    email: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setValidationErrors] = useState<newCustomerErrors>({});
  useEffect(() => {
    dispatch(setPageTitle("Update consignee"));
  }, [dispatch]);
  useEffect(() => {
    if (consignee) {
      setStaffData(consignee);
    }
  }, [consignee]);
  const phoneRegx =
    /^\+?(\d{1,3})?[-.\s]?(\(?\d{1,4}\)?)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
  const ErrorLogger = (errorKey: string, errorMessage: string | null) => {
    setValidationErrors((prevState: newShipperErrors) => ({
      ...prevState,
      [errorKey]: errorMessage,
    }));
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setStaffData((prevState: NewShipper) => ({
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
        const { message, status } = await updateShipper(
          Number(cId),
          newConsigneepayload
        );
        if (status == 200) {
          toast.success(message);
          setLoading(false);
          router.back();
          form.reset();
        } else {
          toast.error(message);
        }
      } catch (error) {
        toast.success("Failed to add a new shipper");
      }
    }
  };
  return (
    <div className="w-full min-h-[88vh] flex justify-center items-center">
      <Card className="mx-auto w-sm md:w-[700px] py-3 border-none">
        <CardHeader>
          <CardTitle className="text-xl text-center">
            {newConsigneepayload?.name}
          </CardTitle>
          <CardDescription className="text-center">
            Update consignee{"'"}s information. Note that all fields with
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
                    Consignee name<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="type.."
                    onChange={handleChange}
                    value={newConsigneepayload?.name}
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
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="type.."
                    onChange={handleChange}
                    value={newConsigneepayload?.location}
                  />
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
                    value={newConsigneepayload?.phone}
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
                  <Label htmlFor="phone">TIN Number</Label>
                  <Input
                    id="text"
                    name="tinnumber"
                    type="text"
                    placeholder="Ex:0788888888"
                    value={newConsigneepayload?.tinnumber}
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
                    value={newConsigneepayload?.email}
                    placeholder="mail@example.com"
                    onChange={handleChange}
                    className={"placeholder:text-gray-400"}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="itemscode">Shipping code</Label>
                  <Input
                    id="itemscode"
                    type="text"
                    name="itemscode"
                    value={newConsigneepayload?.itemscode}
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
                  Update
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
