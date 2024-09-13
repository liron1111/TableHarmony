"use client";

import { Pie, PieChart } from "recharts";

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
import { useSchool } from "../../../../_components/providers/school-provider";
import { api } from "../../../../../../../../../convex/_generated/api";
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
      <Card className="flex flex-col">
        <CardHeader className="items-center">
          <CardTitle>Membership Distribution</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <div className="aspect-square w-full max-w-[250px]">
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
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Membership Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
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
              stroke="0"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
