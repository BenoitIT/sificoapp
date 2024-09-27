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
  const stuffingReportID =
    "SIF" +
    `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}` +
    body.origin[0].toUpperCase() +
    body.origin[1].toUpperCase() +
    date.getHours() +
    date.getMinutes() +
    date.getSeconds();
  const status = "Available";
  body.code = stuffingReportID;
  body.status = status;
  const stuffingReport = await prisma.stuffingreport.create({ data: body });
  return NextResponse.json({
    status: 201,
    message: "New stuffing report is initialized",
    data: stuffingReport,
  });
};
export const GET = async () => {
  const stuffingReports = await prisma.stuffingreport.findMany({
    include: {
      deliverysite: true,
    },
  });
  const processedData = stuffingReports.map((record) => {
    return {
      id: record.id,
      code: record.code,
      status: record.status,
      origin: record.origin,
      destination:
        record.deliverysite.country + "," + record.deliverysite.locationName,
    };
  });
  return NextResponse.json({
    status: 200,
    data: processedData,
  });
};
