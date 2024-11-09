import { convertTimestamp } from "@/app/utilities/dateFormat";
import prisma from "../../../../../../prisma/client";
import { NextResponse } from "next/server";
export const revalidate = 0;
export const GET = async (req: Request) => {
    try{
  const locationId = req.url.split("location/")[1];
  const shippingInstructions = await prisma.shippingInstruction.findMany({
    where: {
      finaldelivery: {
        user: {
          id: Number(locationId),
        },
      },
    },
    include: {
      finaldelivery: true,
      stuffingReportItems: {
        include: {
          consignee: true,
          salesAgent: true,
        },
      },
    },
  });
  const preccessedInstructions = shippingInstructions.map((instruction) => ({
    id: instruction.stuffingReportItems.id,
    customerName: instruction.stuffingReportItems.consignee.name,
    salesAgent:
      instruction.stuffingReportItems.salesAgent.firstName +
      " " +
      instruction.stuffingReportItems.salesAgent.firstName,
    destination:
      instruction.finaldelivery.country +
      "-" +
      instruction.finaldelivery.locationName,
    createdAt: convertTimestamp(instruction.createdAt?.toString()),
    updatedAt: convertTimestamp(instruction.updatedAt),
  }));
  return NextResponse.json({
    status: 200,
    data: preccessedInstructions,
  });
}catch(err){
    console.error("errorro",err)
}
};
