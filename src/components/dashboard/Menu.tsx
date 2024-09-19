import { role } from "@/lib/data";
import { FilePlusIcon, GearIcon, HomeIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { FaLocationArrow, FaMoneyBill, FaSignOutAlt, FaTruck, FaUser, FaUsers } from "react-icons/fa";

const menuItems = [
    {
        title: "MENU",
        items: [
            {
                icon: <HomeIcon />,
                label: "Dashboard",
                href: "/admin",
                visible: ["admin", "transimitter", "agent", "Financier", "Customer"],
            },
            {
                icon: <FaTruck />,
                label: "Stuffing report",
                href: "/admin/stuffing-reports",
                visible: ["admin", "transimitter"],
            },
            {
                icon: <FaTruck />,
                label: "Stuffing report",
                href: "/agent/stuffing-reports",
                visible: ["agent"],
            },
            {
                icon: <FaUsers />,
                label: "Staff",
                href: "/admin/staff",
                visible: ["admin"],
            },
            {
                icon: <FaLocationArrow />,
                label: "Sites",
                href: "/admin/sites",
                visible: ["admin"],
            },
            {
                icon: <FaMoneyBill />,
                label: "Invoices",
                href: "/admin/invoices",
                visible: ["admin"],
            },
            {
                icon: <FaMoneyBill />,
                label: "Invoices",
                href: "/agent/invoices",
                visible: ["agent"],
            },
            {
                icon: <FilePlusIcon />,
                label: "Reports",
                href: "/admin/reports",
                visible: ["admin"],
            },
            {
                icon: <FilePlusIcon />,
                label: "Reports",
                href: "/agent/reports",
                visible: ["agent"],
            },

        ]
    },
    {
        title: "OTHER",
        items: [
            {
                icon: <FaUser />,
                label: "Profile",
                href: "/profile",
                visible: ["admin", "teacher", "student", "parent"],
            },
            {
                icon: <GearIcon />,
                label: "Settings",
                href: "/settings",
                visible: ["admin", "teacher", "student", "parent"],
            },
            {
                icon: <FaSignOutAlt />,
                label: "Logout",
                href: "/auth/login",
                visible: ["admin", "teacher", "student", "parent"],
            },
        ],
    },
];

const Menu = () => {
    return (
        <div className="h-[96vh] flex flex-col justify-between w-full">
            <Link
                href="/"
                className="flex absolute top-2 items-center justify-center lg:justify-start gap-2"
            >
                <Image src="/images/logoo.png" alt="logo" width={100} height={100} />
            </Link>
            <div className="mt-12 text-sm">
                {menuItems[0].items.map((item) => {
                    if (item.visible.includes(role)) {
                        return (
                            <Link
                                href={item.href}
                                key={item.label}
                                className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-lamaSkyLight"
                            >
                                {typeof item.icon === "string" ? (
                                    <Image src={item.icon} alt={item.label} width={20} height={20} />
                                ) : (
                                    item.icon
                                )}
                                <span className="hidden lg:block">{item.label}</span>
                            </Link>
                        );
                    }
                })}
            </div>

            <div className="mt-4 text-sm  ">
                {menuItems[1].items.map((item) => {
                    if (item.visible.includes(role)) {
                        return (
                            <Link
                                href={item.href}
                                key={item.label}
                                className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-lamaSkyLight"
                            >
                                {typeof item.icon === "string" ? (
                                    <Image src={item.icon} alt={item.label} width={20} height={20} />
                                ) : (
                                    item.icon
                                )}
                                <span className="hidden lg:block">{item.label}</span>
                            </Link>
                        );
                    }
                })}
            </div>
        </div>
    );
};

export default Menu;
