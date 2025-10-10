"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Data from revenue_heatmap_v2.tsx - calculated average revenue per day of week
const data = [
  { day: "Monday", revenue: 1751.71 },
  { day: "Tuesday", revenue: 2055.45 },
  { day: "Wednesday", revenue: 1823.81 },
  { day: "Thursday", revenue: 1350.99 },
  { day: "Friday", revenue: 1654.05 },
  { day: "Saturday", revenue: 1135.62 },
  { day: "Sunday", revenue: 1679.59 },
];

const chartConfig = {
  revenue: {
    label: "Avg Revenue",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export default function DayOfWeekRevenue() {
  const currencyFormatter = (number: number) =>
    `€${Intl.NumberFormat("en-US").format(number)}`;

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `€${(value / 1000).toFixed(0)}k`}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(label) => label}
                  formatter={(value) => [currencyFormatter(Number(value)), "Avg Revenue"]}
                />
              }
            />
            <Bar
              dataKey="revenue"
              fill="var(--color-revenue)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

