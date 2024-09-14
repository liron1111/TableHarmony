"use client";

import { Label, Pie, PieChart } from "recharts";

import { useSchool } from "../../../_components/providers/school-provider";
import { api } from "../../../../../../../../convex/_generated/api";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useQuery } from "convex/react";
import { Skeleton } from "@/components/ui/skeleton";

export const description = "A pie chart showing school membership distribution";

const chartConfig = {
  totalUsers: {
    label: "Total Users",
  },
  manager: {
    label: "Manager",
    color: "hsl(var(--chart-1))",
  },
  teacher: {
    label: "Teacher",
    color: "hsl(var(--chart-2))",
  },
  student: {
    label: "Student",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function MembershipDistributionChart() {
  const { school } = useSchool();

  const data = useQuery(api.schools.getSchoolMemberships, {
    schoolId: school?._id!,
  });

  if (!data) {
    return (
      <Card className="w-full md:w-[400px]">
        <CardHeader className="flex gap-2 space-y-0 border-b py-5 sm:flex-row">
          <div className="grid flex-1 gap-1 text-left">
            <CardTitle>Memberships</CardTitle>
            <CardDescription className="truncate">
              School membership distribution by role.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex items-center justify-center p-4 sm:p-10">
          <div className="aspect-square w-full max-w-[200px]">
            <Skeleton className="h-full w-full rounded-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  const members = Object.groupBy(data, (item) => item.role);
  const chartData = Object.entries(members).map(([role, users]) => ({
    role,
    totalUsers: users.length,
    fill: `var(--color-${role.toLowerCase()})`,
  }));

  return (
    <Card className="w-full md:w-[400px]">
      <CardHeader className="flex gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-left">
          <CardTitle>Memberships</CardTitle>
          <CardDescription>School distribution by roles.</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <ChartContainer
          config={chartConfig}
          className="aspect-square w-full max-w-[200px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="totalUsers"
              nameKey="role"
              innerRadius={50}
              strokeWidth={10}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {data.length}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Members
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
