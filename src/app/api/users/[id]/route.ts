import prisma from "../../../../../prisma/client";
import { NextResponse } from "next/server";

export const DELETE = async (req: Request) => {
  try {
    const userId = req.url.split("users/")[1];
    const userToDelete = await prisma.user.delete({
      where: {
        id: Number(userId),
      },
    });
    if (userToDelete) {
      return NextResponse.json({
        status: 200,
        message: "User is deleted successfully",
      });
    }
    return NextResponse.json({
      status: 404,
      message: "User is not found",
    });
  } catch (err) {
    return NextResponse.json({
      status: 400,
      message: "something went wrong",
    });
  }
};
