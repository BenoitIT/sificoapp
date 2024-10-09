
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

export const PUT = async (req: Request) => {
    try {
        const stuffingRptItemId = req.url.split("detail/")[1];
        const body = await req.json();
        const dollarExchangeRate = await prisma.calculationDependancy.findFirst({});
        const consignee = body.consignee;
        const mark = body.mark ?? "";
        const salesAgent = body.salesAgent!;
        const code = body.code ?? "";
        const noOfPkgs = body.noOfPkgs;
        const typeOfPkg = body.typeOfPkg ?? "";
        const weight = body.weight;
        const handling = body.handling ?? 0;
        const cbm = body.cbm ?? 0;
        const description = body.description ?? "";
        const freight = body.freight ?? 0;
        const blFee = body.blFee ?? 0;
        const jb = body.blFee ?? 0;
        const others = body.blFee ?? 0;
        const totalUsd = freight + blFee + jb + others;
        const totalAed = totalUsd * (dollarExchangeRate?.aed ?? 3.66);
        const stuffingRptItems = await prisma.stuffingreportItems.update({
            where: {
                id: Number(stuffingRptItemId),
            },
            data: {
                consigneeId: consignee,
                code: code,
                mark: mark,
                salesAgent: salesAgent,
                noOfPkgs: noOfPkgs,
                typeOfPkg: typeOfPkg,
                weight: weight,
                line: body.line ?? 0,
                handling: handling,
                type: body.type,
                cbm: cbm,
                description: description,
                freight: freight,
                blFee: blFee,
                jb: jb,
                others: others,
                totalUsd: totalUsd,
                totalAed: totalAed,
            }
        });
        if (stuffingRptItems) {
            return NextResponse.json({
                status: 200,
                message: "shipment is update successfully",
            });
        }
        return NextResponse.json({
            status: 404,
            message: "could not find shipment",
        });
    }
    catch (err) {
        console.error(err)
        return NextResponse.json({
            status: 400,
            message: "Something went wrong",
        });
    }
};

