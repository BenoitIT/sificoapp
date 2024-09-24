import prisma from "../../../../../../prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const decoded = jwt.verify(body.token, process.env.NEXT_JWT_SECRETE!) as {
      id: number;
    };
    if (!decoded) return;
    const userId = decoded.id;
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: hashedPassword,
      },
    });
    if (!updatedUser)
      return NextResponse.json({
        status: 400,
        message: "Could not update password. token got expired",
      });
    return NextResponse.json({
      status: 200,
      message: "Password is updated successfully",
    });
  } catch (err) {
    return NextResponse.json({
      status: 400,
      message: "token got expired",
    });
  }
};
