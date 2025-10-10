"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle, TrendingUp, Users } from "lucide-react";

type UserPatterns = {
  total_forecasts: number;
  approval_rate: number;
  dismissal_rate: number;
  avg_amount: number;
  vs_system_multiplier: number;
  top_categories: Record<string, any>;
};

interface UserForecastStatsCardsProps {
  data: UserPatterns;
}

export default function UserForecastStatsCards({ data }: UserForecastStatsCardsProps) {
  const currencyFormatter = (number: number) =>
    `€${Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(number)}`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Forecasts */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Forecasts</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.total_forecasts.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Manual predictions by finance team
          </p>
        </CardContent>
      </Card>

      {/* Approval Rate */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Approval Rate</CardTitle>
          <CheckCircle2 className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.approval_rate.toFixed(1)}%</div>
          <p className="text-xs text-muted-foreground mt-1">
            Verified and used in analysis
          </p>
        </CardContent>
      </Card>

      {/* Dismissal Rate */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Dismissal Rate</CardTitle>
          <XCircle className="h-4 w-4 text-amber-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.dismissal_rate.toFixed(1)}%</div>
          <p className="text-xs text-muted-foreground mt-1">
            Dismissed or cancelled before use
          </p>
        </CardContent>
      </Card>

      {/* Average Amount */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Amount</CardTitle>
          <TrendingUp className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{currencyFormatter(data.avg_amount)}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {data.vs_system_multiplier.toFixed(1)}x larger than system forecasts
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

