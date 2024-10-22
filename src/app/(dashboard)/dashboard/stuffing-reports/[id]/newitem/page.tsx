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
  StuffingReportTotals,
} from "@/interfaces/stuffingItem";
import SetpOneForm from "./(steps)/stepOne";
import StepTwoForm from "./(steps)/stepTwo";
import { useDispatch } from "react-redux";
import { setPageTitle } from "@/redux/reducers/pageTitleSwitching";
import StepThree from "./(steps)/review";
import { getStuffingReportsItems } from "@/app/httpservices/stuffingReport";
import useSWR from "swr";
import { StuffingReport } from "@/interfaces/stuffingreport";
import { useParams } from "next/navigation";
import { withRolesAccess } from "@/components/auth/accessRights";
const Page = () => {
  const params = useParams();
  const staffReportId = params?.id;
  const [newItemPayload, setItemsData] = useState<NewStuffingItem>({
    type: "lines",
  });
  const [errors, setValidationErrors] = useState<NewStuffingItemErrors>({});
  const [activeForm, setActiveForm] = useState<number>(1);
  const cacheKey = `/stuffingreports/${Number(staffReportId)}`;
  const { data, isLoading, error } = useSWR(
    [cacheKey],
    () => getStuffingReportsItems(Number(staffReportId)),
    {
      onSuccess: (data: {
        shipments: NewStuffingItem[];
        stuffingRpt: StuffingReport;
        totals: StuffingReportTotals;
      }) => data.shipments.sort((a, b) => (b.id ?? 0) - (a.id ?? 0)),
    }
  );
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
    <div className="w-full min-h-[88vh] flex justify-center items-center flex-col gap-2">
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
          ) : activeForm == 2 ? (
            <StepTwoForm
              setItemsData={setItemsData}
              setValidationErrors={setValidationErrors}
              errors={errors}
              ErrorLogger={ErrorLogger}
              newItemPayload={newItemPayload}
              setActiveForm={setActiveForm}
            />
          ) : (
            <StepThree
              newItemPayload={newItemPayload}
              setActiveForm={setActiveForm}
              currentTotals={data?.totals}
            />
          )}
        </CardContent>
      </Card>
      {data ? (
        <Card className="mx-auto w-sm md:w-[700px] border-none">
          <CardHeader>
            <CardTitle className="text-sm text-center font-medium uppercase mb-2">
              Stuffing report potential total balances
            </CardTitle>

            <div className="grid grid-cols-2 md:grid-cols-4 text-xs">
              <div>
                <p className="capitalize">
                  Total packages{" "}
                  <span className="font-bold ml-2">
                    {data?.totals?.noOfPkgs + (newItemPayload.noOfPkgs ?? 0)}
                  </span>
                </p>
                <p className="capitalize">
                  total weight{" "}
                  <span className="font-bold ml-2">
                    {data?.totals?.weight + (newItemPayload.weight ?? 0)}
                  </span>
                </p>
                <p className="capitalize">
                  total cbm{" "}
                  <span className="font-bold ml-2">
                    {data?.totals?.cbm + (newItemPayload.cbm ?? 0)}
                  </span>
                </p>
                <p className="capitalize">
                  total insurance{" "}
                  <span className="font-bold ml-2">
                    {data?.totals?.insurance + (newItemPayload.insurance ?? 0)}
                  </span>
                </p>
              </div>
              <div>
                <p className="capitalize">
                  total freight{" "}
                  <span className="font-bold ml-2">
                    {data?.totals?.freight + (newItemPayload.freight ?? 0)}
                  </span>
                </p>
                <p className="capitalize">
                  total B/LFee
                  <span className="font-bold ml-2">
                    {data?.totals?.blFee + (newItemPayload.blFee ?? 0)}
                  </span>
                </p>
                <p className="capitalize">
                  total job advance{" "}
                  <span className="font-bold ml-2">
                    {data?.totals?.jb + (newItemPayload.jb ?? 0)}
                  </span>
                </p>
                <p className="capitalize">
                  total car hangings{" "}
                  <span className="font-bold ml-2">
                    {data?.totals?.carHanging +
                      (newItemPayload.carHanging ?? 0)}
                  </span>
                </p>
              </div>
              <div>
                <p className="capitalize">
                  total lines{" "}
                  <span className="font-bold ml-2">
                    {data?.totals?.line + (newItemPayload.line ?? 0)}
                  </span>
                </p>
                <p className="capitalize">
                  total handling
                  <span className="font-bold ml-2">
                    {data?.totals?.handling + (newItemPayload.handling ?? 0)}
                  </span>
                </p>
                <p className="capitalize">
                  Lines balance
                  <span className="font-bold ml-2">
                    {data?.totals?.line +
                      (newItemPayload.line ?? 0) -
                      (data?.totals?.handling + (newItemPayload.handling ?? 0))}
                  </span>
                </p>
              </div>
              <div>
                <p className="capitalize">
                  total inspection{" "}
                  <span className="font-bold ml-2">
                    {data?.totals?.inspection +
                      (newItemPayload.inspection ?? 0)}
                  </span>
                </p>
                <p className="capitalize">
                  total local charges{" "}
                  <span className="font-bold ml-2">
                    {data?.totals?.localCharges +
                      (newItemPayload.localCharges ?? 0)}
                  </span>
                </p>
                <p className="capitalize">
                  total recovery{" "}
                  <span className="font-bold ml-2">
                    {data?.totals?.recovery + (newItemPayload.recovery ?? 0)}
                  </span>
                </p>
              </div>
            </div>
          </CardHeader>
        </Card>
      ) : isLoading ? (
        <p className="text-xs text-center">loading balances</p>
      ) : error ? (
        <p className="text-red-600">Failed to load staffing report balances</p>
      ) : (
        ""
      )}
    </div>
  );
};
export default withRolesAccess(Page, ["origin agent"]) as React.FC;
