"use client";
import { setPageTitle } from "@/redux/reducers/pageTitleSwitching";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import FinancialReport from "@/components/dashboard/pages/financialReprt";
import { FinancialRptHeaders } from "@/app/tableHeaders/financialreport";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { DummyData } from "./dummy";
import { withRolesAccess } from "@/components/auth/accessRights";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const Page = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle("Financial report"));
  }, [dispatch]);
  const chartData = [
    { month: "January", revenue: 186, expenses: 80 },
    { month: "February", revenue: 305, expenses: 200 },
    { month: "March", revenue: 237, expenses: 120 },
    { month: "April", revenue: 73, expenses: 190 },
    { month: "May", revenue: 209, expenses: 130 },
    { month: "June", revenue: 214, expenses: 140 },
    { month: "July", revenue: 114, expenses: 140 },
    { month: "August", revenue: 314, expenses: 110 },
    { month: "Sept", revenue: 214, expenses: 140 },
    { month: "Oct", revenue: 200, expenses: 120 },
    { month: "Nov", revenue: 114, expenses: 100 },
    { month: "Dec", revenue: 119, expenses: 120 },
  ];
  const chartConfig = {
    revenue: {
      label: "revenue",
      color: "hsl(var(--chart-2))",
    },
    expenses: {
      label: "expenses",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;
  return (
    <>
      <FinancialReport headers={FinancialRptHeaders} data={DummyData} />
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Annual report</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
              <Bar dataKey="expenses" fill="var(--color-expenses)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing total revenues and expenses for the last 6 months
          </div>
        </CardFooter>
      </Card>
    </>
  );
};
export default withRolesAccess(Page, [
  "finance",
  "admin",
  "head of finance",
]) as React.FC;
