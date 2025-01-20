import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import { convertTimestamp } from "@/app/utilities/dateFormat";
export const revalidate = 0;

export const PUT = async (req: Request) => {
  try {
    const comminsionId = req.url.split("commissions/")[1];
    const body = await req.json();
    delete body.id;
    const date = new Date().toISOString();
    body.paidAt = date;
    const activeCommission = await prisma.commissions.findFirst({
      where: {
        id: Number(comminsionId),
      },
    });
    if (activeCommission) {
      const paidCommission = activeCommission.amountPaid + body.amountPaid;
      const paymentStatus =
        paidCommission == 0
          ? "Pending"
          : paidCommission == activeCommission.totalAmount
          ? "Paid"
          : "Partially paid";
      body.paymentStatus = paymentStatus;
      body.amountPaid = paidCommission;
      if (activeCommission.paymentStatus == "Paid") {
        return NextResponse.json({
          status: 400,
          message: "The commission is already paid",
        });
      } else if (paidCommission > activeCommission.totalAmount) {
        return NextResponse.json({
          status: 400,
          message: "Only required commission amount should be paid.",
        });
      } else {
        const comminsion = await prisma.commissions.update({
          where: {
            id: Number(comminsionId),
          },
          data: body,
        });
        if (comminsion) {
          return NextResponse.json({
            status: 200,
            message: "comminsion's information are updated succesfully",
          });
        } else {
          return NextResponse.json({
            status: 404,
            message: "Coud not find comminsion",
          });
        }
      }
    } else {
      return NextResponse.json({
        status: 404,
        message: "Commission is no longer found",
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
  const { searchParams } = new URL(req.url);
  const searchValue = searchParams.get("search");
  const containerid=searchParams.get("container");
  const currentPage = Number(searchParams?.get("page")) || 1;
  const pageSize = 30;
  const offset = (currentPage - 1) * pageSize;
  try {
    const commissionsCount = await prisma.commissions.count({
      where: {
        agent: {
          OR: [
            {
              firstName: {
                contains: searchValue || "",
                mode: "insensitive",
              },
            },
            {
              lastName: {
                contains: searchValue || "",
                mode: "insensitive",
              },
            },
          ],
        },
        containerCode:containerid!,
        handling: {
          gt: 0,
        },
      },
    });
    const commissions = await prisma.commissions.findMany({
      where: {
        agent: {
          OR: [
            {
              firstName: {
                contains: searchValue || "",
                mode: "insensitive",
              },
            },
            {
              lastName: {
                contains: searchValue || "",
                mode: "insensitive",
              },
            },
          ],
        },
        containerCode:containerid!,
        handling: {
          gt: 0,
        },
      },
      include: {
        agent: true,
      },
      orderBy: {
        id: "desc",
      },
      skip: offset,
      take: pageSize,
    });
    const totalPages = Math.ceil(commissionsCount / pageSize);

    const modifiedResponse =commissions.map(
      (commission) => ({
        id: commission.id,
        date: convertTimestamp(commission.createdAt),
        agentName: commission.agent.firstName + " " + commission.agent.lastName,
        handling: commission.handling,
        rate: commission.rate,
        commission: commission.totalAmount,
        commissionPaid: commission.amountPaid,
        paymentstatus: commission.paymentStatus,
        paidAt: commission.paidAt ? convertTimestamp(commission.paidAt) : "-",
        paidBy: commission.paidBy.length > 0 ? commission.paidBy : "-",
      })
    );

    return NextResponse.json({
      status: 200,
      data: modifiedResponse,
      count: totalPages,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({
      status: 400,
    });
  }
};
