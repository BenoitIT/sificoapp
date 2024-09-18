'use client'

import {
    Card
} from "@/components/ui/card";
import React from "react";


interface DashboardCardWrapperProps {
    header: string
    amount: string
    perMonth: string
    icon: React.ReactNode
}
export const DashboardCardWrapper = ({
    header,
    amount,
    perMonth,
    icon
}: DashboardCardWrapperProps) => {
    return (
        <Card className="shadow-md text-sm border border-gray-300 flex p-4 flex-col text-gray-700">
            <div className="flex justify-between">
                <p className="">
                    {header}
                </p>
                {icon}
            </div>
            <p className="font-extrabold text-lg mt-4">
                {amount}
            </p>
            <p className=" text-gray-700 text-sm">
                {perMonth}
            </p>
        </Card>
    )
}
