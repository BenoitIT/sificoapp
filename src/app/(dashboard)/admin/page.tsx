"use client"
import { DashboardCardWrapper } from "@/components/dashboard/admin/CardWrapper";
import RevenueChart from "@/components/dashboard/admin/RevenueChart";
import SalesPanel from "@/components/dashboard/admin/SalesPanel";
import { useEffect } from "react";
import { FaDollarSign, FaMoneyBill, FaTruck, FaUsersCog } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setPageTitle } from "@/redux/reducers/pageTitleSwitching";

const AdminPage = () => {
const dispatch=useDispatch();
useEffect(()=>{
 dispatch(setPageTitle("Home"))
},[dispatch]);
  return (
    <div className=" flex lg:gap-4 gap-2 flex-col  m-auto justify-center">
      <div className="w-full lg:gap-4 gap-2 h-fit grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2">
        <DashboardCardWrapper
          header="Total Revenue"
          amount="$ 1,000,000"
          perMonth="+20.1% from last month"
          icon={<FaDollarSign className="flex my-auto" />}
        />
        <DashboardCardWrapper
          header="Total Consignees"
          amount="1,000"
          perMonth="+20.1% from last month"
          icon={<FaUsersCog className="flex my-auto" />}
        />
        <DashboardCardWrapper
          header="Total Stuffing Reports"
          amount="1,000"
          perMonth="+20.1% from last month"
          icon={<FaTruck className="flex my-auto" />}
        />
        <DashboardCardWrapper
          header="Tatal Invoice"
          amount="1,000"
          perMonth="+20.1% from last month"
          icon={<FaMoneyBill className="flex my-auto" />}
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
