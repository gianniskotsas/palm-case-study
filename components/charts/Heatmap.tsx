"use client";

import React from "react";
import { Group } from "@visx/group";
import { scaleLinear } from "@visx/scale";
import { HeatmapCircle, HeatmapRect } from "@visx/heatmap";
import type { Bins, Bin } from "@visx/mock-data/lib/generators/genBins";
import { cx } from "@/lib/utils";

/**
 * Data format for the heatmap
 * @example
 * // 3 rows, 4 columns
 * const data = [
 *   [10, 20, 30, 40],
 *   [15, 25, 35, 45],
 *   [5, 15, 25, 35]
 * ]
 */
export type HeatmapData = number[][];

export interface HeatmapTooltipProps {
  /** Row index */
  row: number;
  /** Column index */
  column: number;
  /** Cell value */
  value: number;
  /** Formatted value */
  formattedValue: string;
  /** Cell color */
  color: string;
  /** Row label (optional) */
  rowLabel?: string;
  /** Column label (optional) */
  columnLabel?: string;
}

export interface HeatmapProps {
  /** 2D array of numbers representing the heatmap values */
  data: HeatmapData;
  /** Width of the heatmap (optional - defaults to full container width) */
  width?: number;
  /** Height of the heatmap (optional - defaults to full container height) */
  height?: number;
  /** Aspect ratio to maintain when both width and height are auto (width / height) */
  aspectRatio?: number;
  /** Orientation of the heatmap */
  orientation?: "horizontal" | "vertical";
  /** Color range [startColor, endColor] - defaults to chart-1 and chart-2 from CSS variables */
  colors?: [string, string];
  /** Shape of the heatmap cells */
  shape?: "circle" | "rect";
  /** Margin around the heatmap */
  margin?: { top: number; right: number; bottom: number; left: number };
  /** Opacity range [min, max] */
  opacityRange?: [number, number];
  /** Enable click events on cells */
  enableEvents?: boolean;
  /** Callback when a cell is clicked */
  onCellClick?: (row: number, column: number, value: number) => void;
  /** Custom value formatter for tooltips/events */
  valueFormatter?: (value: number) => string;
  /** Class name for the container */
  className?: string;
  /** Enable tooltip on hover */
  showTooltip?: boolean;
  /** Custom tooltip component */
  customTooltip?: React.ComponentType<HeatmapTooltipProps>;
  /** Row labels for tooltip */
  rowLabels?: string[];
  /** Column labels for tooltip */
  columnLabels?: string[];
  /** X-axis label */
  xAxisLabel?: string;
  /** Y-axis label */
  yAxisLabel?: string;
  /** Show color legend */
  showLegend?: boolean;
  /** Legend title */
  legendTitle?: string;
}

function max<Datum>(data: Datum[], value: (d: Datum) => number): number {
  return Math.max(...data.map(value));
}

function min<Datum>(data: Datum[], value: (d: Datum) => number): number {
  return Math.min(...data.map(value));
}

// Helper to get CSS variable color
function getCSSVariable(variable: string): string {
  if (typeof window === "undefined") return "#000000";
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(variable)
    .trim();
  // Convert oklch to hex approximation or return as is
  return value || "#000000";
}

// Transform simple 2D array to visx Bins format
function transformDataToBins(data: HeatmapData): Bins[] {
  return data.map((row, rowIndex) => ({
    bin: rowIndex,
    bins: row.map((value, colIndex) => ({
      bin: colIndex,
      count: value,
    })),
  }));
}

// Default Tooltip Component
const DefaultTooltip: React.FC<HeatmapTooltipProps> = ({
  row,
  column,
  value,
  formattedValue,
  color,
  rowLabel,
  columnLabel,
}) => {
  return (
    <div
      className={cx(
        "rounded-md border text-sm shadow-md",
        "border-border bg-background"
      )}
    >
      <div className="p-2">
        <div
          className={cx(
            "rounded-sm border p-2",
            "border-border bg-muted"
          )}
        >
          <p className="font-medium text-foreground">
            {rowLabel || `Row ${row}`} × {columnLabel || `Col ${column}`}
          </p>
        </div>
      </div>
      <div className="flex w-full items-center justify-between space-x-4 px-3 pb-2">
        <div className="flex items-center space-x-2 truncate">
          <span
            className="size-2.5 shrink-0 rounded-full"
            style={{ backgroundColor: color }}
            aria-hidden={true}
          />
          <p className="truncate text-muted-foreground">Value</p>
        </div>
        <p className="font-medium text-foreground">{formattedValue}</p>
      </div>
    </div>
  );
};

// Color Legend Component
interface ColorLegendProps {
  colorScale: (value: number) => string;
  minValue: number;
  maxValue: number;
  valueFormatter: (value: number) => string;
  title?: string;
  width?: number;
}

const ColorLegend: React.FC<ColorLegendProps> = ({
  colorScale,
  minValue,
  maxValue,
  valueFormatter,
  title = "Scale",
  width = 200,
}) => {
  const gradientId = React.useId();
  const legendHeight = 20;
  const numStops = 10;

  return (
    <div className="flex flex-col items-center gap-2 mt-4">
      <p className="text-xs font-medium text-muted-foreground">{title}</p>
      <svg width={width} height={legendHeight + 30}>
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            {Array.from({ length: numStops }).map((_, i) => {
              const value = minValue + (maxValue - minValue) * (i / (numStops - 1));
              return (
                <stop
                  key={i}
                  offset={`${(i / (numStops - 1)) * 100}%`}
                  stopColor={colorScale(value)}
                />
              );
            })}
          </linearGradient>
        </defs>
        <rect
          x={0}
          y={0}
          width={width}
          height={legendHeight}
          fill={`url(#${gradientId})`}
          stroke="currentColor"
          strokeWidth={1}
          className="stroke-border"
        />
        <text
          x={0}
          y={legendHeight + 15}
          className="text-xs fill-muted-foreground"
          textAnchor="start"
        >
          {valueFormatter(minValue)}
        </text>
        <text
          x={width}
          y={legendHeight + 15}
          className="text-xs fill-muted-foreground"
          textAnchor="end"
        >
          {valueFormatter(maxValue)}
        </text>
      </svg>
    </div>
  );
};

const defaultMargin = { top: 40, left: 60, right: 20, bottom: 60 };

// Internal component that renders the actual heatmap
const HeatmapInternal = React.forwardRef<
  SVGSVGElement,
  HeatmapProps & { width: number; height: number }
>(
  (
    {
      data,
      width,
      height,
      orientation = "horizontal",
      colors,
      shape = "circle",
      margin = defaultMargin,
      opacityRange = [0.1, 1],
      enableEvents = false,
      onCellClick,
      valueFormatter = (value: number) => value.toString(),
      className,
      showTooltip = true,
      customTooltip,
      rowLabels,
      columnLabels,
      xAxisLabel,
      yAxisLabel,
      showLegend = true,
      legendTitle = "Value Scale",
    },
    ref
  ) => {
    // Tooltip state
    const [hoveredCell, setHoveredCell] = React.useState<{
      row: number;
      column: number;
      value: number;
      color: string;
      x: number;
      y: number;
    } | null>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);
    // Get default colors from CSS variables
    const defaultColors: [string, string] = React.useMemo(() => {
      if (typeof window !== "undefined") {
        const chart1 = getCSSVariable("--chart-1");
        const chart2 = getCSSVariable("--chart-2");
        return [chart1, chart2];
      }
      return ["#4299e1", "#f6ad55"]; // fallback colors
    }, []);

    const [color1, color2] = colors || defaultColors;

    // Transform data to bins format
    const binData = React.useMemo(() => transformDataToBins(data), [data]);

    // Accessors
    const bins = (d: Bins) => d.bins;
    const count = (d: Bin) => d.count;

    // Calculate max values
    const colorMax = React.useMemo(
      () => max(binData, (d) => max(bins(d), count)),
      [binData]
    );
    const bucketSizeMax = React.useMemo(
      () => max(binData, (d) => bins(d).length),
      [binData]
    );

    // Scales
    const xScale = React.useMemo(
      () =>
        scaleLinear<number>({
          domain: [0, orientation === "horizontal" ? binData.length : bucketSizeMax],
        }),
      [binData.length, bucketSizeMax, orientation]
    );

    const yScale = React.useMemo(
      () =>
        scaleLinear<number>({
          domain: [0, orientation === "horizontal" ? bucketSizeMax : binData.length],
        }),
      [binData.length, bucketSizeMax, orientation]
    );

    const colorScale = React.useMemo(
      () =>
        scaleLinear<string>({
          range: [color1, color2],
          domain: [0, colorMax],
        }),
      [color1, color2, colorMax]
    );

    const opacityScale = React.useMemo(
      () =>
        scaleLinear<number>({
          range: opacityRange,
          domain: [0, colorMax],
        }),
      [opacityRange, colorMax]
    );

    // Calculate dimensions
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    const binWidth = xMax / (orientation === "horizontal" ? binData.length : bucketSizeMax);
    const binHeight = yMax / (orientation === "horizontal" ? bucketSizeMax : binData.length);
    const radius = min([binWidth, binHeight], (d) => d) / 2;

    xScale.range([0, xMax]);
    yScale.range([yMax, 0]);

    // Transform data for vertical orientation
    const displayData = React.useMemo(() => {
      if (orientation === "vertical") {
        // Transpose the data
        const transposed: Bins[] = [];
        const maxCols = Math.max(...binData.map((row) => row.bins.length));
        
        for (let col = 0; col < maxCols; col++) {
          transposed.push({
            bin: col,
            bins: binData.map((row, rowIndex) => ({
              bin: rowIndex,
              count: row.bins[col]?.count ?? 0,
            })),
          });
        }
        return transposed;
      }
      return binData;
    }, [binData, orientation]);

    const handleCellClick = (row: number, column: number, value: number) => {
      if (enableEvents && onCellClick) {
        // Adjust row/column based on orientation
        if (orientation === "vertical") {
          onCellClick(column, row, value);
        } else {
          onCellClick(row, column, value);
        }
      }
    };

    const handleCellHover = (
      row: number,
      column: number,
      value: number,
      event: React.MouseEvent
    ) => {
      if (!showTooltip) return;
      
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      // Adjust row/column based on orientation
      const actualRow = orientation === "vertical" ? column : row;
      const actualColumn = orientation === "vertical" ? row : column;

      // Get the color for this cell from the color scale
      const cellColor = colorScale(value);

      setHoveredCell({
        row: actualRow,
        column: actualColumn,
        value,
        color: cellColor,
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    };

    const handleCellLeave = () => {
      setHoveredCell(null);
    };

    if (width < 10) return null;

    const HeatmapComponent = shape === "circle" ? HeatmapCircle : HeatmapRect;
    const TooltipComponent = customTooltip || DefaultTooltip;

    // Calculate min and max for legend
    const minValue = React.useMemo(() => {
      return Math.min(...data.flat());
    }, [data]);

    const maxValue = React.useMemo(() => {
      return Math.max(...data.flat());
    }, [data]);

    return (
      <div ref={containerRef} className="relative flex flex-col w-full">
        <svg
          ref={ref}
          width={width}
          height={height}
          className={className}
        >
          <Group top={margin.top} left={margin.left}>
            <HeatmapComponent
              data={displayData}
              xScale={(d) => xScale(d) ?? 0}
              yScale={(d) => yScale(d) ?? 0}
              colorScale={colorScale}
              opacityScale={opacityScale}
              radius={shape === "circle" ? radius : undefined}
              binWidth={shape === "rect" ? binWidth : undefined}
              binHeight={shape === "rect" ? binHeight : undefined}
              gap={2}
            >
              {(heatmap) =>
                heatmap.map((heatmapBins) =>
                  heatmapBins.map((bin: any) => {
                    if (shape === "circle") {
                      return (
                        <circle
                          key={`heatmap-circle-${bin.row}-${bin.column}`}
                          className="visx-heatmap-circle"
                          cx={bin.cx}
                          cy={bin.cy}
                          r={bin.r}
                          fill={bin.color}
                          fillOpacity={bin.opacity}
                          onClick={() => handleCellClick(bin.row, bin.column, bin.bin.count)}
                          onMouseMove={(e) => handleCellHover(bin.row, bin.column, bin.bin.count, e)}
                          onMouseLeave={handleCellLeave}
                          style={{ cursor: enableEvents || showTooltip ? "pointer" : "default" }}
                        />
                      );
                    } else {
                      return (
                        <rect
                          key={`heatmap-rect-${bin.row}-${bin.column}`}
                          className="visx-heatmap-rect"
                          x={bin.x}
                          y={bin.y}
                          width={bin.width}
                          height={bin.height}
                          fill={bin.color}
                          fillOpacity={bin.opacity}
                          onClick={() => handleCellClick(bin.row, bin.column, bin.bin.count)}
                          onMouseMove={(e) => handleCellHover(bin.row, bin.column, bin.bin.count, e)}
                          onMouseLeave={handleCellLeave}
                          style={{ cursor: enableEvents || showTooltip ? "pointer" : "default" }}
                        />
                      );
                    }
                  })
                )
              }
            </HeatmapComponent>
          </Group>

          {/* Y-axis label */}
          {yAxisLabel && (
            <text
              x={-height / 2}
              y={15}
              transform="rotate(-90)"
              className="text-sm fill-foreground font-medium"
              textAnchor="middle"
            >
              {yAxisLabel}
            </text>
          )}

          {/* X-axis label */}
          {xAxisLabel && (
            <text
              x={width / 2}
              y={height - 5}
              className="text-sm fill-foreground font-medium"
              textAnchor="middle"
            >
              {xAxisLabel}
            </text>
          )}
        </svg>

        {/* Color Legend */}
        {showLegend && (
          <ColorLegend
            colorScale={colorScale}
            minValue={minValue}
            maxValue={maxValue}
            valueFormatter={valueFormatter}
            title={legendTitle}
            width={Math.min(width * 0.4, 200)}
          />
        )}

        {/* Tooltip */}
        {showTooltip && hoveredCell && (
          <div
            className="pointer-events-none absolute z-50"
            style={{
              left: hoveredCell.x + 10,
              top: hoveredCell.y - 10,
            }}
          >
            <TooltipComponent
              row={hoveredCell.row}
              column={hoveredCell.column}
              value={hoveredCell.value}
              formattedValue={valueFormatter(hoveredCell.value)}
              color={hoveredCell.color}
              rowLabel={rowLabels?.[hoveredCell.row]}
              columnLabel={columnLabels?.[hoveredCell.column]}
            />
          </div>
        )}
      </div>
    );
  }
);

HeatmapInternal.displayName = "HeatmapInternal";

// Responsive wrapper component
export const Heatmap = React.forwardRef<SVGSVGElement, HeatmapProps>((props, ref) => {
  const { width: propWidth, height: propHeight, aspectRatio, ...rest } = props;
  const [dimensions, setDimensions] = React.useState<{
    width: number;
    height: number;
  }>({
    width: propWidth || 0,
    height: propHeight || 0,
  });
  const measureRef = React.useRef<HTMLDivElement>(null);
  const resizeTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    // If both dimensions are provided, no need to measure
    if (propWidth && propHeight) return;

    const measureElement = measureRef.current;
    if (!measureElement) return;

    let isInitialRender = true;

    // Initial measurement
    const updateDimensions = (immediate = false) => {
      const rect = measureElement.getBoundingClientRect();
      let newWidth = propWidth || rect.width;
      let newHeight = propHeight || rect.height;

      // If only width is provided and we have an aspect ratio, calculate height
      if (propWidth && !propHeight && aspectRatio) {
        newHeight = propWidth / aspectRatio;
      }
      // If only height is provided and we have an aspect ratio, calculate width
      else if (!propWidth && propHeight && aspectRatio) {
        newWidth = propHeight * aspectRatio;
      }
      // If neither is provided and we have an aspect ratio, use width and calculate height
      else if (!propWidth && !propHeight && aspectRatio) {
        newWidth = rect.width;
        newHeight = newWidth / aspectRatio;
      }
      // If neither is provided and no aspect ratio, use parent dimensions
      else if (!propWidth && !propHeight) {
        newWidth = rect.width;
        newHeight = rect.height;
      }

      // For initial render, set dimensions immediately
      if (immediate) {
        setDimensions({ width: newWidth, height: newHeight });
      } else {
        // Only update if dimensions actually changed significantly (avoid micro-adjustments)
        setDimensions((prev) => {
          if (Math.abs(prev.width - newWidth) > 2 || Math.abs(prev.height - newHeight) > 2) {
            return { width: newWidth, height: newHeight };
          }
          return prev;
        });
      }
    };

    // Debounced update to prevent rapid re-renders
    const debouncedUpdate = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      resizeTimeoutRef.current = setTimeout(() => {
        updateDimensions(false);
      }, 150);
    };

    // Initial render - immediate
    updateDimensions(true);
    isInitialRender = false;

    // Create ResizeObserver to watch for size changes
    const resizeObserver = new ResizeObserver(() => {
      if (!isInitialRender) {
        debouncedUpdate();
      }
    });

    resizeObserver.observe(measureElement);

    return () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      resizeObserver.disconnect();
    };
  }, [propWidth, propHeight, aspectRatio]);

  // If both dimensions are provided, render directly
  if (propWidth && propHeight) {
    return <HeatmapInternal ref={ref} width={propWidth} height={propHeight} {...rest} />;
  }

  // Otherwise, render with measured dimensions
  return (
    <div ref={measureRef} style={{ width: "100%", height: "100%" }} className={props.className}>
      {dimensions.width > 0 && dimensions.height > 0 && (
        <HeatmapInternal
          ref={ref}
          width={dimensions.width}
          height={dimensions.height}
          {...rest}
        />
      )}
    </div>
  );
});

Heatmap.displayName = "Heatmap";

