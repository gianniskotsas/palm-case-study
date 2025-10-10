"use client";

import { Bar, BarChart, XAxis, YAxis, Legend, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type MonthlyForecastData = {
  month: string;
  actual: number;
  forecast_ml_model?: number;
  forecast_statistical_model?: number;
  forecast_foundation_model?: number;
  forecast_static?: number;
  forecast_user?: number;
};

interface MonthlyForecastChartProps {
  data: MonthlyForecastData[];
  category?: string;
}

export default function MonthlyForecastChart({ data, category = "Resort Revenue" }: MonthlyForecastChartProps) {
  const currencyFormatter = (value: number) =>
    `€${Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(value)}`;

  const formatMonth = (month: string) => {
    const [year, monthNum] = month.split('-');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return monthNames[parseInt(monthNum) - 1];
  };

  // Transform data for display
  const chartData = data.map(d => ({
    month: formatMonth(d.month),
    Actual: d.actual,
    "ML Model": d.forecast_ml_model || 0,
    "Statistical": d.forecast_statistical_model || 0,
    "Foundation": d.forecast_foundation_model || 0,
    "Static": d.forecast_static || 0,
    "User Predictions": d.forecast_user || 0,
  }));

  // Define colors for each series
  const colors = {
    Actual: "#6366f1", // indigo
    "ML Model": "#ef4444", // red
    "Statistical": "#10b981", // green
    "Foundation": "#8b5cf6", // purple
    "Static": "#f59e0b", // amber
    "User Predictions": "#ec4899", // pink
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Forecast Comparison: {category}</CardTitle>
        <CardDescription>
          Actual vs predicted values across different forecasting methods (January - August 2025)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <defs>
              {/* Diagonal lines pattern for ML Model */}
              <pattern id="diagonalLines" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="8" stroke={colors["ML Model"]} strokeWidth="1" />
              </pattern>
              
              {/* Reverse diagonal for Statistical */}
              <pattern id="reverseDiagonal" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(-45)">
                <line x1="0" y1="0" x2="0" y2="8" stroke={colors["Statistical"]} strokeWidth="1" />
              </pattern>
              
              {/* Crosshatch for Foundation */}
              <pattern id="crosshatch" patternUnits="userSpaceOnUse" width="8" height="8">
                <path d="M 0 0 L 8 8 M 8 0 L 0 8" stroke={colors["Foundation"]} strokeWidth="1" />
              </pattern>
              
              {/* Dots for User Predictions */}
              <pattern id="dots" patternUnits="userSpaceOnUse" width="8" height="8">
                <circle cx="4" cy="4" r="1.5" fill={colors["User Predictions"]} />
              </pattern>
              
              {/* Horizontal lines for Static */}
              <pattern id="horizontal" patternUnits="userSpaceOnUse" width="8" height="8">
                <line x1="0" y1="4" x2="8" y2="4" stroke={colors["Static"]} strokeWidth="1" />
              </pattern>
            </defs>
            
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              fontSize={12}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={currencyFormatter}
              fontSize={12}
            />
            <Tooltip
              formatter={(value: number) => currencyFormatter(value)}
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px",
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: "12px" }}
              iconType="rect"
            />
            
            <Bar dataKey="Actual" fill={colors.Actual} radius={[4, 4, 0, 0]} />
            <Bar dataKey="ML Model" fill="url(#diagonalLines)" stroke={colors["ML Model"]} strokeWidth={1} radius={[4, 4, 0, 0]} />
            <Bar dataKey="Statistical" fill="url(#reverseDiagonal)" stroke={colors["Statistical"]} strokeWidth={1} radius={[4, 4, 0, 0]} />
            {chartData.some(d => d.Foundation > 0) && (
              <Bar dataKey="Foundation" fill="url(#crosshatch)" stroke={colors["Foundation"]} strokeWidth={1} radius={[4, 4, 0, 0]} />
            )}
            {chartData.some(d => d.Static > 0) && (
              <Bar dataKey="Static" fill="url(#horizontal)" stroke={colors["Static"]} strokeWidth={1} radius={[4, 4, 0, 0]} />
            )}
            {chartData.some(d => d["User Predictions"] > 0) && (
              <Bar dataKey="User Predictions" fill="url(#dots)" stroke={colors["User Predictions"]} strokeWidth={1} radius={[4, 4, 0, 0]} />
            )}
          </BarChart>
        </ResponsiveContainer>
        
        <div className="mt-4 text-xs text-muted-foreground">
          <p>
            <strong>Note:</strong> Different patterns help distinguish forecast methods. 
            Actual values are shown as solid bars for comparison.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

