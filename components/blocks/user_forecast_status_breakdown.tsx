"use client";

import { DonutChart } from "@/components/charts/DonutChart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, HelpCircle, Ban, AlertCircle } from "lucide-react";
import { cx } from "@/lib/utils";
import { useEffect, useState } from "react";

type UserForecastData = {
  total_forecasts: number;
  status_breakdown: {
    counts: Record<string, number>;
    percentages: Record<string, number>;
  };
  missing_data: {
    missing_amounts: number;
    zero_amounts: number;
    total_problematic: number;
  };
  forecast_sources: Record<string, number>;
  top_categories: Record<string, number>;
  quality_score: number;
};

export default function UserForecastStatusBreakdown() {
  const [data, setData] = useState<UserForecastData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/data-quality/user-forecasts");
        
        if (!response.ok) {
          console.error("API error - data files may not exist yet");
          setLoading(false);
          return;
        }
        
        const result = await response.json();
        
        // Validate data structure
        if (!result?.status_breakdown || !result?.total_forecasts) {
          console.error("Invalid data structure - run Jupyter notebook to generate data files");
          setLoading(false);
          return;
        }
        
        setData(result);
      } catch (error) {
        console.error("Error fetching user forecast data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <Card className="animate-pulse">
          <CardHeader>
            <div className="h-6 bg-muted rounded w-48 mb-2"></div>
            <div className="h-4 bg-muted rounded w-full"></div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] bg-muted rounded"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!data) {
    return (
      <Card className="border-amber-500/50 bg-amber-50 dark:bg-amber-950/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <AlertCircle className="h-6 w-6 text-amber-600 mt-1" />
            <div>
              <h3 className="font-semibold text-lg mb-2">User Forecast Data Not Available</h3>
              <p className="text-sm text-muted-foreground">
                Please run the Jupyter notebook to generate the data quality analysis files.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const statusConfig = {
    verified: {
      color: "chart-1" as const,
      bgColor: "bg-[var(--chart-1)]",
      icon: CheckCircle2,
      label: "Verified",
      description: "Approved and used in analysis",
    },
    unverified: {
      color: "chart-2" as const,
      bgColor: "bg-[var(--chart-2)]",
      icon: HelpCircle,
      label: "Unverified",
      description: "Pending verification",
    },
    dismissed: {
      color: "chart-3" as const,
      bgColor: "bg-[var(--chart-3)]",
      icon: XCircle,
      label: "Dismissed",
      description: "Rejected by reviewers",
    },
    cancelled: {
      color: "chart-4" as const,
      bgColor: "bg-[var(--chart-4)]",
      icon: Ban,
      label: "Cancelled",
      description: "Cancelled before review",
    },
  };

  const chartData = Object.entries(data.status_breakdown.counts).map(([status, count]) => ({
    name: statusConfig[status as keyof typeof statusConfig]?.label || status,
    amount: count,
    share: data.status_breakdown.percentages[status],
    status: status,
    color: statusConfig[status as keyof typeof statusConfig]?.bgColor || "bg-gray-500",
  }));

  const valueFormatter = (number: number) => number.toLocaleString();
  
  // Extract colors in the same order as chartData
  const chartColors = chartData.map(item => 
    statusConfig[item.status as keyof typeof statusConfig]?.color || "chart-1"
  );

  return (
    <div className="space-y-4">
      <Card className="sm:mx-auto">
        <CardHeader>
          <CardTitle>Forecast Status Distribution</CardTitle>
          <CardDescription>
            Breakdown of {data.total_forecasts.toLocaleString()} user forecasts by verification status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center">
            <DonutChart
              data={chartData}
              category="name"
              value="amount"
              valueFormatter={valueFormatter}
              colors={chartColors}
              className="mt-6"
            />
          </div>
          
          <p className="mt-8 flex items-center justify-between text-sm font-medium text-muted-foreground">
            <span>Status</span>
            <span>Count / Percentage</span>
          </p>
          
          <ul className="mt-2 space-y-2">
            {chartData.map((item) => {
              const Icon = statusConfig[item.status as keyof typeof statusConfig]?.icon;
              return (
                <li key={item.status} className="flex items-center justify-between space-x-6 py-2">
                  <div className="flex items-center space-x-2.5 truncate">
                    <span
                      className={cx(item.color, "size-2.5 shrink-0 rounded-sm")}
                      aria-hidden={true}
                    />
                    <div className="flex items-center gap-2">
                      {Icon && <Icon className="h-4 w-4" />}
                      <span className="truncate font-medium">{item.name}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold tabular-nums">
                      {valueFormatter(item.amount)}
                    </span>
                    <Badge variant="secondary" className="tabular-nums">
                      {item.share.toFixed(1)}%
                    </Badge>
                  </div>
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Quality Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-1">
              {data.quality_score}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Based on verification rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Missing/Zero Values</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-3">
              {data.missing_data.total_problematic}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {data.missing_data.missing_amounts} missing, {data.missing_data.zero_amounts} zero
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Forecast Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {Object.entries(data.forecast_sources).map(([source, count]) => (
                <div key={source} className="flex justify-between text-sm">
                  <span className="text-muted-foreground capitalize">{source}:</span>
                  <span className="font-medium">{count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


