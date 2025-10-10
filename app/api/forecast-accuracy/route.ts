import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

export async function GET() {
  try {
    const filePath = join(
      process.cwd(),
      "scripts",
      "datasets",
      "forecast_analysis",
      "forecast_accuracy_metrics.json"
    );
    const data = JSON.parse(readFileSync(filePath, "utf-8"));
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error reading forecast accuracy data:", error);
    return NextResponse.json([], { status: 500 });
  }
}

