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
      "forecast_daily_reconstruction.csv"
    );
    const csvData = readFileSync(filePath, "utf-8");
    
    // Parse CSV
    const lines = csvData.split("\n");
    const headers = lines[0].split(",").map(h => h.trim());
    
    const data = lines.slice(1)
      .filter(line => line.trim())
      .map(line => {
        const values = line.split(",");
        const obj: any = {};
        headers.forEach((header, idx) => {
          const value = values[idx]?.trim() || "";
          // Parse numbers, but keep date and category as strings
          if (header === "date" || header === "category") {
            obj[header] = value;
          } else {
            obj[header] = value && !isNaN(Number(value)) ? Number(value) : 0;
          }
        });
        return obj;
      });
    
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error reading daily forecast data:", error);
    return NextResponse.json([], { status: 500 });
  }
}

