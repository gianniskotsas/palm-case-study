"use client";

import { SparkAreaChart } from "@/components/charts/SparkChart";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type CategoryData = {
  avg: number;
  share: number;
  data: number[];
};

type CashFlowDriversData = {
  expenses: Record<string, CategoryData>;
  revenue: Record<string, CategoryData>;
};

interface CashFlowDriversProps {
  data: CashFlowDriversData;
}

export default function CashFlowDrivers({ data }: CashFlowDriversProps) {
  const currencyFormatter = (number: number) =>
    `€${Intl.NumberFormat("en-US").format(number)}`;

  return (
    <>
      {/* Expenses Grid */}
      <div className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(data.expenses).map(([category, categoryData]) => (
            <Card key={category}>
              <CardContent className="p-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-muted-foreground">
                      {category}
                    </p>
                    <Badge variant="outline" className="text-xs">
                      Average
                    </Badge>
                  </div>
                  <p className="text-2xl font-semibold">
                    {currencyFormatter(categoryData.avg)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {categoryData.share}% of expenses
                  </p>
                </div>
                <div className="mt-4">
                  <SparkAreaChart
                    data={categoryData.data.map((value, index) => ({
                      month: index,
                      value: value,
                    }))}
                    categories={["value"]}
                    index="month"
                    colors={["chart-3"]}
                    className="h-12 w-full"
                    fill="gradient"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Revenue Grid */}
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(data.revenue).map(([category, categoryData]) => (
            <Card key={category}>
              <CardContent className="p-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-muted-foreground">
                      {category}
                    </p>
                    <Badge variant="outline" className="text-xs">
                      Average
                    </Badge>
                  </div>
                  <p className="text-2xl font-semibold">
                    {currencyFormatter(categoryData.avg)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {categoryData.share}% of revenue
                  </p>
                </div>
                <div className="mt-4">
                  <SparkAreaChart
                    data={categoryData.data.map((value, index) => ({
                      month: index,
                      value: value,
                    }))}
                    categories={["value"]}
                    index="month"
                    colors={["chart-1"]}
                    className="h-12 w-full"
                    fill="gradient"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}

