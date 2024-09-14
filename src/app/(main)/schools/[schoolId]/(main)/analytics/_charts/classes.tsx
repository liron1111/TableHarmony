"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { api } from "../../../../../../../../convex/_generated/api";
import { useQuery } from "convex/react";
import { Id } from "../../../../../../../../convex/_generated/dataModel";

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
import { useParams } from "next/navigation";
import { DAYS_OF_WEEK } from "@/config/contants";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

const chartConfig = {
  count: {
    label: "count",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function ClassesChart() {
  const { schoolId } = useParams();

  const classes = useQuery(api.classes.getSchoolClasses, {
    schoolId: schoolId as Id<"schools">,
  });

  if (!classes) {
    return (
      <Card className="w-full md:w-[400px]">
        <CardHeader className="mb-2 flex gap-2 space-y-0 border-b py-5 sm:flex-row">
          <div className="grid flex-1 gap-1 text-left">
            <CardTitle>Classes</CardTitle>
            <CardDescription>
              These are the classes throught the week.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="h-[250px]">
          <div className="flex h-full items-end justify-between gap-2">
            {[...Array(7)].map((_, index) => (
              <Skeleton
                key={index}
                className="w-[10%] rounded-t"
                style={{ height: `${Math.random() * 70 + 20}%` }}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const chartData = DAYS_OF_WEEK.map((day) => {
    const count = classes.filter((c) => c.day === day).length;
    return { day, count };
  });

  return (
    <Card className="w-full md:w-[400px]">
      <CardHeader className="mb-2 flex gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-left">
          <CardTitle>Classes</CardTitle>
          <CardDescription>
            These are the classes throught the week.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="h-full">
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" fill="var(--color-count)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
