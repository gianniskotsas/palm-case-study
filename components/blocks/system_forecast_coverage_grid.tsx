"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";

type CategoryCoverage = {
  covered_days: number;
  total_days: number;
  coverage_pct: number;
  missing_days: number;
};

type SystemForecastCoverageData = {
  coverage_by_method: Record<string, Record<string, CategoryCoverage>>;
  overall_coverage: Record<string, {
    coverage_pct: number;
    covered: number;
    total: number;
  }>;
  gaps_by_category: Record<string, Record<string, number>>;
  date_range: {
    start: string;
    end: string;
    total_days: number;
  };
  categories_analyzed: number;
  methods_analyzed: number;
};

export default function SystemForecastCoverageGrid() {
  const [data, setData] = useState<SystemForecastCoverageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/data-quality/system-forecast-coverage");
        
        if (!response.ok) {
          console.error("API error - data files may not exist yet");
          setLoading(false);
          return;
        }
        
        const result = await response.json();
        
        // Validate data structure
        if (!result?.coverage_by_method || !result?.overall_coverage) {
          console.error("Invalid data structure - run Jupyter notebook to generate data files");
          setLoading(false);
          return;
        }
        
        setData(result);
      } catch (error) {
        console.error("Error fetching system forecast coverage data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Card className="animate-pulse">
        <CardHeader>
          <div className="h-6 bg-muted rounded mb-2"></div>
          <div className="h-4 bg-muted rounded w-full"></div>
        </CardHeader>
        <CardContent>
          <div className="bg-muted rounded"></div>
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
              <h3 className="font-semibold text-lg mb-2">System Forecast Coverage Data Not Available</h3>
              <p className="text-sm text-muted-foreground">
                Please run the Jupyter notebook to generate the data quality analysis files.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getCoverageColor = (percentage: number) => {
    if (percentage >= 90) return "bg-green-500/20 text-[var(--chart-1)] border-[var(--chart-1)]/30";
    if (percentage >= 75) return "bg-yellow-500/20 text-[var(--chart-2)] border-[var(--chart-2)]/30";
    if (percentage >= 50) return "bg-orange-500/20 text-[var(--chart-3)] border-[var(--chart-3)]/30";
    return "bg-red-500/20 text-[var(--chart-4)] border-[var(--chart-4)]/30";
  };

  const getCoverageLabel = (percentage: number) => {
    if (percentage >= 90) return "Excellent";
    if (percentage >= 75) return "Good";
    if (percentage >= 50) return "Fair";
    return "Poor";
  };

  const methodLabels: Record<string, string> = {
    ml_model: "ML Model",
    statistical_model: "Statistical",
    foundation_model: "Foundation",
    historical: "Historical",
    static: "Static",
  };

  const categoryLabels: Record<string, string> = {
    cash_in_resort_revenue: "Resort Revenue",
    cash_in_tax_income: "Tax Income",
    cash_in_investments_income: "Investment Income",
    cash_out_payroll: "Payroll",
    cash_out_tax_payments: "Tax Payments",
    cash_out_foreign_exchange_expenses: "FX Expenses",
    cash_out_investments_outflow: "Investment Outflow",
    cash_out_insurance_costs: "Insurance",
    cash_out_resort_maintenance_expenses: "Maintenance",
  };

  const methods = Object.keys(data.coverage_by_method);
  const categories = Object.keys(data.coverage_by_method[methods[0]] || {});

  return (
    <div className="space-y-4">
      {/* Overall Coverage Cards */}
      <div className="grid grid-cols-4 gap-2">
        {methods.map((method) => {
          const methodData = data.overall_coverage[method];
          return (
            <Card key={method}>
              <CardContent className="pt-6">
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  {methodLabels[method] || method}
                </p>
                <div className="text-2xl font-bold mb-1">
                  {methodData.coverage_pct.toFixed(1)}%
                </div>
                <p className="text-xs text-muted-foreground">
                  {methodData.covered.toLocaleString()} / {methodData.total.toLocaleString()} days
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Coverage Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Coverage by Category and Method</CardTitle>
          <CardDescription>
            Percentage of days with forecasts for each category across different methods ({data.date_range.total_days} days analyzed)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-3 border-b font-medium text-sm">Category</th>
                  {methods.map((method) => (
                    <th key={method} className="text-center p-3 border-b font-medium text-sm">
                      {methodLabels[method] || method}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category} className="hover:bg-muted/50">
                    <td className="p-3 border-b text-sm font-medium">
                      {categoryLabels[category] || category}
                    </td>
                    {methods.map((method) => {
                      const coverage = data.coverage_by_method[method][category];
                      return (
                        <td key={`${category}-${method}`} className="p-3 border-b text-center">
                          <div className="flex flex-col items-center gap-1">
                            <Badge
                              variant="outline"
                              className={`${getCoverageColor(coverage.coverage_pct)} px-2 py-1 text-xs font-semibold`}
                            >
                              {coverage.coverage_pct.toFixed(0)}%
                            </Badge>
                            <span className="text-[10px] text-muted-foreground">
                              {coverage.missing_days} missing
                            </span>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-6 mt-6 pt-6 border-t">
            <span className="text-sm font-medium">Coverage Quality:</span>
            <div className="flex items-center gap-4">
              {[
                { label: "Excellent", color: "bg-green-500/20 text-[var(--chart-1)] border-[var(--chart-1)]/30", range: "≥90%" },
                { label: "Good", color: "bg-yellow-500/20 text-[var(--chart-2)] border-[var(--chart-2)]/30", range: "75-89%" },
                { label: "Fair", color: "bg-orange-500/20 text-[var(--chart-3)] border-[var(--chart-3)]/30", range: "50-74%" },
                { label: "Poor", color: "bg-red-500/20 text-[var(--chart-4)] border-[var(--chart-4)]/30", range: "<50%" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <Badge variant="outline" className={`${item.color} px-2 py-1 text-xs`}>
                    {item.range}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

