import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

export async function GET() {
  try {
    // Read balances.csv for actual balance
    const balancesPath = path.join(
      process.cwd(),
      "scripts/datasets/raw/balances.csv"
    );
    const balancesContent = fs.readFileSync(balancesPath, "utf-8");
    const balancesRecords = parse(balancesContent, {
      columns: true,
      skip_empty_lines: true,
      delimiter: ";",
    });

    // Parse balances and handle comma as decimal separator
    const actualBalances = balancesRecords.map((record: any) => ({
      date: record.balance_date,
      amount: parseFloat(record.amount.replace(",", ".")),
    }));

    // Filter for Jan 1 - Aug 31, 2025
    const filteredBalances = actualBalances.filter((b: any) => {
      const date = new Date(b.date);
      return date >= new Date("2025-01-01") && date <= new Date("2025-08-31");
    });

    // Get starting balance (Jan 1)
    const startingBalance = filteredBalances.find(
      (b: any) => b.date === "2025-01-01"
    )?.amount || 0;

    // Read unified_forecast_daily.csv
    const unifiedPath = path.join(
      process.cwd(),
      "scripts/datasets/forecast_analysis/unified_forecast_daily.csv"
    );
    const unifiedContent = fs.readFileSync(unifiedPath, "utf-8");
    const unifiedRecords = parse(unifiedContent, {
      columns: true,
      skip_empty_lines: true,
    });

    // Group by date and calculate net cash flow for each forecast type
    const dailyNetFlows = new Map<string, { unified: number; unified_user: number }>();

    unifiedRecords.forEach((record: any) => {
      const date = record.date;
      const unifiedForecast = parseFloat(record.unified_forecast) || 0;
      const unifiedForecastWithUser = parseFloat(record.unified_forecast_with_user) || 0;

      if (!dailyNetFlows.has(date)) {
        dailyNetFlows.set(date, { unified: 0, unified_user: 0 });
      }

      const entry = dailyNetFlows.get(date)!;
      entry.unified += unifiedForecast;
      entry.unified_user += unifiedForecastWithUser;
    });

    // Calculate cumulative balances
    const sortedDates = Array.from(dailyNetFlows.keys()).sort();
    let cumulativeUnified = startingBalance;
    let cumulativeUnifiedUser = startingBalance;

    const reconstructedData = sortedDates.map((date) => {
      const flows = dailyNetFlows.get(date)!;
      cumulativeUnified += flows.unified;
      cumulativeUnifiedUser += flows.unified_user;

      // Find actual balance for this date
      const actualBalance = filteredBalances.find((b: any) => b.date === date);

      return {
        date,
        actual_balance: actualBalance?.amount || null,
        balance_unified_forecast: cumulativeUnified,
        balance_unified_forecast_with_user: cumulativeUnifiedUser,
      };
    });

    return NextResponse.json(reconstructedData);
  } catch (error) {
    console.error("Error reconstructing balances:", error);
    return NextResponse.json(
      { error: "Failed to reconstruct balances" },
      { status: 500 }
    );
  }
}

