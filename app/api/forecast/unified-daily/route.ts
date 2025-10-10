import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

export async function GET() {
  try {
    const filePath = path.join(
      process.cwd(),
      "scripts/datasets/forecast_analysis/unified_forecast_daily.csv"
    );

    const fileContent = fs.readFileSync(filePath, "utf-8");
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
    });

    // Parse numbers
    const data = records.map((record: any) => ({
      date: record.date,
      category: record.category,
      actual: parseFloat(record.actual) || 0,
      unified_forecast: parseFloat(record.unified_forecast) || 0,
      unified_forecast_with_user: parseFloat(record.unified_forecast_with_user) || 0,
    }));

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error reading unified forecast daily:", error);
    return NextResponse.json(
      { error: "Failed to load unified forecast data" },
      { status: 500 }
    );
  }
}

