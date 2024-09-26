import prisma from "../../../../../prisma/client";
import { NextResponse } from "next/server";

export const DELETE = async (req: Request) => {
  try {
    const siteId = req.url.split("deliverysites/")[1];
    const site = await prisma.deliverySite.delete({
      where: {
        id: Number(siteId),
      },
    });
    if (site) {
      return NextResponse.json({
        status: 200,
        message: "Delivery site is deleted successfully",
      });
    }
    return NextResponse.json({
      status: 404,
      message: "Delivery site is not found",
    });
  } catch (err) {
    return NextResponse.json({
      status: 400,
      message: "something went wrong",
    });
  }
};
