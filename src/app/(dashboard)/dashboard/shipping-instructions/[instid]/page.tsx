"use client"
import { withRolesAccess } from "@/components/auth/accessRights";
import ShippingInstruction from "../../stuffing-reports/[id]/shippinginstruction/[instid]/(prepartionDetails)/actualInstruction";

const Page = () => {
  return <ShippingInstruction />;
};
export default withRolesAccess(Page, ["origin agent", "admin"]) as React.FC;
