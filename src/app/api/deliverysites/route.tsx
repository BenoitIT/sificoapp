import prisma from "../../../../prisma/client";
import { NextRequest, NextResponse } from "next/server";
import deliveryValidationSchema from "../validations/deliverySite";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const validation = deliveryValidationSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json({
      message:
        validation.error.errors[0].path +
        " " +
        validation.error.errors[0].message,
      status: 400,
    });
  }
  const deliverySite = await prisma.deliverySite.create({
    data: body,
  });
  return NextResponse.json({
    message: "New delivery site is registred",
    data: deliverySite,
    status: 201,
  });
};

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const searchValue = searchParams.get("search");
  const currentPage=Number(searchParams?.get("page"));
  const pageSize = 13; 
  const offset = (currentPage - 1) * pageSize;
  const deliverySites = await prisma.deliverySite.findMany({
    where: searchValue
      ? {
          OR: [
            { country: { contains: searchValue, mode: "insensitive" } },
            { locationName: { contains: searchValue, mode: "insensitive" } },
            {
              user: {
                OR: [
                  { firstName: { contains: searchValue, mode: "insensitive" } },
                  { lastName: { contains: searchValue, mode: "insensitive" } },
                ],
              },
            },
          ],
        }
      : {},
    include: {
      user: true,
    },
    skip:offset,
    take:pageSize
  });
  const transformedSites = deliverySites.map((site) => ({
    id: site.id,
    country: site.country,
    locationName: site.locationName,
    agent: `${site.user.firstName} ${site.user.lastName}`,
  }));
  return NextResponse.json({
    data: transformedSites,
    status: 200,
  });
};
