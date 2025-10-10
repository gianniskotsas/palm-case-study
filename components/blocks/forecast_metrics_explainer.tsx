"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ForecastMetricsExplainer() {
  const metrics = [
    {
      name: "MAE",
      fullName: "Mean Absolute Error",
      description: "Average absolute difference between forecasted and actual values",
      interpretation: "Lower is better. Measured in the same units as your data (EUR).",
      example: "MAE of €100,000 means forecasts are off by €100k on average",
      color: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
    },
    {
      name: "MAPE",
      fullName: "Mean Absolute Percentage Error",
      description: "Average percentage difference between forecasted and actual values",
      interpretation: "Lower is better. Shows accuracy as a percentage. < 10% = Excellent, 10-20% = Good, 20-50% = Acceptable, > 50% = Poor",
      example: "MAPE of 15% means forecasts are off by 15% on average",
      color: "bg-green-500/10 text-green-700 dark:text-green-400",
    },
    {
      name: "Bias",
      fullName: "Forecast Bias",
      description: "Average directional error - whether forecasts tend to over or underestimate",
      interpretation: "Positive = Overforecast (predicting too high), Negative = Underforecast (predicting too low), Zero = Perfect balance",
      example: "Bias of +€50k means forecasts are €50k too high on average",
      color: "bg-purple-500/10 text-purple-700 dark:text-purple-400",
    },
    {
      name: "Bias %",
      fullName: "Bias Percentage",
      description: "Forecast bias expressed as a percentage of actual values",
      interpretation: "Shows directional error as %. Positive = Overforecasting, Negative = Underforecasting",
      example: "Bias of +10% means forecasts are 10% too high",
      color: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Understanding Forecast Accuracy Metrics</CardTitle>
        <CardDescription>
          Key metrics used to evaluate forecast quality and performance
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {metrics.map((metric) => (
          <div key={metric.name} className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge className={metric.color} variant="outline">
                {metric.name}
              </Badge>
              <span className="text-sm font-medium text-muted-foreground">
                {metric.fullName}
              </span>
            </div>
            <p className="text-sm text-foreground">{metric.description}</p>
            <div className="pl-4 border-l-2 border-border">
              <p className="text-xs text-muted-foreground">
                <span className="font-semibold">Interpretation:</span> {metric.interpretation}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="font-semibold">Example:</span> {metric.example}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

