import prisma from "../../../../prisma/client";
import { NextRequest, NextResponse } from "next/server";
import userValidationSchema from "../validations/user";
import bcrypt from "bcrypt";
export const revalidate = 0;

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const userDataValidation = userValidationSchema.safeParse(body);
  if (!userDataValidation.success)
    return NextResponse.json({
      message:
        userDataValidation.error.errors[0].path +
        " " +
        userDataValidation.error.errors[0].message,
      status: 400,
    });
  const checkUserEmailExistance = await prisma.user.findFirst({
    where: {
      email: body.email,
    },
  });
  if (checkUserEmailExistance)
    return NextResponse.json({
      status: 400,
      message: "Staff with this email already exist.",
    });
  const checkUserPhoneExistance = await prisma.user.findFirst({
    where: {
      phone: body.phone,
    },
  });
  if (checkUserPhoneExistance)
    return NextResponse.json({
      status: 400,
      message: "Staff with this phone number already exist.",
    });
  const unIncryptedPassword =
    body.firstName[0] + body.lastName[0] + body.phone.slice(0, 6);
  body.password = await bcrypt.hash(unIncryptedPassword, 10);
  const user = await prisma.user.create({ data: body });
  return NextResponse.json({
    status: 201,
    message: "New staff is successfully registred!",
    data: user,
  });
};

export const GET = async () => {
  const users = await prisma.user.findMany({});
  return NextResponse.json({
    status: 200,
    data: users,
  });
};
