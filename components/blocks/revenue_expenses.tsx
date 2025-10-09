"use client";

import React from "react";
import { ComboChart, type TooltipProps } from "@/components/charts/ComboChart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

// Monthly Expenses by Category (Stacked Bar) + Hotel Revenue (Line)
// Based on actual France Luxury Resort transaction data from 2025
// Categories sorted by size: Maintenance (1.85%), Insurance (1.86%), Investment (4.51%), FX (9.45%), Tax (16.06%), Payroll (66.26%)
const data = [
  {
    date: "Jan 25",
    Maintenance: 1437.41,
    Insurance: 886.05,
    Investment: 3904.2599999999998,
    FX: 7832.74,
    Tax: 9771.65,
    Payroll: 32649.74,
    Revenue: 44279.36,
  },
  {
    date: "Feb 25",
    Maintenance: 1570.15,
    Insurance: 1182.29,
    Investment: 2769.5,
    FX: 4999.63,
    Tax: 10052.17,
    Payroll: 29710.32,
    Revenue: 41297.05,
  },
  {
    date: "Mar 25",
    Maintenance: 1017.61,
    Insurance: 1622.73,
    Investment: 2932.0299999999997,
    FX: 6480.44,
    Tax: 11745.89,
    Payroll: 49829.74,
    Revenue: 28979.670000000002,
  },
  {
    date: "Apr 25",
    Maintenance: 896.78,
    Insurance: 1015.38,
    Investment: 814.6,
    FX: 4742.14,
    Tax: 11405.08,
    Payroll: 52613.36,
    Revenue: 49437.74,
  },
  {
    date: "May 25",
    Maintenance: 1077.97,
    Insurance: 1043.56,
    Investment: 2282.34,
    FX: 6217.9,
    Tax: 8674.07,
    Payroll: 40464.44,
    Revenue: 47120.29,
  },
  {
    date: "Jun 25",
    Maintenance: 1257.97,
    Insurance: 1025.04,
    Investment: 2231.32,
    FX: 5982.84,
    Tax: 9607.59,
    Payroll: 41202.42,
    Revenue: 29327.260000000002,
  },
  {
    date: "Jul 25",
    Maintenance: 1170.0,
    Insurance: 953.69,
    Investment: 3490.73,
    FX: 4275.71,
    Tax: 6321.82,
    Payroll: 46288.0,
    Revenue: 27627.23,
  },
  {
    date: "Aug 25",
    Maintenance: 628.3,
    Insurance: 1330.86,
    Investment: 3610.73,
    FX: 5622.66,
    Tax: 10837.49,
    Payroll: 30728.25,
    Revenue: 33330.01,
  },
];

export default function RevenueExpenses() {
  const [datas, setDatas] = React.useState<TooltipProps | null>(null);

  const currencyFormatter = (number: number) =>
    `€${Intl.NumberFormat("en-US").format(number)}`;

  // Use ref to track tooltip data to avoid setState during render
  const tooltipDataRef = React.useRef<TooltipProps | null>(null);

  const payload = datas?.payload?.[0]?.payload;
  const currentMonth = payload?.date ?? data[data.length - 1].date;
  const revenueValue = payload?.Revenue ?? data[data.length - 1].Revenue;
  const totalExpenses = payload
    ? payload.Maintenance +
      payload.Insurance +
      payload.Investment +
      payload.FX +
      payload.Tax +
      payload.Payroll
    : data[data.length - 1].Maintenance +
      data[data.length - 1].Insurance +
      data[data.length - 1].Investment +
      data[data.length - 1].FX +
      data[data.length - 1].Tax +
      data[data.length - 1].Payroll;

  const netIncome = revenueValue - totalExpenses;
  const netMargin = (netIncome / revenueValue) * 100;

  const formattedRevenue = currencyFormatter(revenueValue);
  const formattedExpenses = currencyFormatter(totalExpenses);
  const formattedNetMargin = `${netMargin.toFixed(1)}%`;

  return (
    <Card>
      <CardContent>
        <div className="mb-2">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
            {currentMonth}
          </p>
        </div>
        <div className="flex gap-8 mb-8">
          <div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Hotel Revenue
            </p>
            <p className="mt-2 text-xl font-semibold text-gray-900 dark:text-gray-50">
              {formattedRevenue}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Total Expenses
            </p>
            <p className="mt-2 text-xl font-semibold text-gray-900 dark:text-gray-50">
              {formattedExpenses}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Net Margin
            </p>
            <p
              className={`mt-2 text-xl font-semibold ${
                netMargin >= 30
                  ? "text-green-600 dark:text-green-400"
                  : netMargin >= 20
                  ? "text-amber-600 dark:text-amber-400"
                  : "text-destructive dark:text-destructive"
              }`}
            >
              {formattedNetMargin}
            </p>
          </div>
        </div>
        <ComboChart
          data={data}
          index="date"
          enableBiaxial={false}
          barSeries={{
            colors: ["chart-6", "chart-5", "chart-4", "chart-3", "chart-1", "chart-2"],
            categories: [
              "Maintenance",
              "Insurance",
              "Investment",
              "FX",
              "Tax",
              "Payroll",
            ],
            valueFormatter: (v) => currencyFormatter(v),
            type: "stacked",
            showYAxis: true,
          }}
          lineSeries={{
            colors: ["chart-6"],
            categories: ["Revenue"],
            valueFormatter: (v) => currencyFormatter(v),
            showYAxis: false,
          }}
          tooltipCallback={(props) => {
            // Use queueMicrotask to defer state updates until after render
            if (props.active) {
              const newData = props;
              if (tooltipDataRef.current?.label !== newData.label) {
                tooltipDataRef.current = newData;
                queueMicrotask(() => {
                  setDatas(newData);
                });
              }
            } else if (tooltipDataRef.current !== null) {
              tooltipDataRef.current = null;
              queueMicrotask(() => {
                setDatas(null);
              });
            }
            return null;
          }}
        />
      </CardContent>
    </Card>
  );
}
