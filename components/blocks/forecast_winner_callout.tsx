"use client";

import { Callout } from "@/components/ui/callout";
import { Trophy } from "lucide-react";

type BestMethodInfo = {
  best_method: string;
  mape: number;
  mae: number;
  bias_pct: number;
  count: number;
};

interface ForecastWinnerCalloutProps {
  data: BestMethodInfo;
}

export default function ForecastWinnerCallout({ data }: ForecastWinnerCalloutProps) {
  const formatMethodName = (method: string): string => {
    return method
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const currencyFormatter = (number: number) =>
    `€${Intl.NumberFormat("en-US").format(Math.round(number))}`;

  return (
    <Callout
      title="🏆 Best Performing Forecast Model"
      variant="success"
      icon={<Trophy className="h-5 w-5" />}
    >
      <div className="space-y-3">
        <p className="text-sm">
          <span className="font-bold text-lg">{formatMethodName(data.best_method)}</span> achieved
          the best overall forecast accuracy across all categories.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          <div className="rounded-lg bg-muted/50 p-3">
            <p className="text-xs text-muted-foreground">MAPE</p>
            <p className="text-lg font-semibold">{data.mape.toFixed(2)}%</p>
          </div>
          <div className="rounded-lg bg-muted/50 p-3">
            <p className="text-xs text-muted-foreground">MAE</p>
            <p className="text-lg font-semibold">{currencyFormatter(data.mae)}</p>
          </div>
          <div className="rounded-lg bg-muted/50 p-3">
            <p className="text-xs text-muted-foreground">Bias</p>
            <p className="text-lg font-semibold">{data.bias_pct.toFixed(1)}%</p>
          </div>
          <div className="rounded-lg bg-muted/50 p-3">
            <p className="text-xs text-muted-foreground">Forecasts</p>
            <p className="text-lg font-semibold">{data.count}</p>
          </div>
        </div>

        <p className="text-xs text-muted-foreground mt-4">
          {data.mape < 10 && "Excellent accuracy! "}
          {data.mape >= 10 && data.mape < 20 && "Good accuracy with room for improvement. "}
          {data.mape >= 20 && "Moderate accuracy - consider combining multiple methods. "}
          {Math.abs(data.bias_pct) < 5 && "Well-balanced with minimal systematic bias."}
          {Math.abs(data.bias_pct) >= 5 && Math.abs(data.bias_pct) < 15 && 
            `Slight ${data.bias_pct > 0 ? 'over' : 'under'}forecasting tendency.`}
          {Math.abs(data.bias_pct) >= 15 && 
            `Notable ${data.bias_pct > 0 ? 'over' : 'under'}forecasting bias - consider recalibration.`}
        </p>
      </div>
    </Callout>
  );
}

