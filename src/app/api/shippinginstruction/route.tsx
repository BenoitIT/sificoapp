import { convertDate, convertTimestamp } from "@/app/utilities/dateFormat";
import prisma from "../../../../prisma/client";
import { NextResponse } from "next/server";

export const revalidate = 0;

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const searchValue = searchParams.get("search") || "";
  const containerId = Number(searchParams?.get("contid"));
  const shippingInstructions = await prisma.shippingInstruction.findMany({
    where: {
      AND: [
        {
          stuffingReportItems: {
            stuffingreportid: containerId,
          },
        },
      ],
      OR: [
        {
          stuffingReportItems: {
            consignee: { name: { contains: searchValue, mode: "insensitive" } },
          },
        },
        {
          stuffingReportItems: {
            salesAgent: {
              firstName: { contains: searchValue, mode: "insensitive" },
            },
          },
        },
        {
          stuffingReportItems: {
            salesAgent: {
              lastName: { contains: searchValue, mode: "insensitive" },
            },
          },
        },
        {
          finaldelivery: {
            country: { contains: searchValue, mode: "insensitive" },
          },
        },
        {
          finaldelivery: {
            locationName: { contains: searchValue, mode: "insensitive" },
          },
        },
      ],
    },
    orderBy: {
      id: "desc",
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
  const processedInstructions = shippingInstructions.map((instruction) => ({
    id: instruction.stuffingReportItems.id,
    customerName: instruction.stuffingReportItems.consignee.name,
    salesAgent:
      instruction.stuffingReportItems.salesAgent.firstName +
      " " +
      instruction.stuffingReportItems.salesAgent.lastName,
    destination:
      instruction.finaldelivery.country +
      "-" +
      instruction.finaldelivery.locationName,
    createdAt: convertTimestamp(instruction.createdAt?.toString()),
    updatedAt: convertDate(instruction.updatedAt),
  }));

  return NextResponse.json({
    status: 200,
    data: processedInstructions,
    count: 1,
  });
};
