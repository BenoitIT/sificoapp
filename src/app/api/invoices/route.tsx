import prisma from "../../../../prisma/client";
import { NextResponse } from "next/server";
export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const searchValue = searchParams.get("search");
  const records = await prisma.invoice.findMany({
    where: searchValue
      ? {
          OR: [
            {
              details: {
                container: {
                  code: {
                    contains: searchValue,
                    mode: "insensitive",
                  },
                },
              },
            },
            {
              details: {
                consignee: {
                  name: {
                    contains: searchValue,
                    mode: "insensitive",
                  },
                },
              },
            },
            {
              details: {
                consignee: {
                  phone: {
                    contains: searchValue,
                    mode: "insensitive",
                  },
                },
              },
            },
            {
              details: {
                invoiceNo: {
                  contains: searchValue,
                  mode: "insensitive",
                },
              },
            },
          ],
        }
      : {},
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
      createdBy: true,
    },
  });
  const invoices = records.map((record) => {
    return {
      id: record.id,
      date: record.createdAt.toDateString(),
      consigneeName: record.details.consignee.name,
      containerId: record.details.container.code,
      origin: record.details.container.origin,
      createdBy: record.createdBy.lastName,
      createdById: record.createdBy.id,
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
