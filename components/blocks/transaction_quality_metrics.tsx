"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, AlertTriangle, Calendar, TrendingUp, PieChart } from "lucide-react";
import { useEffect, useState } from "react";

type TransactionQualityData = {
  total_transactions: number;
  date_range: {
    min_date: string;
    max_date: string;
    days_span: number;
  };
  transactions_by_category: Record<string, number>;
  credit_debit_distribution: Record<string, number>;
  data_quality_flags: {
    potential_duplicates: number;
    missing_dates: number;
    missing_amounts: number;
    missing_categories: number;
    total_issues: number;
  };
  quality_score: number;
};

export default function TransactionQualityMetrics() {
  const [data, setData] = useState<TransactionQualityData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/data-quality/transactions");
        
        if (!response.ok) {
          console.error("API error - data files may not exist yet");
          setLoading(false);
          return;
        }
        
        const result = await response.json();
        
        // Validate data structure
        if (!result?.date_range || !result?.data_quality_flags) {
          console.error("Invalid data structure - run Jupyter notebook to generate data files");
          setLoading(false);
          return;
        }
        
        setData(result);
      } catch (error) {
        console.error("Error fetching transaction quality data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 bg-muted rounded w-24"></div>
              <div className="h-4 w-4 bg-muted rounded"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-muted rounded w-20 mb-2"></div>
              <div className="h-3 bg-muted rounded w-full"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!data) {
    return (
      <Card className="border-amber-500/50 bg-amber-50 dark:bg-amber-950/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <AlertTriangle className="h-6 w-6 text-amber-600 mt-1" />
            <div>
              <h3 className="font-semibold text-lg mb-2">Transaction Data Not Available</h3>
              <p className="text-sm text-muted-foreground">
                Please run the Jupyter notebook to generate the data quality analysis files.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getQualityColor = (score: number) => {
    if (score >= 95) return "text-green-600";
    if (score >= 85) return "text-yellow-600";
    return "text-red-600";
  };

  const getIssueColor = (count: number) => {
    if (count === 0) return "text-green-600";
    if (count <= 10) return "text-yellow-600";
    return "text-red-600";
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

  const topCategories = Object.entries(data.transactions_by_category)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <div className="space-y-4">
      {/* Top KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Transactions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.total_transactions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Across {data.date_range.days_span} days
            </p>
          </CardContent>
        </Card>

        {/* Data Quality Score */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quality Score</CardTitle>
            <TrendingUp className={`h-4 w-4 ${getQualityColor(data.quality_score)}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getQualityColor(data.quality_score)}`}>
              {data.quality_score}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Data completeness and accuracy
            </p>
          </CardContent>
        </Card>

        {/* Potential Duplicates */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Potential Duplicates</CardTitle>
            <AlertTriangle className={`h-4 w-4 ${getIssueColor(data.data_quality_flags.potential_duplicates)}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getIssueColor(data.data_quality_flags.potential_duplicates)}`}>
              {data.data_quality_flags.potential_duplicates}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Same date, amount, and reference
            </p>
          </CardContent>
        </Card>

        {/* Total Issues */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Data Issues</CardTitle>
            <AlertTriangle className={`h-4 w-4 ${getIssueColor(data.data_quality_flags.total_issues)}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getIssueColor(data.data_quality_flags.total_issues)}`}>
              {data.data_quality_flags.total_issues}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Missing data + duplicates
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Date Range Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Date Coverage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Start Date</p>
                <p className="text-lg font-semibold">{data.date_range.min_date}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">End Date</p>
                <p className="text-lg font-semibold">{data.date_range.max_date}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Days Analyzed</p>
                <p className="text-lg font-semibold">{data.date_range.days_span} days</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Missing Data Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Data Quality Flags
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Potential Duplicates</span>
                <span className="font-semibold">{data.data_quality_flags.potential_duplicates}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Missing Dates</span>
                <span className="font-semibold">{data.data_quality_flags.missing_dates}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Missing Amounts</span>
                <span className="font-semibold">{data.data_quality_flags.missing_amounts}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Missing Categories</span>
                <span className="font-semibold">{data.data_quality_flags.missing_categories}</span>
              </div>
              <div className="pt-2 border-t flex justify-between items-center">
                <span className="text-sm font-medium">Total Issues</span>
                <span className="font-bold text-lg">{data.data_quality_flags.total_issues}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Distribution and Credit/Debit */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Top Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <PieChart className="h-4 w-4" />
              Top Transaction Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {topCategories.map(([category, count]) => (
                <div key={category} className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {categoryLabels[category] || category}
                  </span>
                  <span className="font-semibold">{count.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Credit/Debit Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Transaction Types
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(data.credit_debit_distribution).map(([type, count]) => {
                const percentage = (count / data.total_transactions * 100).toFixed(1);
                return (
                  <div key={type} className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      {type === "CRDT" ? "Credits (Inflow)" : "Debits (Outflow)"}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{count.toLocaleString()}</span>
                      <span className="text-xs text-muted-foreground">({percentage}%)</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

