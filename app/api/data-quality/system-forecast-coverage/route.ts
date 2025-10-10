import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export async function GET() {
  try {
    const filePath = path.join(
      process.cwd(),
      "scripts",
      "datasets",
      "data_quality",
      "data_quality_system_forecast_gaps.json"
    );

    const fileContents = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(fileContents);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error reading system forecast coverage data:", error);
    return NextResponse.json(
      { error: "Failed to load system forecast coverage data" },
      { status: 500 }
    );
  }
}

