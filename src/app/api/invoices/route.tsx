import prisma from "../../../../prisma/client";
import { NextResponse } from "next/server";
export const GET = async () => {
  const records = await prisma.invoice.findMany({
    include: {
      details: {
        include: {
          consignee: true,
          container: {
            include: {
              deliverysite: true,
            },
          },
        },
      },
    },
  });
  const invoices = records.map((record) => {
    return {
      id: record.id,
      consigneeName: record.details.consignee.name,
      containerId: record.details.container.code,
      origin: record.details.container.origin,
      destination:
        record.details.container.deliverysite.country +
        "," +
        record.details.container.deliverysite.locationName,
      invoiceNo: record.details.invoiceNo,
      totalUsd: record.details.totalUsd,
      totalEud: record.details.totalAed,
    };
  });
  return NextResponse.json({
    status: 200,
    data: invoices,
  });
};