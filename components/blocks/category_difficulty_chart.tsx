"use client";

import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type CategoryDifficulty = {
  category: string;
  MAPE: number;
  forecast_method: string;
};

interface CategoryDifficultyChartProps {
  data: CategoryDifficulty[];
}

export default function CategoryDifficultyChart({ data }: CategoryDifficultyChartProps) {
  const formatCategoryName = (category: string): string => {
    return category
      .replace(/cash_in_|cash_out_/g, '')
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getMAPEColor = (mape: number): string => {
    if (mape < 10) return "#10b981"; // green
    if (mape < 20) return "#3b82f6"; // blue
    if (mape < 50) return "#f59e0b"; // amber
    return "#ef4444"; // red
  };

  const chartData = data.map(d => ({
    name: formatCategoryName(d.category),
    MAPE: d.MAPE,
    method: d.forecast_method,
    color: getMAPEColor(d.MAPE)
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Forecast Difficulty by Category</CardTitle>
        <CardDescription>
          Best achievable MAPE for each category - lower is easier to forecast
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
          >
            <XAxis type="number" label={{ value: 'MAPE (%)', position: 'insideBottom', offset: -5 }} />
            <YAxis 
              type="category" 
              dataKey="name" 
              width={110}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              formatter={(value: number, name: string, props: any) => [
                `${value.toFixed(2)}%`,
                `MAPE (${props.payload.method})`
              ]}
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px",
              }}
            />
            <Bar dataKey="MAPE" radius={[0, 4, 4, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
          <div className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded bg-green-500"></span>
            <span>Easy (&lt;10%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded bg-blue-500"></span>
            <span>Medium (10-20%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded bg-amber-500"></span>
            <span>Acceptable (20-50%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded bg-red-500"></span>
            <span>Hard (&gt;50%)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

