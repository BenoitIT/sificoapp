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
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { NewSite, newSitesErrors } from "@/interfaces/sites";
import { useDispatch } from "react-redux";
import { setPageTitle } from "@/redux/reducers/pageTitleSwitching";
import { useRouter, useParams } from "next/navigation";
import {
  updateDelivery,
  getDelivery,
  deliveryEndpoint,
} from "@/app/httpservices/deliveries";
import { toast } from "react-toastify";
import { NewDelivery, newDeliveryErrors } from "@/interfaces/deliveries";
import { withRolesAccess } from "@/components/auth/accessRights";
const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const params: any = useParams();
  const deliveryId = params?.id;
  const { data: site } = useSWR(deliveryEndpoint, () =>
    getDelivery(Number(deliveryId))
  );
  const [payload, setStaffData] = useState<NewDelivery>({});
  const [errors, setValidationErrors] = useState<newDeliveryErrors>({});
  useEffect(() => {
    dispatch(setPageTitle("Update delivery"));
  }, [dispatch]);
  useEffect(() => {
    if (site) {
      setStaffData(site);
    }
  }, [site]);
  const ErrorLogger = (errorKey: string, errorMessage: string | null) => {
    setValidationErrors((prevState: newSitesErrors) => ({
      ...prevState,
      [errorKey]: errorMessage,
    }));
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setStaffData((prevState: NewSite) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    ErrorLogger(e.target.name, null);
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const country = form.elements.namedItem("country") as HTMLInputElement;
    const siteName = form.elements.namedItem(
      "deliveryName"
    ) as HTMLInputElement;
    if (country.value === "") {
      ErrorLogger("country", "Country is required.");
    } else if (siteName.value === "") {
      ErrorLogger("deliveryName", "Delivery name name is required.");
    } else {
      try {
        const response = await updateDelivery(
          Number(deliveryId),
          payload
        );
        if (response?.status == 200) {
          toast.success(response?.message);
          router.back();
          form.reset();
        } else {
          toast.error(response?.message);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to update delivery information");
      }
    }
  };
  return (
    <div className="w-full min-h-[88vh] flex justify-center items-center">
      <Card className="mx-auto w-sm md:w-[700px] py-3 border-none">
        <CardHeader>
          <CardTitle className="text-xl text-center">
            {payload?.country}-{payload?.deliveryName}
          </CardTitle>
          <CardDescription className="text-center">
            Update site{"'"}s information <br /> Note that all fields with
            <span className="text-sm">
              (<span className="text-red-500 text-base">*</span>) are mandatory
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="country">
                  Country<span className="text-red-500">*</span>
                </Label>
                <Input
                  id="country"
                  name="country"
                  placeholder="Rwanda"
                  onChange={handleChange}
                  value={payload?.country}
                  className={
                    errors["country"]
                      ? "text-xs text-red-500 border-red-500"
                      : "placeholder:text-gray-400"
                  }
                />
                <span
                  className={
                    errors?.country ? "text-xs text-red-500" : "hidden"
                  }
                >
                  {errors?.country}
                </span>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="locationName">Delivery name</Label>
                <Input
                  id="deliveryName"
                  name="deliveryName"
                  value={payload?.deliveryName}
                  onChange={handleChange}
                />
                <span
                  className={
                    errors?.deliveryName ? "text-xs text-red-500" : "hidden"
                  }
                >
                  {errors?.deliveryName}
                </span>
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
export default withRolesAccess(Page, ["origin agent", "admin"]) as React.FC;
