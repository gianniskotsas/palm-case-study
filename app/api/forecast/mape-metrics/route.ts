import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

export async function GET() {
  try {
    const filePath = path.join(
      process.cwd(),
      "scripts/datasets/forecast_analysis/mape_metrics.csv"
    );

    const fileContent = fs.readFileSync(filePath, "utf-8");
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
    });

    // Group by category and forecast_type, calculate average MAPE
    const categoryMap = new Map<string, { unified_sum: number; unified_count: number; user_sum: number; user_count: number }>();

    records.forEach((record: any) => {
      const category = record.category;
      const forecastType = record.forecast_type;
      const mape = parseFloat(record.mape) || 0;

      if (!categoryMap.has(category)) {
        categoryMap.set(category, { unified_sum: 0, unified_count: 0, user_sum: 0, user_count: 0 });
      }

      const entry = categoryMap.get(category)!;
      if (forecastType === 'unified_forecast') {
        entry.unified_sum += mape;
        entry.unified_count += 1;
      } else if (forecastType === 'unified_forecast_with_user') {
        entry.user_sum += mape;
        entry.user_count += 1;
      }
    });

    // Calculate averages and format response
    const categoryMapeData = Array.from(categoryMap.entries()).map(([category, data]) => ({
      category,
      unified_forecast_mape_avg: data.unified_count > 0 ? data.unified_sum / data.unified_count : 0,
      unified_forecast_with_user_mape_avg: data.user_count > 0 ? data.user_sum / data.user_count : 0,
    }));

    // Sort by unified_forecast_mape_avg (best to worst)
    categoryMapeData.sort((a, b) => a.unified_forecast_mape_avg - b.unified_forecast_mape_avg);

    // Also calculate monthly total MAPE for the bar chart
    const monthlyMap = new Map<string, { unified_sum: number; unified_count: number; user_sum: number; user_count: number }>();

    records.forEach((record: any) => {
      const month = record.month;
      const forecastType = record.forecast_type;
      const totalMape = parseFloat(record.total_mape) || 0;

      if (!monthlyMap.has(month)) {
        monthlyMap.set(month, { unified_sum: 0, unified_count: 0, user_sum: 0, user_count: 0 });
      }

      const entry = monthlyMap.get(month)!;
      if (forecastType === 'unified_forecast' && entry.unified_count === 0) {
        entry.unified_sum = totalMape;
        entry.unified_count = 1;
      } else if (forecastType === 'unified_forecast_with_user' && entry.user_count === 0) {
        entry.user_sum = totalMape;
        entry.user_count = 1;
      }
    });

    const monthlyMapeData = Array.from(monthlyMap.entries()).map(([month, data]) => ({
      month,
      unified_forecast: data.unified_sum,
      unified_forecast_with_user: data.user_sum,
    }));

    // Sort by month
    monthlyMapeData.sort((a, b) => a.month.localeCompare(b.month));

    return NextResponse.json({
      categoryMape: categoryMapeData,
      monthlyMape: monthlyMapeData,
    });
  } catch (error) {
    console.error("Error reading MAPE metrics:", error);
    return NextResponse.json(
      { error: "Failed to load MAPE metrics" },
      { status: 500 }
    );
  }
}

