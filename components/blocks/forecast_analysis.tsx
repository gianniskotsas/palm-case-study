"use client";

import { useEffect, useState } from "react";
import { LineChart } from "@/components/charts/LineChart";
import { BarChart } from "@/components/charts/BarChart";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Callout } from "../ui/callout";
import {
  Badge,
  Calendar,
  Lightbulb,
  PiggyBank,
  TrendingUp,
  UserPlus,
  Users,
} from "lucide-react";

type DailyData = {
  date: string;
  category: string;
  actual: number;
  forecast_ml_model: number;
  forecast_statistical_model: number;
  forecast_foundation_model: number;
  forecast_static: number;
  forecast_user: number;
};

type UnifiedData = {
  date: string;
  category: string;
  actual: number;
  unified_forecast: number;
  unified_forecast_with_user: number;
};

type MapeData = {
  categoryMape: {
    category: string;
    unified_forecast_mape_avg: number;
    unified_forecast_with_user_mape_avg: number;
  }[];
  monthlyMape: {
    month: string;
    unified_forecast: number;
    unified_forecast_with_user: number;
  }[];
};

type BalanceData = {
  date: string;
  actual_balance: number | null;
  balance_unified_forecast: number;
  balance_unified_forecast_with_user: number;
};

// Helper function to get ISO week number
function getISOWeek(date: Date): number {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  const yearStart = new Date(d.getFullYear(), 0, 1);
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

// Aggregate data to weekly
function aggregateToWeekly(data: DailyData[], category: string) {
  const filtered = data.filter((d) => d.category === category);
  const weeklyMap = new Map<number, any>();

  filtered.forEach((record) => {
    const date = new Date(record.date);
    const week = getISOWeek(date);

    if (!weeklyMap.has(week)) {
      weeklyMap.set(week, {
        week,
        actual: 0,
        forecast_ml_model: 0,
        forecast_statistical_model: 0,
        forecast_foundation_model: 0,
        forecast_static: 0,
        forecast_user: 0,
      });
    }

    const entry = weeklyMap.get(week)!;
    entry.actual += record.actual;
    entry.forecast_ml_model += record.forecast_ml_model;
    entry.forecast_statistical_model += record.forecast_statistical_model;
    entry.forecast_foundation_model += record.forecast_foundation_model;
    entry.forecast_static += record.forecast_static;
    entry.forecast_user += record.forecast_user;
  });

  return Array.from(weeklyMap.values()).sort((a, b) => a.week - b.week);
}

// Aggregate data to monthly
function aggregateToMonthly(data: UnifiedData[], category: string) {
  const filtered = data.filter((d) => d.category === category);
  const monthlyMap = new Map<string, any>();

  filtered.forEach((record) => {
    const date = new Date(record.date);
    const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}`;

    if (!monthlyMap.has(month)) {
      monthlyMap.set(month, {
        month,
        actual: 0,
        unified_forecast: 0,
        unified_forecast_with_user: 0,
      });
    }

    const entry = monthlyMap.get(month)!;
    entry.actual += record.actual;
    entry.unified_forecast += record.unified_forecast;
    entry.unified_forecast_with_user += record.unified_forecast_with_user;
  });

  return Array.from(monthlyMap.values()).sort((a, b) =>
    a.month.localeCompare(b.month)
  );
}

// Format month for display
function formatMonth(monthStr: string): string {
  const [year, month] = monthStr.split("-");
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

// Format category name
function formatCategoryName(category: string): string {
  return category
    .replace("cash_in_", "")
    .replace("cash_out_", "")
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function ForecastAnalysis() {
  const [dailyData, setDailyData] = useState<DailyData[]>([]);
  const [unifiedData, setUnifiedData] = useState<UnifiedData[]>([]);
  const [mapeData, setMapeData] = useState<MapeData | null>(null);
  const [balanceData, setBalanceData] = useState<BalanceData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dailyRes, unifiedRes, mapeRes, balanceRes] = await Promise.all([
          fetch("/api/forecast/daily-reconstruction"),
          fetch("/api/forecast/unified-daily"),
          fetch("/api/forecast/mape-metrics"),
          fetch("/api/forecast/balance-reconstruction"),
        ]);

        const [daily, unified, mape, balance] = await Promise.all([
          dailyRes.json(),
          unifiedRes.json(),
          mapeRes.json(),
          balanceRes.json(),
        ]);

        setDailyData(daily);
        setUnifiedData(unified);
        setMapeData(mape);
        setBalanceData(balance);
      } catch (error) {
        console.error("Error fetching forecast data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center p-12">
        <p className="text-muted-foreground">Loading forecast analysis...</p>
      </div>
    );
  }

  // Prepare data for charts
  const revenueWeekly = aggregateToWeekly(dailyData, "cash_in_resort_revenue");
  const payrollWeekly = aggregateToWeekly(dailyData, "cash_out_payroll");
  const revenueMonthly = aggregateToMonthly(
    unifiedData,
    "cash_in_resort_revenue"
  );
  const payrollMonthly = aggregateToMonthly(unifiedData, "cash_out_payroll");

  // Revenue Weekly Chart Data
  const revenueWeeklyChartData = revenueWeekly.map((d) => ({
    name: `Week ${d.week}`,
    Actual: d.actual,
    "ML Model": d.forecast_ml_model || null,
    Statistical: d.forecast_statistical_model || null,
    Foundation: d.forecast_foundation_model || null,
    Static: d.forecast_static || null,
    User: d.forecast_user || null,
  }));

  // Payroll Weekly Chart Data
  const payrollWeeklyChartData = payrollWeekly.map((d) => ({
    name: `Week ${d.week}`,
    Actual: d.actual,
    "ML Model": d.forecast_ml_model || null,
    Statistical: d.forecast_statistical_model || null,
    Foundation: d.forecast_foundation_model || null,
    Static: d.forecast_static || null,
    User: d.forecast_user || null,
  }));

  // Revenue Monthly Chart Data
  const revenueMonthlyChartData = revenueMonthly.map((d) => ({
    name: formatMonth(d.month),
    Actual: d.actual,
    "Unified Forecast": d.unified_forecast,
    "Unified + User": d.unified_forecast_with_user,
  }));

  // Payroll Monthly Chart Data
  const payrollMonthlyChartData = payrollMonthly.map((d) => ({
    name: formatMonth(d.month),
    Actual: d.actual,
    "Unified Forecast": d.unified_forecast,
    "Unified + User": d.unified_forecast_with_user,
  }));

  // Separate MAPE data into expenses and revenue
  const expenseCategories =
    mapeData?.categoryMape.filter((d) => d.category.startsWith("cash_out_")) ||
    [];
  const revenueCategories =
    mapeData?.categoryMape.filter((d) => d.category.startsWith("cash_in_")) ||
    [];

  // MAPE Bar Chart Data
  const mapeBarChartData =
    mapeData?.monthlyMape.map((d) => ({
      name: formatMonth(d.month),
      "Unified Forecast": d.unified_forecast,
      "Unified + User": d.unified_forecast_with_user,
    })) || [];

  // Balance Chart Data
  const balanceChartData = balanceData.map((d) => ({
    name: new Date(d.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    "Actual Balance": d.actual_balance,
    "Unified Forecast": d.balance_unified_forecast,
    "Unified + User": d.balance_unified_forecast_with_user,
  }));

  return (
    <div className="w-full flex flex-col gap-12">
      {/* Chart 1: Revenue - All Models (Weekly) */}
      <div className="w-full flex flex-col gap-2">
        <h3 className="text-xl lg:text-2xl">
          Resort Revenue: Actual vs All Forecast Models (Weekly)
        </h3>
        <p className="text-md text-muted-foreground mb-4">
          Weekly aggregated comparison of actual resort revenue against all
          forecasting models including ML, Statistical, Foundation, Static, and
          User forecasts.
        </p>
        <Card className="w-full">
          <CardContent className="flex flex-col h-full pt-6">
            <LineChart
              data={revenueWeeklyChartData}
              index="name"
              categories={[
                "Actual",
                "ML Model",
                "Statistical",
                "Foundation",
                "Static",
                "User",
              ]}
              colors={[
                "chart-2",
                "chart-1",
                "chart-3",
                "chart-4",
                "chart-5",
                "chart-6",
              ]}
              valueFormatter={(value) => `€${value.toLocaleString()}`}
              yAxisWidth={80}
              connectNulls={false}
              lineStyles={{
                Actual: "solid",
                "ML Model": "dashed",
                Statistical: "dashed",
                Foundation: "dashed",
                Static: "dashed",
                User: "dashed",
              }}
            />
          </CardContent>
        </Card>
      </div>

      {/* Chart 2: Payroll - All Models (Weekly) */}
      <div className="w-full flex flex-col gap-2">
        <h3 className="text-xl lg:text-2xl">
          Payroll Expenses: Actual vs All Forecast Models (Weekly)
        </h3>
        <p className="text-md text-muted-foreground mb-4">
          Weekly aggregated comparison of actual payroll expenses against all
          forecasting models including ML, Statistical, Foundation, Static, and
          User forecasts.
        </p>
        <Card className="w-full">
          <CardContent className="flex flex-col h-full pt-6">
            <LineChart
              data={payrollWeeklyChartData}
              index="name"
              categories={[
                "Actual",
                "ML Model",
                "Statistical",
                "Foundation",
                "Static",
                "User",
              ]}
              colors={[
                "chart-2",
                "chart-1",
                "chart-3",
                "chart-4",
                "chart-5",
                "chart-6",
              ]}
              valueFormatter={(value) => `€${value.toLocaleString()}`}
              yAxisWidth={80}
              connectNulls={false}
              lineStyles={{
                Actual: "solid",
                "ML Model": "dashed",
                Statistical: "dashed",
                Foundation: "dashed",
                Static: "dashed",
                User: "dashed",
              }}
            />
          </CardContent>
        </Card>
      </div>

      {/* Chart 3: Revenue - Monthly Unified */}
      <div className="w-full flex flex-col gap-2 mt-8">
        <div className="w-full flex flex-col gap-2 mb-8">
          <h3 className="text-2xl lg:text-3xl">
            Unified Forecast Reconstruction
          </h3>
          <p className="text-md text-muted-foreground mb-4">
            Since there are missing values in the data, we need to reconstruct
            the unified forecast. This is done by prioritizing the best forecast
            model based on the following order: ML Model, Statistical Model,
            Foundation Model, Static Model. This means that if the ML Model is
            not available, we use the Statistical Model, and so on. The reason
            why we picked this order is because the ML Model seems to be the
            most accurate model, and the Statistical Model is the second most
            accurate model. The Foundation model although performing well, still
            has some issues with missing values (only 34.5% coverage) and not as
            accurate as the two aforementioned models. Finally, the Static Model
            although it does not perform well in terms of accuracy, it is the
            only model that can be used to reconstruct the unified forecast
            because it can fill in the missing values.
          </p>

          <Callout title="Unified Forecast" variant="default">
            <p className="text-md text-muted-foreground mb-4">
              The unified forecast is reconstructed using the best forecast
              model based on the following order: ML Model, Statistical Model,
              Foundation Model, Static Model.
            </p>
          </Callout>

          <Callout
            title="Unified Forecast with User Overrides"
            variant="default"
          >
            <p className="text-md text-muted-foreground mb-4">
              The unified forecast with user overrides all system forecasts with
              the user forecasts when the status is verified or unverified.
            </p>
          </Callout>
        </div>
        <h3 className="text-xl lg:text-2xl">
          Resort Revenue: Unified Forecast Comparison (Monthly)
        </h3>
        <p className="text-md text-muted-foreground mb-4">
          Monthly comparison of actual revenue vs unified forecast (best system
          forecast) and unified forecast with user overrides.
        </p>
        <Card className="w-full">
          <CardContent className="flex flex-col h-full pt-6">
            <LineChart
              data={revenueMonthlyChartData}
              index="name"
              categories={["Actual", "Unified Forecast", "Unified + User"]}
              colors={["chart-2", "chart-1", "chart-3"]}
              valueFormatter={(value) => `€${value.toLocaleString()}`}
              yAxisWidth={80}
              lineStyles={{
                Actual: "solid",
                "Unified Forecast": "dashed",
                "Unified + User": "dashed",
              }}
            />
          </CardContent>
        </Card>
      </div>

      {/* Chart 4: Payroll - Monthly Unified */}
      <div className="w-full flex flex-col gap-2">
        <h3 className="text-xl lg:text-2xl">
          Payroll Expenses: Unified Forecast Comparison (Monthly)
        </h3>
        <p className="text-md text-muted-foreground mb-4">
          Monthly comparison of actual payroll vs unified forecast (best system
          forecast) and unified forecast with user overrides.
        </p>
        <Card className="w-full">
          <CardContent className="flex flex-col h-full pt-6">
            <LineChart
              data={payrollMonthlyChartData}
              index="name"
              categories={["Actual", "Unified Forecast", "Unified + User"]}
              colors={["chart-2", "chart-1", "chart-3"]}
              valueFormatter={(value) => `€${value.toLocaleString()}`}
              yAxisWidth={80}
              lineStyles={{
                Actual: "solid",
                "Unified Forecast": "dashed",
                "Unified + User": "dashed",
              }}
            />
          </CardContent>
        </Card>
      </div>

      {/* Chart 5: MAPE Bar Chart */}
      <div className="w-full flex flex-col gap-2 mt-8">
        <h3 className="text-xl lg:text-2xl">Monthly MAPE Comparison</h3>
        <p className="text-md text-muted-foreground mb-4">
          Mean Absolute Percentage Error (MAPE) by month, comparing
          system-generated unified forecasts with user-override forecasts. Lower
          values indicate better accuracy.
        </p>
        <Card className="w-full">
          <CardContent className="flex flex-col h-full pt-6">
            <BarChart
              data={mapeBarChartData}
              index="name"
              categories={["Unified Forecast", "Unified + User"]}
              colors={["chart-1", "chart-3"]}
              valueFormatter={(value) => `${value.toFixed(2)}%`}
              yAxisWidth={60}
            />
          </CardContent>
        </Card>
      </div>

      {/* MAPE Tables */}
      <div className="w-full flex flex-col gap-6">
        <div className="w-full flex flex-col gap-2">
          <h3 className="text-xl lg:text-2xl">Forecast Accuracy by Category</h3>
          <p className="text-md text-muted-foreground mb-4">
            Average MAPE per category across all months. Categories are sorted
            by unified forecast accuracy (best to worst).
          </p>
        </div>

        {/* Revenue Categories Table */}
        <div className="w-full flex flex-col gap-2">
          <h4 className="text-lg font-semibold">Revenue Categories</h4>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">Category</TableHead>
                  <TableHead className="text-right font-semibold">
                    Unified Forecast MAPE
                  </TableHead>
                  <TableHead className="text-right font-semibold">
                    Unified + User MAPE
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {revenueCategories.map((row) => (
                  <TableRow key={row.category}>
                    <TableCell className="font-medium">
                      {formatCategoryName(row.category)}
                    </TableCell>
                    <TableCell className="text-right">
                      {row.unified_forecast_mape_avg.toFixed(2)}%
                    </TableCell>
                    <TableCell className="text-right">
                      {row.unified_forecast_with_user_mape_avg.toFixed(2)}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Expense Categories Table */}
        <div className="w-full flex flex-col gap-2">
          <h4 className="text-lg font-semibold">Expense Categories</h4>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">Category</TableHead>
                  <TableHead className="text-right font-semibold">
                    Unified Forecast MAPE
                  </TableHead>
                  <TableHead className="text-right font-semibold">
                    Unified + User MAPE
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenseCategories.map((row) => (
                  <TableRow key={row.category}>
                    <TableCell className="font-medium">
                      {formatCategoryName(row.category)}
                    </TableCell>
                    <TableCell className="text-right">
                      {row.unified_forecast_mape_avg.toFixed(2)}%
                    </TableCell>
                    <TableCell className="text-right">
                      {row.unified_forecast_with_user_mape_avg.toFixed(2)}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Chart 6: Balance Reconstruction */}
      <div className="w-full flex flex-col gap-2 mt-8">
        <h3 className="text-xl lg:text-2xl">Bank Balance Reconstruction</h3>
        <p className="text-md text-muted-foreground mb-4">
          Comparison of actual bank balance with reconstructed balances based on
          forecasted cash flows. Shows how well forecasts predict overall cash
          position.
        </p>
        <Card className="w-full">
          <CardContent className="flex flex-col h-full pt-6">
            <LineChart
              data={balanceChartData}
              index="name"
              categories={[
                "Actual Balance",
                "Unified Forecast",
                "Unified + User",
              ]}
              colors={["chart-2", "chart-1", "chart-3"]}
              valueFormatter={(value) => `€${value.toLocaleString()}`}
              yAxisWidth={80}
              lineStyles={{
                "Actual Balance": "solid",
                "Unified Forecast": "dashed",
                "Unified + User": "dashed",
              }}
            />
          </CardContent>
        </Card>
      </div>

      {/* Insights Overview */}
      <div className="w-full flex flex-col gap-2 mt-12">
        <h3 className="text-xl lg:text-2xl">Key Insights</h3>
        <div className="flex flex-col gap-4">
          <Callout
            title="User Forecast Scarcity"
            icon={Users}
            variant="default"
          >
            User-generated forecasts are extremely scarce, appearing in only ~3%
            of records, with approximately 50% being either dismissed or
            cancelled.
          </Callout>
          <Callout
            title="Forecast Upward Bias"
            icon={TrendingUp}
            variant="default"
          >
            Forecasting models start strong but show an upward bias in revenue
            predictions during late spring and summer months (May-August) that
            doesn't match actual performance.
          </Callout>
          <Callout
            title="Marginal Benefit from User Input"
            icon={UserPlus}
            variant="default"
          >
            System + user forecast combinations (Unified + User) show marginal
            improvements over pure system forecasts but still lack sufficient
            accuracy for reliable planning.
          </Callout>
          <Callout
            title="Significant Summer MAPE Increase"
            icon={Calendar}
            variant="default"
          >
            MAPE increases significantly in summer months (June: 162%, July:
            131%, August: 142%) compared to winter/spring periods.
          </Callout>
          <Callout
            title="Investment Income Hard to Predict"
            icon={PiggyBank}
            variant="default"
          >
            Investment income proves nearly impossible to forecast accurately
            with MAPE ranging from 200&#8211;600% across all months.
          </Callout>
        </div>
      </div>
    </div>
  );
}
