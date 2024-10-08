import prisma from "../../../../../../../prisma/client";
import { NextRequest, NextResponse } from "next/server";
export const revalidate = 0;
export const GET = async (req: Request) => {
  try {
    const stuffingRptItemId = req.url.split("invoice/")[1];
    const stuffingRptItems = await prisma.stuffingreportItems.findFirst({
      where: {
        id: Number(stuffingRptItemId),
      },
      include: {
        container: {
          include: {
            deliverysite: true,
            shipper: true,
          },
        },
        consignee: true,
        salesAgent: true,
        invoice: true,
      },
    });

    if (stuffingRptItems) {
      const modifiedResponse = {
        delivery: stuffingRptItems.container.destination,
        shipperId: stuffingRptItems.container.shipper.name,
        consigneeId: stuffingRptItems.consignee.name,
        consigneeLocation: stuffingRptItems.consignee.location,
        code: stuffingRptItems.code,
        phone: stuffingRptItems.consignee.phone,
        mark: stuffingRptItems.mark,
        origin: stuffingRptItems.container.origin,
        destination: `${
          stuffingRptItems.container.deliverysite.country +
          "," +
          stuffingRptItems.container.deliverysite.locationName
        }`,
        salesAgent:
          stuffingRptItems.salesAgent.firstName +
          " " +
          stuffingRptItems.salesAgent.lastName,
        noOfPkgs: stuffingRptItems.noOfPkgs,
        typeOfPkg: stuffingRptItems.typeOfPkg,
        weight: stuffingRptItems.weight,
        line: stuffingRptItems.line,
        containerNo: stuffingRptItems.container.code,
        handling: stuffingRptItems.handling,
        type: stuffingRptItems.type,
        cbm: stuffingRptItems.cbm,
        description: stuffingRptItems.description,
        freight: stuffingRptItems.freight,
        blFee: stuffingRptItems.blFee,
        vat: stuffingRptItems.invoice[0]?.vat || 0.0,
        date: stuffingRptItems.invoice[0]?.createdAt,
        totalAmountInWords:
          stuffingRptItems.invoice[0]?.totalAmountInWords || "total",
        jb: stuffingRptItems.jb,
        invoiceNo: stuffingRptItems.invoiceNo,
        others: stuffingRptItems.others,
        totalUsd: stuffingRptItems.totalUsd,
        totalAed: stuffingRptItems.totalAed,
      };

      return NextResponse.json({
        status: 200,
        data: modifiedResponse,
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
  try {
    const body = await req.json();
    const newInvoice = await prisma.invoice.create({
      data: {
        vat: body.vat,
        totalAmountInWords: body.totalAmountInWords,
        detailsId: body.detailsId,
      },
    });
    if (newInvoice) {
      return NextResponse.json({
        status: 201,
        message: "Invoice is generated successfully.",
      });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      status: 400,
      message: "Could not generate invoice",
    });
  }
};
