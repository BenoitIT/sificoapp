import SideBar from "@/components/dashboard/Menu";
import Navbar from "@/components/dashboard/NavBar";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className=" min-h-screen h-full flex w-full">
            <div className="w-[20%] md:w-[15vw] lg:w-[16%]  p-4 sticky top-0 h-screen">
                <SideBar />
            </div>
            <div className="w-[80%] md:w-[85%] lg:w-[84%]  bg-gray-200 min-h-[100vh] h-full">
                <Navbar />
                <div className="p-4">
                    {children}
                </div>
            </div>
        </div>
    );
}
