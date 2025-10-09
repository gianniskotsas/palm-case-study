import React from "react";
import { getSeededRandom } from "@visx/mock-data";
import { Card, CardContent } from "../ui/card";
import { Heatmap, type HeatmapData } from "../charts/Heatmap";

// Generate sample data using the same seeded random as before
const seededRandom = getSeededRandom(0.41);

// Generate sample heatmap data (16 rows x 16 columns)
const generateSampleData = (): HeatmapData => {
  const rows = 16;
  const cols = 16;
  const data: HeatmapData = [];

  for (let i = 0; i < rows; i++) {
    const row: number[] = [];
    for (let j = 0; j < cols; j++) {
      // Generate values similar to the original
      row.push(25 * (cols - j) * seededRandom());
    }
    data.push(row);
  }

  return data;
};

const sampleData = generateSampleData();

// Generate sample labels for demonstration
const generateRowLabels = (count: number) =>
  Array.from({ length: count }, (_, i) => `Week ${i + 1}`);

const generateColumnLabels = (count: number) =>
  Array.from({ length: count }, (_, i) => `Day ${i + 1}`);

export type RevenueHeatmapProps = {
  /** Optional container class name for styling the card */
  className?: string;
  /** Optional margin around the heatmap */
  margin?: { top: number; right: number; bottom: number; left: number };
  /** Enable click events on cells */
  events?: boolean;
  /** Heatmap data - 2D array of numbers */
  data?: HeatmapData;
  /** Orientation of the heatmap */
  orientation?: "horizontal" | "vertical";
  /** Show tooltip on hover */
  showTooltip?: boolean;
  /** Labels for rows */
  rowLabels?: string[];
  /** Labels for columns */
  columnLabels?: string[];
};

const defaultMargin = { top: 40, left: 60, right: 20, bottom: 60 };

function RevenueHeatmap({
  className,
  events = false,
  margin = defaultMargin,
  data = sampleData,
  orientation = "horizontal",
  showTooltip = true,
  rowLabels,
  columnLabels,
}: RevenueHeatmapProps) {
  const handleCellClick = (row: number, column: number, value: number) => {
    if (events) {
      alert(
        JSON.stringify({
          row,
          column,
          value: value.toFixed(2),
        })
      );
    }
  };

  // Use provided labels or generate defaults
  const defaultRowLabels = rowLabels || generateRowLabels(data.length);
  const defaultColumnLabels =
    columnLabels || generateColumnLabels(data[0]?.length || 0);

  return (
    <Card className={className}>
      <CardContent className="pt-6 flex flex-col h-full">
        <Heatmap
          data={data}
          orientation={orientation}
          shape="circle"
          margin={margin}
          enableEvents={events}
          onCellClick={handleCellClick}
          valueFormatter={(value) => `$${value.toFixed(2)}`}
          showTooltip={showTooltip}
          rowLabels={defaultRowLabels}
          columnLabels={defaultColumnLabels}
          xAxisLabel="Time Period"
          yAxisLabel="Revenue Metric"
          showLegend={true}
          legendTitle="Revenue ($)"
        />
      </CardContent>
    </Card>
  );
}

export default RevenueHeatmap;
