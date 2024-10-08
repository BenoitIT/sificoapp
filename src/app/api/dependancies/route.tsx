import prisma from "../../../../prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    const calculationDependancies =
      await prisma.calculationDependancy.findFirst({});
    if (calculationDependancies) {
      return NextResponse.json({
        status: 200,
        data: calculationDependancies,
      });
    }
    return NextResponse.json({
      status: 400,
      data: null,
    });
  } catch (err) {
    console.error(err);
  }
};
export const PUT = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const calculationDependancies =
      await prisma.calculationDependancy.findFirst({});
    if (calculationDependancies) {
      const updatedInfo = await prisma.calculationDependancy.update({
        where: {
          id: calculationDependancies.id,
        },
        data: body,
      });
      return NextResponse.json({
        status: 200,
        data: updatedInfo,
        message: "Update success",
      });
    }
    return NextResponse.json({
      status: 400,
      message: "Update failed",
    });
  } catch (err) {
    console.error(err);
  }
};
