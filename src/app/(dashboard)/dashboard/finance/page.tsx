"use client";
import { setPageTitle } from "@/redux/reducers/pageTitleSwitching";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import FinancialReport from "@/components/dashboard/pages/financialReprt";
import { FinancialRptHeaders } from "@/app/tableHeaders/financialreport";
import { DummyData } from "./dummy";
import { withRolesAccess } from "@/components/auth/accessRights";

const Page = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle("Financial report"));
  }, [dispatch]);
  return <FinancialReport headers={FinancialRptHeaders} data={DummyData} />;
};
export default withRolesAccess(Page, ["finance", "admin","head of finance"]) as React.FC;
