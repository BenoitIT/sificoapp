import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
export const revalidate = 0;

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const searchValue = searchParams.get("search");
  const currentPage = Number(searchParams?.get("page")) || 1;
  const pageSize = 13;
  const offset = (currentPage - 1) * pageSize;
  const itemCount = await prisma.stuffingreport.count({
    where: {
      ...(searchValue && {
        OR: [
          { code: { contains: searchValue, mode: "insensitive" } },
          { status: { contains: searchValue, mode: "insensitive" } },
          { origin: { contains: searchValue, mode: "insensitive" } },
        ],
      }),
    },
  });
  const stuffingReports = await prisma.stuffingreport.findMany({
    where: {
      ...(searchValue && {
        OR: [
          { code: { contains: searchValue, mode: "insensitive" } },
          { status: { contains: searchValue, mode: "insensitive" } },
          { origin: { contains: searchValue, mode: "insensitive" } },
        ],
      }),
    },
    include: {
      delivery: true,
    },
    take: pageSize,
    skip: offset,
    orderBy: {
      id: "desc",
    },
  });
  const totalPages = Math.ceil(itemCount / pageSize);
  const processedData = stuffingReports.map((record) => {
    return {
      id: record.id,
      date: record.createdAt.toDateString(),
      code: record.code,
      status: record.status,
      origin: record.origin,
      destination: record.delivery.deliveryName,
    };
  });
  return NextResponse.json({
    status: 200,
    data: { containers: processedData, count: totalPages },
  });
};
