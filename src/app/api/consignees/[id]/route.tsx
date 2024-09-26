import prisma from "../../../../../prisma/client";
import { NextResponse } from "next/server";

export const DELETE = async (req: Request) => {
  try {
    const consigneeId = req.url.split("consignees/")[1];
    const consigneeToDelete = await prisma.consignee.delete({
      where: {
        id: Number(consigneeId),
      },
    });
    if (consigneeToDelete) {
      return NextResponse.json({
        status: 200,
        message: "consignee is deleted successfully",
      });
    }
    return NextResponse.json({
      status: 404,
      message: "consignee is not found",
    });
  } catch (err) {
    return NextResponse.json({
      status: 400,
      message: "something went wrong",
    });
  }
};
