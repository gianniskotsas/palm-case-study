import React, { useMemo } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { cx } from '@/lib/utils';

/**
 * Converts any CSS color to RGB using browser's color parsing
 */
const colorToRgb = (color: string): [number, number, number] => {
  // Use browser's native color parsing via canvas
  if (typeof window !== 'undefined') {
    const ctx = document.createElement('canvas').getContext('2d');
    if (ctx) {
      ctx.fillStyle = color;
      const parsed = ctx.fillStyle;
      
      // Parse the rgb/rgba result
      const match = parsed.match(/\d+/g);
      if (match && match.length >= 3) {
        return [parseInt(match[0]), parseInt(match[1]), parseInt(match[2])];
      }
    }
  }
  
  // Fallback parsing
  if (color.startsWith('#')) {
    const cleaned = color.replace('#', '');
    return [
      parseInt(cleaned.substring(0, 2), 16),
      parseInt(cleaned.substring(2, 4), 16),
      parseInt(cleaned.substring(4, 6), 16),
    ];
  }
  
  const match = color.match(/\d+/g);
  if (match && match.length >= 3) {
    return [parseInt(match[0]), parseInt(match[1]), parseInt(match[2])];
  }
  
  return [0, 0, 0];
};

/**
 * Interpolates between two colors based on a factor (0-1)
 */
const interpolateColor = (color1: string, color2: string, factor: number): string => {
  const rgb1 = colorToRgb(color1);
  const rgb2 = colorToRgb(color2);

  const r = Math.round(rgb1[0] + factor * (rgb2[0] - rgb1[0]));
  const g = Math.round(rgb1[1] + factor * (rgb2[1] - rgb1[1]));
  const b = Math.round(rgb1[2] + factor * (rgb2[2] - rgb1[2]));

  return `rgb(${r}, ${g}, ${b})`;
};

/**
 * Gets a CSS variable value from the document and converts it to a usable format
 */
const getCSSVariable = (variable: string, fallback: string): string => {
  if (typeof window === 'undefined') return fallback;
  
  // Get the CSS variable value
  const value = getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
  if (!value) return fallback;
  
  // If it's in oklch format, wrap it for proper usage
  if (value.includes('oklch')) {
    return value;
  }
  
  // If it's just the color values without function wrapper, wrap it in oklch
  if (!value.startsWith('#') && !value.startsWith('rgb') && !value.startsWith('hsl') && !value.startsWith('oklch')) {
    return `oklch(${value})`;
  }
  
  return value;
};

/**
 * Represents a single data point in the bubble chart
 */
export interface BubbleDataPoint {
  [key: string]: string | number; // Flexible for different x-axis keys (e.g., hour, weekOfYear, etc.)
  index: number; // Y-axis position (typically 1)
  value: number; // Size of the bubble
}

/**
 * Represents a row in the bubble chart (e.g., a day of the week)
 */
export interface BubbleRowData {
  name: string; // Label for the row (e.g., "Sunday", "Monday")
  data: BubbleDataPoint[]; // Data points for this row
}

/**
 * Props for the BubbleChart component
 */
export interface BubbleChartProps {
  /** Array of row data to display */
  data: BubbleRowData[];
  /** Color for lowest values (default: uses --chart-1 CSS variable or '#8884d8') */
  colorLow?: string;
  /** Color for highest values (default: uses --chart-2 CSS variable or '#82ca9d') */
  colorHigh?: string;
  /** Use gradient coloring based on values (default: true) */
  useGradient?: boolean;
  /** Custom domain for the value axis [min, max]. If not provided, auto-calculated from data */
  domain?: [number, number];
  /** Range for bubble sizes [min, max] in pixels (default: [16, 225]) */
  range?: [number, number];
  /** Height of each row in pixels (default: 60) */
  rowHeight?: number;
  /** Key to use for x-axis data (default: auto-detect from first data point) */
  xAxisDataKey?: string;
  /** Show x-axis labels (default: false for first n-1 rows, true for last row) */
  showXAxisLabels?: boolean;
  /** Show x-axis ticks (default: true for last row only) */
  showXAxisTicks?: boolean;
  /** Position of the row label (default: 'insideRight') */
  labelPosition?: 'insideRight' | 'insideLeft' | 'left' | 'right';
  /** Width of the Y-axis label area (default: 80) */
  labelWidth?: number;
  /** Custom tooltip formatter function */
  tooltipFormatter?: (data: BubbleDataPoint, xAxisKey: string) => React.ReactNode;
  /** Label to show in tooltip (default: 'Revenue') */
  tooltipLabel?: string;
  /** Custom value formatter for tooltip (default: currency in EUR) */
  tooltipValueFormatter?: (value: number) => string;
  /** Prefix for x-axis value in tooltip (default: 'Week ') */
  tooltipXAxisPrefix?: string;
  /** Custom margins for each chart */
  margins?: { top?: number; right?: number; bottom?: number; left?: number };
  /** Font size for x-axis labels (default: 10, 0 to hide) */
  xAxisFontSize?: number;
  /** Custom formatter for x-axis tick labels */
  xAxisTickFormatter?: (value: any) => string;
  /** Show border line at bottom (default: true) */
  showBottomBorder?: boolean;
}

/**
 * BubbleChart Component
 * 
 * A reusable bubble chart component that displays multiple rows of data as bubbles.
 * Each row represents a category (e.g., day of week) and shows bubbles across an x-axis.
 * 
 * @example
 * ```tsx
 * const data = [
 *   {
 *     name: "Sunday",
 *     data: [
 *       { weekOfYear: 2, index: 1, value: 4905.9 },
 *       { weekOfYear: 6, index: 1, value: 2137.76 }
 *     ]
 *   },
 *   // ... more rows
 * ];
 * 
 * <BubbleChart 
 *   data={data} 
 *   xAxisDataKey="weekOfYear"
 *   rowHeight={60}
 *   useGradient={true}
 *   colorLow="hsl(var(--chart-1))"
 *   colorHigh="hsl(var(--chart-2))"
 * />
 * ```
 */
const BubbleChart: React.FC<BubbleChartProps> = ({
  data,
  colorLow,
  colorHigh,
  useGradient = true,
  domain,
  range = [16, 225],
  rowHeight = 60,
  xAxisDataKey,
  showXAxisLabels,
  showXAxisTicks,
  labelPosition = 'insideRight',
  labelWidth = 80,
  tooltipFormatter,
  tooltipLabel = 'Revenue',
  tooltipValueFormatter,
  tooltipXAxisPrefix = 'Week ',
  margins = { top: 10, right: 0, bottom: 0, left: 0 },
  xAxisFontSize = 10,
  xAxisTickFormatter,
  showBottomBorder = true,
}) => {
  // Get colors from CSS variables or use defaults
  const lowColor = colorLow || getCSSVariable('--chart-1', '#8884d8');
  const highColor = colorHigh || getCSSVariable('--chart-2', '#82ca9d');
  // Auto-detect x-axis key from first data point if not provided
  const detectedXAxisKey = useMemo(() => {
    if (xAxisDataKey) return xAxisDataKey;
    
    // Find the first non-empty data array
    const firstRow = data.find(row => row.data.length > 0);
    if (!firstRow) return 'x';
    
    // Find the first key that's not 'index' or 'value'
    const firstDataPoint = firstRow.data[0];
    const keys = Object.keys(firstDataPoint).filter(key => key !== 'index' && key !== 'value');
    return keys[0] || 'x';
  }, [data, xAxisDataKey]);

  // Calculate domain from all data if not provided
  const calculatedDomain = useMemo(() => {
    if (domain) return domain;
    
    const allValues = data.flatMap(row => row.data.map(point => point.value));
    const maxValue = Math.max(...allValues, 0);
    return [0, maxValue] as [number, number];
  }, [data, domain]);

  // Calculate color for a given value
  const getColorForValue = (value: number): string => {
    if (!useGradient) return lowColor;
    
    const [min, max] = calculatedDomain;
    const range = max - min;
    if (range === 0) return lowColor;
    
    const factor = (value - min) / range;
    return interpolateColor(lowColor, highColor, factor);
  };

  // Default tooltip renderer with modern card design
  const defaultTooltipRenderer = (props: any) => {
    const { active, payload } = props;

    if (!active || !payload || !payload.length) return null;

    const pointData = payload[0]?.payload as BubbleDataPoint;
    if (!pointData) return null;
    
    if (tooltipFormatter) {
      return <div>{tooltipFormatter(pointData, detectedXAxisKey)}</div>;
    }

    // Default value formatter
    const defaultValueFormatter = (number: number) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2,
      }).format(number);
    };

    const valueFormatter = tooltipValueFormatter || defaultValueFormatter;

    // Get the current bubble color
    const bubbleColor = getColorForValue(pointData.value);

    return (
      <div
        className={cx(
          // base
          "w-52 rounded-md border text-sm shadow-md",
          // border color
          "border-border",
          // background color
          "bg-background",
        )}
      >
        <div className="p-2">
          <div
            className={cx(
              // base
              "rounded-sm border p-2",
              // border color
              "border-border",
              // background color
              "bg-accent/20",
            )}
          >
            <p
              className={cx(
                // base
                "font-medium",
                // text color
                "text-gray-900 dark:text-gray-50",
              )}
            >
              {tooltipXAxisPrefix}{pointData[detectedXAxisKey]}
            </p>
          </div>
        </div>
        <div className="flex w-full items-center justify-between space-x-4 px-3 pb-2">
          <div className="flex items-center space-x-2 truncate">
            <span
              className="size-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: bubbleColor }}
              aria-hidden={true}
            />
            <p
              className={cx(
                // base
                "truncate",
                // text color
                "text-gray-700 dark:text-gray-300",
              )}
            >
              {tooltipLabel}
            </p>
          </div>
          <p
            className={cx(
              // base
              "font-medium tabular-nums",
              // text color
              "text-gray-900 dark:text-gray-50",
            )}
          >
            {valueFormatter(pointData.value)}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div style={{ width: '100%', borderBottom: showBottomBorder ? undefined : 'none' }}>
      {data.map((row, index) => {
        const isLastRow = index === data.length - 1;
        const showLabels = showXAxisLabels !== undefined ? showXAxisLabels : isLastRow;
        const showTicks = showXAxisTicks !== undefined ? showXAxisTicks : isLastRow;
        const fontSize = showLabels ? xAxisFontSize : 0;

        return (
          <ResponsiveContainer key={row.name} width="100%" height={rowHeight}>
            <ScatterChart margin={margins}>
              <XAxis
                type="category"
                dataKey={detectedXAxisKey}
                interval={0}
                tick={{ fontSize }}
                tickLine={showTicks ? { transform: 'translate(0, -6)' } : false}
                tickFormatter={xAxisTickFormatter}
                axisLine={!isLastRow ? false : undefined}
              />
              <YAxis
                type="number"
                dataKey="index"
                height={10}
                width={labelWidth}
                tick={false}
                tickLine={false}
                axisLine={false}
                label={{ 
                  value: row.name, 
                  position: labelPosition,
                  offset: 10,
                  style: { textAnchor: 'end' },
                  className: 'text-sm font-medium -translate-y-2.5'
                }}
              />
              <ZAxis 
                type="number" 
                dataKey="value" 
                domain={calculatedDomain} 
                range={range} 
              />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }} 
                wrapperStyle={{ zIndex: 100 }} 
                content={defaultTooltipRenderer} 
              />
              <Scatter data={row.data}>
                {row.data.map((entry, cellIndex) => (
                  <Cell key={`cell-${cellIndex}`} fill={getColorForValue(entry.value)} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        );
      })}
    </div>
  );
};

export default BubbleChart;
