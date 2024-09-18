import { DashboardCardWrapper } from "@/components/dashboard/admin/CardWrapper";
import RevenueChart from "@/components/dashboard/admin/RevenueChart";
import SalesPanel from "@/components/dashboard/admin/SalesPanel";
import { FaDollarSign, FaMoneyBill, FaUsers } from "react-icons/fa";
import { FcRotateToPortrait } from "react-icons/fc";

const AdminPage = () => {
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
                    header="Total Users"
                    amount="1000"
                    perMonth="+20.1% from last month"
                    icon={<FaUsers className="flex my-auto" />}
                />
                <DashboardCardWrapper
                    header="Tatal Invoice"
                    amount="1000"
                    perMonth="+20.1% from last month"
                    icon={<FaMoneyBill className="flex my-auto" />}
                />
                <DashboardCardWrapper
                    header="Tatal Report"
                    amount="1000"
                    perMonth="+20.1% from last month"
                    icon={<FcRotateToPortrait className="flex my-auto" />}
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