"use client";
import { DashboardCardWrapper } from "@/components/dashboard/admin/CardWrapper";
import RevenueChart from "@/components/dashboard/admin/RevenueChart";
import SalesPanel from "@/components/dashboard/admin/SalesPanel";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "@/redux/reducers/pageTitleSwitching";
import { BsCashCoin, BsListUl } from "react-icons/bs";
import { GiTakeMyMoney } from "react-icons/gi";
import { TbUsersGroup } from "react-icons/tb";

const AdminPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle("Home"));
  }, [dispatch]);
  return (
    <div className=" flex lg:gap-4 gap-2 flex-col  m-auto justify-center">
      <div className="w-full lg:gap-4 gap-2 h-fit grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1">
        <DashboardCardWrapper
          header="Total revenue"
          amount="$ 1,000,000"
          perMonth="+20.1% from last month"
          icon={<GiTakeMyMoney className="flex my-auto text-lg" />}
        />
        <DashboardCardWrapper
          header="Total consignees"
          amount="1,000"
          perMonth="+20.1% from last month"
          icon={<TbUsersGroup className="flex my-auto text-lg" />}
        />
        <DashboardCardWrapper
          header="Total stuffing reports"
          amount="1,000"
          perMonth="+20.1% from last month"
          icon={<BsListUl className="flex my-auto text-lg" />}
        />
        <DashboardCardWrapper
          header="Invoices count"
          amount="1,000"
          perMonth="+20.1% from last month"
          icon={<BsCashCoin className="flex my-auto text-lg" />}
        />
      </div>
      <div className="lg:h-[80vh] h-full w-full flex lg:flex-row flex-col lg:gap-4 gap-2">
        <RevenueChart />
        <SalesPanel />
      </div>
    </div>
  );
};

export default AdminPage;
