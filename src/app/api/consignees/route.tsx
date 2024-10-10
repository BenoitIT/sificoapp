import prisma from "../../../../prisma/client";
import { NextRequest, NextResponse } from "next/server";
import consigneeValidationSchema from "../validations/shipper";
export const revalidate = 0;
export const POST = async (req: NextRequest) => {
  const body = await req.json();
  body.itemsCode = body.itemscode;
  delete body.itemscode;
  const validation = consigneeValidationSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json({
      message:
        validation.error.errors[0].path +
        " " +
        validation.error.errors[0].message,
      status: 400,
    });
  if (body.email != "") {
    const checkconsigneeEmailExistance = await prisma.consignee.findFirst({
      where: {
        email: body.email,
      },
    });

    if (checkconsigneeEmailExistance)
      return NextResponse.json({
        status: 400,
        message: "A consignee with this email already exist.",
      });
  }
  const checkshipperPhoneExistance = await prisma.consignee.findFirst({
    where: {
      phone: body.phone,
    },
  });
  if (checkshipperPhoneExistance)
    return NextResponse.json({
      status: 400,
      message: "A consignee with this phone number already exist.",
    });
  const shipper = await prisma.consignee.create({ data: body });
  return NextResponse.json({
    status: 201,
    message: "New consignee is successfully registred!",
    data: shipper,
  });
};

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const searchValue = searchParams.get("search");
  const currentPage = Number(searchParams?.get("page"));
  const pageSize = currentPage == 0 ? 1000000 * 1000000 : 13;
  const offset = (currentPage - 1) * pageSize;
  const consignees = await prisma.consignee.findMany({
    where: searchValue
      ? {
          OR: [
            { name: { contains: searchValue, mode: "insensitive" } },
            { location: { contains: searchValue, mode: "insensitive" } },
            { phone: { contains: searchValue, mode: "insensitive" } },
            { email: { contains: searchValue, mode: "insensitive" } },
          ],
        }
      : {},
    take: pageSize,
    skip: offset,
  });
  return NextResponse.json({
    status: 200,
    data: consignees,
  });
};
