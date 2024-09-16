import { DashboardCardWrapper } from "@/components/dashboard/admin/CardWrapper";
import RevenueChart from "@/components/dashboard/admin/RevenueChart";
import SalesPanel from "@/components/dashboard/admin/SalesPanel";

const AdminPage = () => {
    return (
        <div className=" flex lg:gap-4 gap-2 flex-col  m-auto justify-center">
            <div className="w-full lg:gap-4 gap-2 h-fit grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2">
            <DashboardCardWrapper />
            <DashboardCardWrapper />
            <DashboardCardWrapper />
            <DashboardCardWrapper />
            </div>
            <div className="lg:h-[80vh] h-full w-full flex lg:flex-row flex-col lg:gap-4 gap-2">
            <RevenueChart />
            <SalesPanel />
            </div>
        </div>
    );
};

export default AdminPage;