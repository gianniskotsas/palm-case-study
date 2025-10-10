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
      "data_quality_user_forecasts.json"
    );

    const fileContents = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(fileContents);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error reading user forecasts data:", error);
    return NextResponse.json(
      { error: "Failed to load user forecasts data" },
      { status: 500 }
    );
  }
}

