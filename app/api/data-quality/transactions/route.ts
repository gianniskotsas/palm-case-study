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
      "data_quality_transactions.json"
    );

    const fileContents = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(fileContents);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error reading transaction data quality:", error);
    return NextResponse.json(
      { error: "Failed to load transaction data quality" },
      { status: 500 }
    );
  }
}

