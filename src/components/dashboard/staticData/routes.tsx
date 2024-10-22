import { LuLayoutDashboard } from "react-icons/lu";
import { BsListUl } from "react-icons/bs";
import { GearIcon } from "@radix-ui/react-icons";
import { LiaShippingFastSolid, LiaSitemapSolid } from "react-icons/lia";
import { TbReport, TbUsersGroup } from "react-icons/tb";
import { FaRegCircleUser } from "react-icons/fa6";
import { MdMoveDown } from "react-icons/md";
import { BsCashCoin } from "react-icons/bs";
import { MdOutlineIntegrationInstructions } from "react-icons/md";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { GiPayMoney } from "react-icons/gi";
import { SiPayoneer } from "react-icons/si";
import { GiStorkDelivery } from "react-icons/gi";

export const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: <LuLayoutDashboard />,
        label: "Dashboard",
        href: "/dashboard",
        visible: ["admin", "origin agent","finance","head of finance"],
      },
      {
        icon: <LuLayoutDashboard />,
        label: "Dashboard",
        href: "/opmanager",
        visible: ["operation manager"],
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
        href: "/opmanager/stuffing-reports",
        visible: ["operation manager"],
      },
      {
        icon: <MdOutlineIntegrationInstructions />,
        label: "Shipping instructions",
        href: "/opmanager/shipping-instructions",
        visible: ["operation manager"],
      },
      {
        icon: <MdOutlineIntegrationInstructions />,
        label: "Shipping instructions",
        href: "/dashboard/shipping-instructions",
        visible: ["admin", "origin agent"],
      },
      {
        icon: <TbUsersGroup />,
        label: "Staff",
        href: "/dashboard/staff",
        visible: ["admin"],
      },
      {
        icon: <LiaSitemapSolid />,
        label: "Destination sites",
        href: "/dashboard/sites",
        visible: ["admin", "origin agent"],
      },
      {
        icon: <GiStorkDelivery />,
        label: "Deliveries",
        href: "/dashboard/deliveries",
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
        visible: ["admin", "finance","head of finance"],
      },
      {
        icon: <BsCashCoin />,
        label: "Invoices",
        href: "/opmanager/invoices",
        visible: ["operation manager"],
      },
      {
        icon: <SiPayoneer />,
        label: "Containers payments",
        href: "/dashboard/containerspayment",
        visible: ["admin", "finance","head of finance"],
      },
      {
        icon: <GiPayMoney />,
        label: "commissions",
        href: "/dashboard/commissions",
        visible: ["admin", "finance","head of finance"],
      },
      {
        icon: <HiOutlineDocumentReport />,
        label: "Financial report",
        href: "/dashboard/finance",
        visible: ["admin", "finance","head of finance"],
      },
      {
        icon: <TbReport />,
        label: "Performance report",
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
        visible: ["admin", "origin agent", "operation manager","finance","head of finance"],
      },
      {
        icon: <GearIcon />,
        label: "Settings",
        href: "/dashboard/settings",
        visible: ["admin", "origin agent"],
      },
    ],
  },
];
