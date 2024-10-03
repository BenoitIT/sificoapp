
import prisma from "../../../../../../../prisma/client";
import { NextResponse } from "next/server";
export const revalidate = 0;
export const GET = async (req: Request) => {
    try {
        const stuffingRptItemId = req.url.split("detail/")[1];
        const stuffingRptItems = await prisma.stuffingreportItems.findFirst({
            where: {
                id: Number(stuffingRptItemId),
            },
        });
        return NextResponse.json({
            status: 200,
            data: stuffingRptItems,
        });
    }
    catch (err) {
        return NextResponse.json({
            status: 400,
            message: "Something went wrong",
        });
    }
};

