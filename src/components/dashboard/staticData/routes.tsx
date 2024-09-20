import { FaSignOutAlt } from "react-icons/fa";
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
        href: "/admin",
        visible: ["admin", "transimitter", "agent", "Financier", "Customer"],
      },
      {
        icon: <BsListUl />,
        label: "Stuffing reports",
        href: "/admin/stuffing-reports",
        visible: ["admin", "transimitter"],
      },
      {
        icon: <BsListUl />,
        label: "Stuffing reports",
        href: "/agent/stuffing-reports",
        visible: ["agent"],
      },
      {
        icon: <TbUsersGroup />,
        label: "Staff",
        href: "/admin/staff",
        visible: ["admin"],
      },
      {
        icon: <LiaSitemapSolid />,
        label: "Delivery Sites",
        href: "/admin/sites",
        visible: ["admin"],
      },
      {
        icon: <LiaShippingFastSolid />,
        label: "Shippers",
        href: "/admin/shippers",
        visible: ["admin"],
      },
      {
        icon: <MdMoveDown />,
        label: "Consignees",
        href: "/admin/consignees",
        visible: ["admin"],
      },
      {
        icon: <BsCashCoin />,
        label: "Invoices",
        href: "/admin/invoices",
        visible: ["admin"],
      },
      {
        icon: <BsCashCoin />,
        label: "Invoices",
        href: "/agent/invoices",
        visible: ["agent"],
      },
      {
        icon: <TbReport />,
        label: "Reports",
        href: "/admin/reports",
        visible: ["admin"],
      },
      {
        icon: <TbReport />,
        label: "Reports",
        href: "/agent/reports",
        visible: ["agent"],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: <FaRegCircleUser />,
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
