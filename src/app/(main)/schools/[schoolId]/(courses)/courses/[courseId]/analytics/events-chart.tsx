"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../../../../../../convex/_generated/api";
import { Id } from "../../../../../../../../../convex/_generated/dataModel";

import * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParams } from "next/navigation";

const chartConfig = {
  events: {
    label: "Events",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function EventsChart() {
  const [timeRange, setTimeRange] = React.useState("90d");
  const [selectedKey, setSelectedKey] = React.useState("all");

  const { courseId } = useParams();
  const events = useQuery(api.events.getEvents, {
    objectId: courseId as Id<"courses">,
  });

  const eventOptions = React.useMemo(() => {
    const uniqueKeys = new Set(events?.map((event) => event.key) || []);
    return [
      { label: "All", value: "all" },
      ...Array.from(uniqueKeys).map((key) => ({ label: key, value: key })),
    ];
  }, [events]);

  const chartData = React.useMemo(() => {
    if (!events) return [];

    const now = new Date();
    const startDate = new Date(
      now.getTime() -
        (timeRange === "30d" ? 30 : timeRange === "7d" ? 7 : 90) *
          24 *
          60 *
          60 *
          1000
    );

    const filteredEvents = events.filter(
      (event) =>
        (selectedKey === "all" || event.key === selectedKey) &&
        new Date(event._creationTime) >= startDate
    );

    const eventCounts = filteredEvents.reduce(
      (acc, event) => {
        const date = new Date(event._creationTime).toISOString().split("T")[0];
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    return Object.entries(eventCounts)
      .map(([date, count]) => ({
        date,
        count,
      }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [events, timeRange, selectedKey]);

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Events</CardTitle>
          <CardDescription>
            Displaying event counts over the selected time range.
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select time range"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d">Last 3 months</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedKey} onValueChange={setSelectedKey}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select an event type"
          >
            <SelectValue placeholder="Select event type" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            {eventOptions.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className="rounded-lg"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorEvents" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={chartConfig.events.color}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={chartConfig.events.color}
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                />
              }
            />
            <Area
              type="monotone"
              dataKey="count"
              stroke={chartConfig.events.color}
              fillOpacity={1}
              fill="url(#colorEvents)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
