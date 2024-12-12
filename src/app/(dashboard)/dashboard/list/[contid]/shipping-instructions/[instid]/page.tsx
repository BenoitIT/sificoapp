"use client";
import { withRolesAccess } from "@/components/auth/accessRights";
import ShippingInstruction from "@/app/(dashboard)/dashboard/stuffing-reports/[id]/shippinginstruction/[instid]/(prepartionDetails)/actualInstruction";

const Page = () => {
  return <ShippingInstruction />;
};
export default withRolesAccess(Page, [
  "senior operation manager",
  "admin",
  "operation manager",
  "finance",
  "head of finance",
]) as React.FC;
