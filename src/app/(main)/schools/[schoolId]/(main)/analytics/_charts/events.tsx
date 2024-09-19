"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
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
} from "@/components/ui/chart";
import { useParams } from "next/navigation";
import { api } from "../../../../../../../../convex/_generated/api";
import { useQuery } from "convex/react";
import { Id } from "../../../../../../../../convex/_generated/dataModel";
import { eachDayOfInterval, format, subDays } from "date-fns";
import { MultiSelect } from "@/components/ui/multi-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const colors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export function EventsChart() {
  const [timeRange, setTimeRange] = React.useState("30d");
  const [selectedKeys, setSelectedKeys] = React.useState<Set<string>>(
    new Set(["all"])
  );

  const { schoolId } = useParams();
  const events = useQuery(api.events.getEvents, {
    objectId: schoolId as Id<"schools">,
  });

  const eventOptions = React.useMemo(() => {
    const uniqueKeys = new Set(events?.map((event) => event.key) || []);
    return [
      { label: "All", value: "all" },
      ...Array.from(uniqueKeys).map((key) => ({ label: key, value: key })),
    ];
  }, [events]);

  const handleSelectChange = (newSelection: Set<string>) => {
    if (newSelection.has("all")) {
      // If "All" is selected, select all options
      setSelectedKeys(new Set(eventOptions.map((option) => option.value)));
    } else if (
      selectedKeys.has("all") &&
      newSelection.size < eventOptions.length - 1
    ) {
      // If "All" was previously selected and we're deselecting options
      setSelectedKeys(newSelection);
    } else {
      // Normal selection/deselection
      setSelectedKeys(newSelection);
    }
  };

  const chartConfig = React.useMemo(() => {
    const config: ChartConfig = {};
    const keysToUse =
      selectedKeys.size === eventOptions.length
        ? new Set(
            eventOptions
              .map((option) => option.value)
              .filter((key) => key !== "all")
          )
        : selectedKeys;

    Array.from(keysToUse).forEach((key, index) => {
      if (key !== "all") {
        config[key] = {
          label: key,
          color: colors[index % colors.length],
        };
      }
    });
    return config;
  }, [selectedKeys, eventOptions]);

  const chartData = React.useMemo(() => {
    if (!events) return [];

    const now = new Date();
    const daysToSubtract =
      timeRange === "30d" ? 30 : timeRange === "7d" ? 7 : 90;
    const startDate = subDays(now, daysToSubtract);

    const allDatesInRange = eachDayOfInterval({
      start: startDate,
      end: now,
    }).map((date) => format(date, "yyyy-MM-dd"));

    const eventCounts: Record<string, Record<string, number>> = {};

    events.forEach((event) => {
      const eventDate = format(new Date(event._creationTime), "yyyy-MM-dd");
      if (new Date(event._creationTime) >= startDate) {
        if (!eventCounts[eventDate]) {
          eventCounts[eventDate] = {};
        }
        eventCounts[eventDate][event.key] =
          (eventCounts[eventDate][event.key] || 0) + 1;
      }
    });

    const keysToUse =
      selectedKeys.size === eventOptions.length
        ? new Set(
            eventOptions
              .map((option) => option.value)
              .filter((key) => key !== "all")
          )
        : selectedKeys;

    return allDatesInRange.map((date) => ({
      date,
      ...Object.fromEntries(
        Array.from(keysToUse).map((key) => [key, eventCounts[date]?.[key] || 0])
      ),
    }));
  }, [events, timeRange, selectedKeys, eventOptions]);

  const xAxisTicks = React.useMemo(() => {
    if (chartData.length <= 7) {
      return chartData.map((item) => item.date);
    }
    const step = Math.floor(chartData.length / 6);
    const ticks = [
      chartData[0].date,
      ...chartData
        .slice(step, -step)
        .filter((_, index) => index % step === 0)
        .map((item) => item.date),
      chartData[chartData.length - 1].date,
    ];
    return ticks;
  }, [chartData]);

  return (
    <Card>
      <CardHeader className="flex gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-left">
          <CardTitle>Events</CardTitle>
          <CardDescription>
            Displaying event counts over the selected time range.
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
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
          <MultiSelect
            title="Select events"
            options={eventOptions}
            selectedValues={selectedKeys}
            onChange={handleSelectChange}
          />
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={chartData}>
            <defs>
              {Object.entries(chartConfig).map(([key, config]) => (
                <linearGradient
                  key={key}
                  id={`color${key}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor={config.color}
                    stopOpacity={0.4}
                  />
                  <stop offset="95%" stopColor={config.color} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              ticks={xAxisTicks}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
              interval={0}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              allowDecimals={false}
              tickFormatter={(value) => Math.floor(value).toString()}
            />
            <ChartTooltip
              cursor={false}
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <Card className="px-2 py-1 md:w-96">
                      <CardHeader className="p-2">
                        <CardTitle className="text-sm font-medium">
                          {format(new Date(label), "MMM d, yyyy")}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-2">
                        {payload.map((entry, index) => (
                          <div
                            key={`item-${index}`}
                            className="flex items-center gap-2 p-0.5 text-sm"
                          >
                            <div
                              className="size-3 rounded-md shadow-sm"
                              style={{ backgroundColor: entry.color }}
                            />
                            <span className="capitalize text-muted-foreground">
                              {entry.name}
                            </span>
                            <span className="ml-auto font-medium">
                              {entry.value}
                            </span>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  );
                }
                return null;
              }}
            />
            {Object.entries(chartConfig).map(([key, config]) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stroke={config.color}
                fill={config.color}
                fillOpacity={0.1}
              />
            ))}
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
