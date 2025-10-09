// Tremor Raw chartColors [v0.1.0]

export type ColorUtility = "bg" | "stroke" | "fill" | "text"

// Chart colors using CSS variables from @globals.css for --chart-1, --chart-2, etc., with var().

export const chartColors = {
  "chart-1": {
    bg: "bg-[var(--chart-1)]",
    stroke: "stroke-[var(--chart-1)]",
    fill: "fill-[var(--chart-1)]",
    text: "text-[var(--chart-1)]",
  },
  "chart-2": {
    bg: "bg-[var(--chart-2)]",
    stroke: "stroke-[var(--chart-2)]",
    fill: "fill-[var(--chart-2)]",
    text: "text-[var(--chart-2)]",
  },
  "chart-3": {
    bg: "bg-[var(--chart-3)]",
    stroke: "stroke-[var(--chart-3)]",
    fill: "fill-[var(--chart-3)]",
    text: "text-[var(--chart-3)]",
  },
  "chart-4": {
    bg: "bg-[var(--chart-4)]",
    stroke: "stroke-[var(--chart-4)]",
    fill: "fill-[var(--chart-4)]",
    text: "text-[var(--chart-4)]",
  },
  "chart-5": {
    bg: "bg-[var(--chart-5)]",
    stroke: "stroke-[var(--chart-5)]",
    fill: "fill-[var(--chart-5)]",
    text: "text-[var(--chart-5)]",
  },
  "chart-6": {
    bg: "bg-[var(--chart-6)]",
    stroke: "stroke-[var(--chart-6)]",
    fill: "fill-[var(--chart-6)]",
    text: "text-[var(--chart-6)]",
  },
} as const satisfies {
  [color: string]: {
    [key in ColorUtility]: string
  }
}

export type AvailableChartColorsKeys = keyof typeof chartColors

export const AvailableChartColors: AvailableChartColorsKeys[] = Object.keys(
  chartColors,
) as Array<AvailableChartColorsKeys>

export const constructCategoryColors = (
  categories: string[],
  colors: AvailableChartColorsKeys[],
): Map<string, AvailableChartColorsKeys> => {
  const categoryColors = new Map<string, AvailableChartColorsKeys>()
  categories.forEach((category, index) => {
    categoryColors.set(category, colors[index % colors.length])
  })
  return categoryColors
}

export const getColorClassName = (
  color: AvailableChartColorsKeys,
  type: ColorUtility,
): string => {
  const fallbackColor = {
    bg: "bg-[var(--chart-5)]",
    stroke: "stroke-[var(--chart-5)]",
    fill: "fill-[var(--chart-5)]",
    text: "text-[var(--chart-5)]",
  }
  return chartColors[color]?.[type] ?? fallbackColor[type]
}

// Tremor Raw getYAxisDomain [v0.0.0]

export const getYAxisDomain = (
  autoMinValue: boolean,
  minValue: number | undefined,
  maxValue: number | undefined,
) => {
  const minDomain = autoMinValue ? "auto" : minValue ?? 0
  const maxDomain = maxValue ?? "auto"
  return [minDomain, maxDomain]
}

// Tremor Raw hasOnlyOneValueForKey [v0.1.0]

export function hasOnlyOneValueForKey(
  array: any[],
  keyToCheck: string,
): boolean {
  const val: any[] = []

  for (const obj of array) {
    if (Object.prototype.hasOwnProperty.call(obj, keyToCheck)) {
      val.push(obj[keyToCheck])
      if (val.length > 1) {
        return false
      }
    }
  }

  return true
}