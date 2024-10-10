import { LuLayoutDashboard } from "react-icons/lu";
import { BsListUl } from "react-icons/bs";
import { GearIcon } from "@radix-ui/react-icons";
import { LiaShippingFastSolid, LiaSitemapSolid } from "react-icons/lia";
import { TbReport, TbUsersGroup } from "react-icons/tb";
import { FaRegCircleUser } from "react-icons/fa6";
import { MdMoveDown } from "react-icons/md";
import { BsCashCoin } from "react-icons/bs";

export const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: <LuLayoutDashboard />,
        label: "Dashboard",
        href: "/dashboard",
        visible: ["admin", "origin agent", "operation manager"],
      },
      {
        icon: <BsListUl />,
        label: "Stuffing reports",
        href: "/dashboard/stuffing-reports",
        visible: ["admin", "origin agent"],
      },
      {
        icon: <BsListUl />,
        label: "Stuffing reports",
        href: "/agent/stuffing-reports",
        visible: ["operation manager"],
      },
      {
        icon: <TbUsersGroup />,
        label: "Staff",
        href: "/dashboard/staff",
        visible: ["admin"],
      },
      {
        icon: <LiaSitemapSolid />,
        label: "Delivery sites",
        href: "/dashboard/sites",
        visible: ["admin", "origin agent"],
      },
      {
        icon: <LiaShippingFastSolid />,
        label: "Shippers",
        href: "/dashboard/shippers",
        visible: ["admin"],
      },
      {
        icon: <MdMoveDown />,
        label: "Customers",
        href: "/dashboard/consignees",
        visible: ["admin", "origin agent"],
      },
      {
        icon: <BsCashCoin />,
        label: "Invoices",
        href: "/dashboard/invoices",
        visible: ["admin"],
      },
      {
        icon: <BsCashCoin />,
        label: "Invoices",
        href: "/agent/invoices",
        visible: ["operation manager"],
      },
      {
        icon: <TbReport />,
        label: "Sales report",
        href: "/dashboard/reports",
        visible: ["admin", "origin agent"],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: <FaRegCircleUser />,
        label: "Profile",
        href: "/dashboard/profile",
        visible: ["admin", "origin agent", "operation manager"],
      },
      {
        icon: <GearIcon />,
        label: "Settings",
        href: "/dashboard/settings",
        visible: ["admin"],
      },
    ],
  },
];
