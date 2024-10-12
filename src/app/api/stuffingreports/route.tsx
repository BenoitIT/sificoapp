import prisma from "../../../../prisma/client";
import { NextRequest, NextResponse } from "next/server";
import stuffingreportValidationSchema from "../validations/stuffingreport";
export const revalidate = 0;
export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const date = new Date();
  const validation = stuffingreportValidationSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json({
      message:
        validation.error.errors[0].path +
        " " +
        validation.error.errors[0].message,
      status: 400,
    });
  const previousstuffingReport = await prisma.stuffingreport.findFirst({
    orderBy: { id: "desc" },
  });
  const prevId = previousstuffingReport?.id ?? 0;
  const stuffingReportID =
    "SIF" +
    `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}` +
    body.origin[0].toUpperCase() +
    body.origin[1].toUpperCase() +
    prevId +
    1;
  const status = "Available";
  body.code = stuffingReportID;
  body.status = status;
  body.shipperId = body.shipper;
  delete body.shipper;
  const stuffingReport = await prisma.stuffingreport.create({ data: body });
  return NextResponse.json({
    status: 201,
    message: "New stuffing report is initialized",
    data: stuffingReport,
  });
};
export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const searchValue = searchParams.get("search");
  const currentPage = Number(searchParams?.get("page"));
  const pageSize = 13;
  const offset = (currentPage - 1) * pageSize;
  const itemCount = await prisma.stuffingreport.count({
    where: searchValue
      ? {
          OR: [
            { code: { contains: searchValue, mode: "insensitive" } },
            { status: { contains: searchValue, mode: "insensitive" } },
            { origin: { contains: searchValue, mode: "insensitive" } },
            {
              deliverysite: {
                OR: [
                  { country: { contains: searchValue, mode: "insensitive" } },
                  {
                    locationName: {
                      contains: searchValue,
                      mode: "insensitive",
                    },
                  },
                  {
                    user: {
                      firstName: { contains: searchValue, mode: "insensitive" },
                      lastName: { contains: searchValue, mode: "insensitive" },
                    },
                  },
                ],
              },
            },
          ],
        }
      : {},
  });
  const stuffingReports = await prisma.stuffingreport.findMany({
    where: searchValue
      ? {
          OR: [
            { code: { contains: searchValue, mode: "insensitive" } },
            { status: { contains: searchValue, mode: "insensitive" } },
            { origin: { contains: searchValue, mode: "insensitive" } },
            {
              deliverysite: {
                OR: [
                  { country: { contains: searchValue, mode: "insensitive" } },
                  {
                    locationName: {
                      contains: searchValue,
                      mode: "insensitive",
                    },
                  },
                  {
                    user: {
                      firstName: { contains: searchValue, mode: "insensitive" },
                      lastName: { contains: searchValue, mode: "insensitive" },
                    },
                  },
                ],
              },
            },
          ],
        }
      : {},
    include: {
      deliverysite: {
        include: {
          user: true,
        },
      },
    },
    take: pageSize,
    skip: offset,
  });
  const totalPages = Math.ceil(itemCount / pageSize);
  const processedData = stuffingReports.map((record) => {
    return {
      id: record.id,
      date: record.createdAt.toDateString(),
      code: record.code,
      status: record.status,
      origin: record.origin,
      operatorId: record.deliverysite.user.id,
      destination:
        record.deliverysite.country + "," + record.deliverysite.locationName,
    };
  });
  return NextResponse.json({
    status: 200,
    data: { containers: processedData, count: totalPages },
  });
};
