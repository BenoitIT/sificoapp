import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
export const GET = async () => {
  const consignees = await prisma.deliverySite.findMany({});
  return NextResponse.json({
    status: 200,
    data: consignees,
  });
};
