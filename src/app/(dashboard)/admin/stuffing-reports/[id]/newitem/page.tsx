"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import {
  NewStuffingItem,
  NewStuffingItemErrors,
} from "@/interfaces/stuffingItem";
import SetpOneForm from "./(steps)/stepOne";
import StepTwoForm from "./(steps)/stepTwo";
import { useDispatch } from "react-redux";
import { setPageTitle } from "@/redux/reducers/pageTitleSwitching";
const Page = () => {
  const [newItemPayload, setItemsData] = useState<NewStuffingItem>({});
  const [errors, setValidationErrors] = useState<NewStuffingItemErrors>({});
  const [activeForm, setActiveForm] = useState<number>(1);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle("New stuff"));
  }, [dispatch]);
  const ErrorLogger = (errorKey: string, errorMessage: string | null) => {
    setValidationErrors((prevState: NewStuffingItemErrors) => ({
      ...prevState,
      [errorKey]: errorMessage,
    }));
  };

  return (
    <div className="w-full min-h-[88vh] flex justify-center items-center">
      <Card className="mx-auto w-sm md:w-[700px] py-3 border-none">
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
          {activeForm < 2 ? (
            <SetpOneForm
              setItemsData={setItemsData}
              setValidationErrors={setValidationErrors}
              errors={errors}
              ErrorLogger={ErrorLogger}
              newItemPayload={newItemPayload}
              setActiveForm={setActiveForm}
            />
          ) : (
            <StepTwoForm
              setItemsData={setItemsData}
              setValidationErrors={setValidationErrors}
              errors={errors}
              ErrorLogger={ErrorLogger}
              newItemPayload={newItemPayload}
              setActiveForm={setActiveForm}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};
export default Page;
