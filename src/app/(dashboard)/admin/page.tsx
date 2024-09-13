import { DashboardCardWrapper } from "@/components/dashboard/admin/CardWrapper";
import RevenueChart from "@/components/dashboard/admin/RevenueChart";
import SalesPanel from "@/components/dashboard/admin/SalesPanel";

const AdminPage = () => {
    return (
        <div className=" flex gap-4 flex-col  m-auto justify-center">
            <div className="w-full gap-4 h-fit grid grid-cols-4">
            <DashboardCardWrapper />
            <DashboardCardWrapper />
            <DashboardCardWrapper />
            <DashboardCardWrapper />
            </div>
            <div className="h-[80vh] w-full flex gap-4">
            <RevenueChart />
            <SalesPanel />
            </div>
        </div>
    );
};

export default AdminPage;