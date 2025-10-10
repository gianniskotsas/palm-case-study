import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

export async function GET() {
  try {
    const filePath = path.join(
      process.cwd(),
      "scripts/datasets/forecast_analysis/forecast_daily_reconstruction.csv"
    );

    const fileContent = fs.readFileSync(filePath, "utf-8");
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
    });

    // Convert forecast values from cents to EUR and parse numbers
    const data = records.map((record: any) => ({
      date: record.date,
      category: record.category,
      actual: parseFloat(record.actual) || 0,
      forecast_ml_model: (parseFloat(record.forecast_ml_model) || 0) / 100,
      forecast_statistical_model: (parseFloat(record.forecast_statistical_model) || 0) / 100,
      forecast_foundation_model: (parseFloat(record.forecast_foundation_model) || 0) / 100,
      forecast_static: (parseFloat(record.forecast_static) || 0) / 100,
      forecast_user: (parseFloat(record.forecast_user) || 0) / 100,
    }));

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error reading forecast daily reconstruction:", error);
    return NextResponse.json(
      { error: "Failed to load forecast data" },
      { status: 500 }
    );
  }
}

