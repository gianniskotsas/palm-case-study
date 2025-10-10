"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type AccuracyMetric = {
  Category: string;
  Forecast_Method: string;
  MAE: number;
  MAPE: number;
  Bias: number;
  Bias_Pct: number;
  Count: number;
  Avg_Forecast_Age: number;
};

interface ForecastAccuracyTableProps {
  data: AccuracyMetric[];
}

export default function ForecastAccuracyTable({ data }: ForecastAccuracyTableProps) {
  const formatMethodName = (method: string): string => {
    return method
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const formatCategoryName = (category: string): string => {
    return category
      .replace(/cash_in_|cash_out_/g, '')
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const currencyFormatter = (number: number) =>
    `€${Intl.NumberFormat("en-US").format(Math.round(number))}`;

  const getMAPEColor = (mape: number): string => {
    if (mape < 10) return "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950";
    if (mape < 20) return "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950";
    if (mape < 50) return "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950";
    return "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950";
  };

  const getBiasIndicator = (bias: number): string => {
    if (Math.abs(bias) < 5) return "→"; // Neutral
    return bias > 0 ? "↑" : "↓"; // Over/Under
  };

  // Sort data by MAPE (best to worst)
  const sortedData = [...data].sort((a, b) => a.MAPE - b.MAPE);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Forecast Accuracy Comparison</CardTitle>
        <CardDescription>
          Detailed accuracy metrics by forecast method and category (sorted by MAPE - best to worst)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">MAE</TableHead>
                <TableHead className="text-right">MAPE</TableHead>
                <TableHead className="text-right">Bias</TableHead>
                <TableHead className="text-right">Bias %</TableHead>
                <TableHead className="text-right">Avg Age (days)</TableHead>
                <TableHead className="text-right">Count</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.map((row, idx) => (
                <TableRow key={idx} className={idx < 3 ? "bg-muted/30" : ""}>
                  <TableCell className="font-medium text-sm">
                    {formatCategoryName(row.Category)}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {formatMethodName(row.Forecast_Method)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm">
                    {currencyFormatter(row.MAE)}
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-semibold ${getMAPEColor(row.MAPE)}`}>
                      {row.MAPE.toFixed(2)}%
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm">
                    {currencyFormatter(row.Bias)}
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm">
                    <span className="inline-flex items-center gap-1">
                      {getBiasIndicator(row.Bias_Pct)}
                      {row.Bias_Pct.toFixed(1)}%
                    </span>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground text-sm">
                    {row.Avg_Forecast_Age != null ? row.Avg_Forecast_Age.toFixed(1) : 'N/A'}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground text-sm">
                    {row.Count}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800"></span>
            <span>Excellent (&lt;10%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800"></span>
            <span>Good (10-20%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800"></span>
            <span>Acceptable (20-50%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800"></span>
            <span>Poor (&gt;50%)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

