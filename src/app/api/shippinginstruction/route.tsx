import { convertTimestamp } from "@/app/utilities/dateFormat";
import prisma from "../../../../prisma/client";
import { NextResponse } from "next/server";

export const revalidate = 0;

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const searchValue = searchParams.get("search") || "";
  const currentPage = Number(searchParams?.get("page")) || 1;
  const pageSize = 13;
  const offset = (currentPage - 1) * pageSize;
  const shippingInstructions = await prisma.shippingInstruction.findMany({
    where: {
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
    orderBy:{
      id:"desc"
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
    skip: offset,
    take: pageSize,
  });
  const shippingInstructionsCount = await prisma.shippingInstruction.count({
    where: {
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
  });
  const totalPages = Math.ceil(shippingInstructionsCount  / pageSize);
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
    updatedAt: convertTimestamp(instruction.updatedAt),
  }));

  return NextResponse.json({
    status: 200,
    data: processedInstructions,
    count:totalPages
  });
};
