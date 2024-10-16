import prisma from "../../../../../prisma/client";
import { NextRequest, NextResponse } from "next/server";
import stuffingItemSchema from "../../validations/stuffingItem";
export const revalidate = 0;
export const DELETE = async (req: Request) => {
  try {
    const stuffingRptId = req.url.split("stuffingreports/")[1];
    const stuffingRpt = await prisma.stuffingreport.findFirst({
      where: {
        id: Number(stuffingRptId),
      },
    });
    if (stuffingRpt?.status?.toLowerCase() == "available") {
      await prisma.stuffingreportItems.deleteMany({
        where: {
          stuffingreportid: Number(stuffingRptId),
        },
      });
      const stuffingRpttoDelete = await prisma.stuffingreport.delete({
        where: {
          id: Number(stuffingRptId),
        },
      });
      if (stuffingRpttoDelete) {
        return NextResponse.json({
          status: 200,
          message: "Stuffing report is deleted successfully",
        });
      }
    } else if (stuffingRpt?.status?.toLowerCase() !== "available") {
      return NextResponse.json({
        status: 400,
        message: `This stuffing report can not be deleted. it is ${stuffingRpt?.status}`,
      });
    } else {
      return NextResponse.json({
        status: 404,
        message: "That stuffing report id is not found",
      });
    }
  } catch (err) {
    return NextResponse.json({
      status: 400,
      message: "something went wrong",
    });
  }
};
export const GET = async (req: Request) => {
  try {
    const stuffingRptId = req.url.split("stuffingreports/")[1];
    const stuffingRpt = await prisma.stuffingreport.findFirst({
      where: {
        id: Number(stuffingRptId),
      },
      include: {
        deliverysite: true,
      },
    });
    const stuffingRptItems = await prisma.stuffingreportItems.findMany({
      where: {
        stuffingreportid: Number(stuffingRptId),
      },
      include: {
        container: {
          include: {
            shipper: true,
          },
        },
        consignee: true,
        salesAgent: true,
      },
      orderBy:{
        id:"desc"
      }
    });

    if (stuffingRptItems) {
      const modifiedResponse = stuffingRptItems.map((item) => {
        return {
          id: item.id,
          delivery: item.container.destination,
          shipperId: item.container.shipper.name,
          consigneeId: item.consignee.name,
          code: item.code,
          phone: item.consignee.phone,
          mark: item.mark,
          salesAgent:
            item.salesAgent.firstName + " " + item.salesAgent.lastName,
          noOfPkgs: item.noOfPkgs,
          typeOfPkg: item.typeOfPkg,
          weight: item.weight,
          line: item.line,
          handling: item.handling,
          type: item.type,
          cbm: item.cbm,
          description: item.description,
          freight: item.freight,
          blFee: item.blFee,
          jb: item.jb,
          invoiceNo: item.invoiceNo,
          others: item.others,
          totalUsd: item.totalUsd,
          totalAed: item.totalAed,
        };
      });

      const totals = stuffingRptItems.reduce(
        (acc, item) => {
          acc.noOfPkgs += item.noOfPkgs || 0;
          acc.weight += item.weight || 0;
          acc.cbm += item.cbm || 0;
          acc.freight += item.freight || 0;
          acc.blFee += item.blFee || 0;
          acc.jb += item.jb || 0;
          acc.handling += item.handling || 0;
          acc.line += item.line || 0;
          acc.others += item.others || 0;
          acc.totalUsd += item.totalUsd || 0;
          acc.totalAed += item.totalAed || 0;
          return acc;
        },
        {
          noOfPkgs: 0,
          weight: 0,
          cbm: 0,
          freight: 0,
          blFee: 0,
          handling: 0,
          line: 0,
          jb: 0,
          others: 0,
          totalUsd: 0,
          totalAed: 0,
        }
      );

      return NextResponse.json({
        status: 200,
        data: { shipments: modifiedResponse, stuffingRpt, totals },
      });
    }

    return NextResponse.json({
      status: 404,
      message: "That stuffing report is not found",
    });
  } catch (err) {
    return NextResponse.json({
      status: 400,
      message: "Something went wrong",
    });
  }
};

export const POST = async (req: NextRequest) => {
  const stuffingRptId = req.url.split("stuffingreports/")[1];
  const body = await req.json();
  const date = new Date();
  const validation = stuffingItemSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json({
      message:
        validation.error.errors[0].path +
        " " +
        validation.error.errors[0].message,
      status: 400,
    });
  }
  const dollarExchangeRate = await prisma.calculationDependancy.findFirst({});
  const previousItem = await prisma.stuffingreportItems.findFirst({
    orderBy: {
      id: "desc",
    },
  });
  const stuffingreportid = Number(stuffingRptId);
  const consignee = body.consignee;
  const mark = body.mark ?? "";
  const salesAgent = body.salesAgent ?? "";
  const code = body.code ?? "";
  const noOfPkgs = body.noOfPkgs;
  const typeOfPkg = body.typeOfPkg ?? "";
  const weight = body.weight;
  const handling = body.handling ?? 0;
  const cbm = body.cbm ?? 0;
  const description = body.description ?? "";
  const freight = body.freight ?? 0;
  const blFee = body.blFee ?? 0;
  const jb = body.blFee ?? 0;
  const others = body.blFee ?? 0;
  const totalUsd = handling + freight + blFee + jb + others;
  const totalAed = totalUsd * (dollarExchangeRate?.aed ?? 3.66);
  const invoiceNo =
    stuffingRptId +
    "/" +
    date.getFullYear() +
    "/" +
    Number((previousItem?.id ?? 0) + 1);
  const stuffingReportCheck = await prisma.stuffingreport.findFirst({
    where: {
      id: Number(stuffingreportid),
    },
  });
  if (stuffingReportCheck?.status?.toLowerCase() != "available") {
    return NextResponse.json({
      status: 400,
      message: "No other shipment is allowed to be added",
    });
  }
  const stuffingreportItem = await prisma.stuffingreportItems.create({
    data: {
      stuffingreportid: stuffingreportid,
      salesAgentId: salesAgent,
      consigneeId: consignee,
      code: code,
      mark: mark,
      noOfPkgs: noOfPkgs,
      typeOfPkg: typeOfPkg,
      weight: weight,
      line: body.line ?? 0,
      handling: handling,
      type: body.type,
      cbm: cbm,
      description: description,
      freight: freight,
      blFee: blFee,
      jb: jb,
      invoiceNo: invoiceNo,
      others: others,
      totalUsd: totalUsd,
      totalAed: totalAed,
    },
  });
  return NextResponse.json({
    status: 201,
    message: "New shipment is successfully saved!",
    data: stuffingreportItem,
  });
};
export const PUT = async (req: Request) => {
  try {
    const stuffingreportId = req.url.split("stuffingreports/")[1];
    const body = await req.json();
    const stuffingreport = await prisma.stuffingreport.update({
      where: {
        id: Number(stuffingreportId),
      },
      data: body,
    });
    if (stuffingreport) {
      return NextResponse.json({
        status: 200,
        message: "Stuffing report information are updated succesfully",
      });
    }
    return NextResponse.json({
      status: 404,
      message: "Coud not find stuffing report",
    });
  } catch (err) {
    return NextResponse.json({
      status: 400,
      message: "something went wrong",
    });
  }
};
