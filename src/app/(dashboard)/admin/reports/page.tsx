"use client";
import { agents } from "@/app/dummydata/agents";
import { headers } from "@/app/tableHeaders/reportSalesAgent";
import { DashboardCardWrapper } from "@/components/dashboard/admin/CardWrapper";
import AgentsInvolved from "@/components/dashboard/pages/agentsInvolved";
import ClientsInvolved from "@/components/dashboard/pages/clientsInvolved";
import DatePickerWithRange from "@/components/ui/dateSelector";
import { SearchBox } from "@/components/ui/searchBox";
import { setPageTitle } from "@/redux/reducers/pageTitleSwitching";
import { addDays } from "date-fns";
import React from "react";
import { useEffect } from "react";
import { DateRange } from "react-day-picker";
import { FaEye } from "react-icons/fa6";
import { GiTakeMyMoney } from "react-icons/gi";
import { useDispatch } from "react-redux";

const ReportPage = () => {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle("Sales report"));
  }, [dispatch]);
  const handleView = async (id: number) => {};
  const actions = [
    {
      icon: (
        <button className="px-3 py-1 text-white bg-[#189bcc] rounded shadow-sm">
          <FaEye />
        </button>
      ),
      Click: handleView,
    },
  ];
  return (
    <div className="p-4 flex gap-4 flex-col m-auto justify-center">
      <div className="w-full flex justify-end">
        <DatePickerWithRange date={date} setDate={setDate} />
      </div>
      <div className="bg-white rounded shadow-sm flex justify-center w-full py-6">
        <p className="text-gray-800 uppercase font-medium">
          Selling records in last <span className="font-bold">30</span> days
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        <DashboardCardWrapper
          header="Total revenue"
          amount="$ 1,000,000"
          perMonth="Were made"
          icon={<GiTakeMyMoney className="flex my-auto text-lg" />}
        />
        <DashboardCardWrapper
          header="Sales agents"
          amount="10"
          perMonth="Involved"
          icon={<GiTakeMyMoney className="flex my-auto text-lg" />}
        />
        <DashboardCardWrapper
          header="Total commission"
          amount="$40,000"
          perMonth="Earned"
          icon={<GiTakeMyMoney className="flex my-auto text-lg" />}
        />
        <DashboardCardWrapper
          header="Customers"
          amount="40"
          perMonth="Involved"
          icon={<GiTakeMyMoney className="flex my-auto text-lg" />}
        />
      </div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-2">
        <div className="w-full bg-white p-2 rounded-md">
          <AgentsInvolved headers={headers} data={agents} action={actions} />
        </div>
        <div className="w-full bg-white p-2 rounded-md">
          <ClientsInvolved headers={headers} data={agents} />
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
