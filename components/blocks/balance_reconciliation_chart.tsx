"use client";

import { BarChart } from "@/components/charts/BarChart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";

type MonthlyDeviation = {
  month_str: string;
  start_balance_snapshot: number;
  end_balance_snapshot: number;
  expected_end_balance: number;
  deviation: number;
  deviation_pct: number;
};

type BalanceReconciliationData = {
  monthly_deviations: MonthlyDeviation[];
  total_deviation: number;
  avg_deviation: number;
  largest_discrepancy: {
    month: string;
    deviation: number;
    deviation_pct: number;
    expected: number;
    actual: number;
  };
  months_analyzed: number;
};

export default function BalanceReconciliationChart() {
  const [data, setData] = useState<BalanceReconciliationData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/data-quality/balance-reconciliation");
        
        if (!response.ok) {
          console.error("API error - data files may not exist yet");
          setLoading(false);
          return;
        }
        
        const result = await response.json();
        
        // Validate data structure
        if (!result?.monthly_deviations || !result?.largest_discrepancy) {
          console.error("Invalid data structure - run Jupyter notebook to generate data files");
          setLoading(false);
          return;
        }
        
        setData(result);
      } catch (error) {
        console.error("Error fetching balance reconciliation data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <div className="h-6 bg-muted rounded w-48 mb-2"></div>
          <div className="h-4 bg-muted rounded w-full"></div>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] bg-muted rounded animate-pulse"></div>
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card className="border-amber-500/50 bg-amber-50 dark:bg-amber-950/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <AlertCircle className="h-6 w-6 text-amber-600 mt-1" />
            <div>
              <h3 className="font-semibold text-lg mb-2">Balance Reconciliation Data Not Available</h3>
              <p className="text-sm text-muted-foreground">
                Please run the Jupyter notebook to generate the data quality analysis files.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currencyFormatter = (value: number) =>
    `€${Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(value)}`;

  const percentFormatter = (value: number) => `${value.toFixed(2)}%`;

  const formatMonth = (month: string) => {
    const [year, monthNum] = month.split('-');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
    return monthNames[parseInt(monthNum) - 1];
  };

  const chartData = data.monthly_deviations.map(d => ({
    month: formatMonth(d.month_str),
    "Positive Deviation %": d.deviation_pct > 0 ? d.deviation_pct : 0,
    "Negative Deviation %": d.deviation_pct < 0 ? d.deviation_pct : 0,
    deviation_abs: d.deviation,
    expected: d.expected_end_balance,
    actual: d.end_balance_snapshot,
  }));

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Monthly Balance Reconciliation</CardTitle>
          <CardDescription>
            Comparison between transaction-calculated balances and daily snapshots (Jan - Aug 2025)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BarChart
            data={chartData}
            index="month"
            categories={["Positive Deviation %", "Negative Deviation %"]}
            colors={["chart-1", "chart-3"]}
            valueFormatter={percentFormatter}
            showLegend={true}
            showGridLines={true}
            yAxisLabel="Balance Deviation (%)"
            type="stacked"
            className="h-[400px]"
          />

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total Deviation</p>
              <p className="text-2xl font-bold">{currencyFormatter(data.total_deviation)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Average Deviation</p>
              <p className="text-2xl font-bold">{currencyFormatter(data.avg_deviation)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Largest Discrepancy</p>
              <p className="text-2xl font-bold">
                {formatMonth(data.largest_discrepancy.month)} ({currencyFormatter(Math.abs(data.largest_discrepancy.deviation))})
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

