import prisma from "../../../../../prisma/client";
import { NextResponse } from "next/server";
export const revalidate=0;
export const GET = async () => {
  const users = await prisma.user.findMany({
    where: {
      role: "operation manager",
    },
    include:{
      deliverySite:true
    }
  });
  return NextResponse.json({
    status: 200,
    data: users,
  });
};
