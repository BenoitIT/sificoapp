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
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { NewSite, newSitesErrors } from "@/interfaces/sites";
import { useDispatch } from "react-redux";
import { setPageTitle } from "@/redux/reducers/pageTitleSwitching";
const Page = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle("New delivery sites"));
  }, [dispatch]);
  const [newSitePayload, setStaffData] = useState<NewSite>({});
  const [errors, setValidationErrors] = useState<newSitesErrors>({});
  const ErrorLogger = (errorKey: string, errorMessage: string | null) => {
    setValidationErrors((prevState: newSitesErrors) => ({
      ...prevState,
      [errorKey]: errorMessage,
    }));
  };
  const handleSelectRoleChange = (value: string) => {
    setStaffData({ ...newSitePayload, agent: value });
    setValidationErrors((prevState: newSitesErrors) => ({
      ...prevState,
      agent: "",
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
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const country = form.elements.namedItem("country") as HTMLInputElement;
    const siteName = form.elements.namedItem("name") as HTMLInputElement;
    if (country.value === "") {
      ErrorLogger("country", "Country is required.");
    } else if (siteName.value === "") {
      ErrorLogger("name", "Site name is required.");
    } else if (!newSitePayload.agent) {
      ErrorLogger("agent", "Agent must be chosen.");
    } else {
      console.log("payload", newSitePayload);
    }
  };
  return (
    <Card className="mx-auto w-sm md:w-[700px] py-3 border-none">
      <CardHeader>
        <CardTitle className="text-xl text-center">New site</CardTitle>
        <CardDescription className="text-center">
          Enter a new site{"'"}s information with its monitoring agent. <br />{" "}
          Note that all fields with
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
                className={
                  errors["country"]
                    ? "text-xs text-red-500 border-red-500"
                    : "placeholder:text-gray-400"
                }
              />
              <span
                className={errors?.country ? "text-xs text-red-500" : "hidden"}
              >
                {errors?.country}
              </span>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Site name</Label>
              <Input
                id="name"
                name="name"
                placeholder="kamembe"
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Select onValueChange={handleSelectRoleChange}>
                <Label htmlFor="role" className="mb-2">
                  Agent <span className="text-red-500">*</span>
                </Label>
                <SelectTrigger className="w-full placeholder:text-gray-300">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Peter</SelectItem>
                  <SelectItem value="2">Paul</SelectItem>
                  <SelectItem value="3">Clement</SelectItem>
                  <SelectItem value="4">David</SelectItem>
                </SelectContent>
              </Select>
              <span
                className={errors?.agent ? "text-xs text-red-500" : "hidden"}
              >
                {errors?.agent}
              </span>
            </div>

            <div className="flex justify-between gap-4">
              <Button type="button" className="w-fit" variant="destructive">
                Cancel
              </Button>
              <Button type="submit" className="w-fit">
                Register
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
export default Page;
