import prisma from "../../../../../prisma/client";
import { NextResponse } from "next/server";
export const revalidate = 0;
export const GET = async (req: Request) => {
  try {
    const invoiceId = req.url.split("invoices/")[1];
    const invoice = await prisma.invoice.findFirst({
      where: {
        id: Number(invoiceId),
      },
      include: {
        details: {
          include: {
            container: true,
          },
        },
      },
    });
    if (invoice) {
      const invoiceDetail = {
        itemsId: invoice.details.id,
        reportId: invoice.details.container.id,
      };
      return NextResponse.json({
        status: 200,
        data: invoiceDetail,
      });
    } else {
      return NextResponse.json({
        status: 200,
        data: null,
      });
    }
  } catch (err) {
    return NextResponse.json({
      status: 400,
      message: "something went wrong",
    });
  }
};

export const PUT = async (req: Request) => {
  try {
    const invoiceId = req.url.split("invoices/")[1];
    const updatedInvoice = await prisma.invoice.update({
      where: {
        id: Number(invoiceId),
      },
      data: {
        paymentApproved: true,
        releaseGenarated: true,
      },
    });
    if (updatedInvoice) {
      return NextResponse.json({
        status: 200,
        message: "Invoice payment is approved.",
      });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({
      status: 400,
      message: "Failed to approve this payment.",
    });
  }
};
