import prisma from "../../../../../prisma/client";
import { NextResponse } from "next/server";
export const revalidate=0;
export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const agentId = req.url.split("report/")[1][0];
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const start = startDate ? new Date(startDate) : new Date(new Date().setDate(new Date().getDate() - 30));
  const end = endDate
    ? new Date(new Date(endDate).setDate(new Date(endDate).getDate() + 1))
    : new Date();
  const totalRevenueMade = await prisma.stuffingreportItems.aggregate({
    _sum: {
      totalUsd: true,
    },
    where: {
      createdAt: {
        gte: start,
        lt: end,
      },
      salesAgentId: Number(agentId),
    },
  });
  const agentInfo=await prisma.user.findFirst({where:{id:Number(agentId)}});
  const agentName=agentInfo?.lastName;
  const totalMonitaryValue = totalRevenueMade._sum.totalUsd;
  const totalCommission = await prisma.stuffingreportItems.aggregate({
    _sum: {
      handling: true,
    },
    where: {
      createdAt: {
        gte: start,
        lt: end,
      },
      salesAgentId: Number(agentId),
    },
  });
  const totalCustomersDealt = await prisma.stuffingreportItems.aggregate({
    _count: {
      consigneeId: true,
    },
    where: {
      createdAt: {
        gte: start,
        lt: end,
      },
      salesAgentId: Number(agentId),
    },
  });
  const totalHandling = totalCommission._sum.handling;
  const stuffingRptItems = await prisma.stuffingreportItems.findMany({
    where: {
      salesAgentId: Number(agentId),
      createdAt: {
        gte: start,
        lt: end,
      },
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
  const modifiedResponse = stuffingRptItems.map((stuffingRptItem) => ({
    consigneeId: stuffingRptItem?.consignee?.name,
    phone: stuffingRptItem?.consignee?.phone,
    noOfPkgs: stuffingRptItem?.noOfPkgs,
    typeOfPkg: stuffingRptItem?.typeOfPkg,
    weight: stuffingRptItem?.weight,
    handling: stuffingRptItem?.handling,
    type: stuffingRptItem?.type,
    cbm: stuffingRptItem?.cbm,
    description: stuffingRptItem?.description,
    freight: stuffingRptItem?.freight,
    blFee: stuffingRptItem?.blFee,
    date: stuffingRptItem?.invoice[0]?.createdAt?.toDateString(),
    invoiceNo: stuffingRptItem?.invoiceNo,
    others: stuffingRptItem?.others,
    totalUsd: stuffingRptItem?.totalUsd,
    totalAed: stuffingRptItem?.totalAed,
  }));
  return NextResponse.json({
    status: 200,
    data: {
      totalRevenueMade: totalMonitaryValue,
      totalCommission: totalHandling,
      sales: modifiedResponse,
      customers: totalCustomersDealt._count.consigneeId,
      agentName:agentName
    },
  });
};
