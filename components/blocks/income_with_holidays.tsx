import { LineChart, type TooltipProps } from "@/components/charts/LineChart";
import { Card, CardContent } from "../ui/card";
import { cx } from "@/lib/utils";

const data = [
  { date: "Jan 01", income: 525.98 },
  { date: "Jan 03", income: 173.33 },
  { date: "Jan 05", income: 204.59 },
  { date: "Jan 06", income: 428.32 },
  { date: "Jan 07", income: 2029.42 },
  { date: "Jan 08", income: 2235.57 },
  { date: "Jan 09", income: 275.75 },
  { date: "Jan 10", income: 437.85 },
  { date: "Jan 12", income: 5420.67 },
  { date: "Jan 13", income: 5932.23 },
  { date: "Jan 14", income: 287.61 },
  { date: "Jan 15", income: 1282.59 },
  { date: "Jan 16", income: 497.08 },
  { date: "Jan 17", income: 2221.28 },
  { date: "Jan 18", income: 2998.9 },
  { date: "Jan 19", income: 411.89 },
  { date: "Jan 21", income: 8969.09 },
  { date: "Jan 22", income: 348.08 },
  { date: "Jan 23", income: 2628.98 },
  { date: "Jan 24", income: 243.72 },
  { date: "Jan 25", income: 1122.32 },
  { date: "Jan 26", income: 552.02 },
  { date: "Jan 28", income: 2759.93 },
  { date: "Jan 29", income: 1162.75 },
  { date: "Jan 30", income: 1129.41 },
  { date: "Feb 01", income: 814.08 },
  { date: "Feb 02", income: 68.93 },
  { date: "Feb 03", income: 3573.44 },
  { date: "Feb 04", income: 319.89 },
  { date: "Feb 05", income: 1972.11 },
  { date: "Feb 06", income: 820.25 },
  { date: "Feb 07", income: 1437.88 },
  { date: "Feb 08", income: 2110.22 },
  { date: "Feb 09", income: 2389.51 },
  { date: "Feb 10", income: 3485.07 },
  { date: "Feb 11", income: 1808.46 },
  { date: "Feb 12", income: 966.02 },
  { date: "Feb 13", income: 1142.1 },
  { date: "Feb 14", income: 271.46 },
  { date: "Feb 15", income: 380.61 },
  { date: "Feb 16", income: 256.2 },
  { date: "Feb 17", income: 3012.84 },
  { date: "Feb 18", income: 594.98 },
  { date: "Feb 20", income: 308.9 },
  { date: "Feb 21", income: 1460.67 },
  { date: "Feb 22", income: 447.66 },
  { date: "Feb 23", income: 5508.78 },
  { date: "Feb 24", income: 1652.99 },
  { date: "Feb 25", income: 4109.26 },
  { date: "Feb 26", income: 1318.77 },
  { date: "Feb 27", income: 1065.97 },
  { date: "Mar 01", income: 188.11 },
  { date: "Mar 02", income: 138.91 },
  { date: "Mar 04", income: 3569.09 },
  { date: "Mar 06", income: 420.16 },
  { date: "Mar 08", income: 379.48 },
  { date: "Mar 09", income: 3828.25 },
  { date: "Mar 10", income: 981.74 },
  { date: "Mar 11", income: 500.97 },
  { date: "Mar 12", income: 3714.45 },
  { date: "Mar 13", income: 455.68 },
  { date: "Mar 16", income: 3779.93 },
  { date: "Mar 17", income: 1827.72 },
  { date: "Mar 20", income: 1930.27 },
  { date: "Mar 21", income: 391.3 },
  { date: "Mar 23", income: 1594.3 },
  { date: "Mar 24", income: 354.04 },
  { date: "Mar 25", income: 2702.55 },
  { date: "Mar 26", income: 362.47 },
  { date: "Mar 29", income: 1006.3 },
  { date: "Mar 31", income: 853.95 },
  { date: "Apr 02", income: 4514.76 },
  { date: "Apr 04", income: 972.34 },
  { date: "Apr 05", income: 4903.31 },
  { date: "Apr 06", income: 2512.22 },
  { date: "Apr 07", income: 502.26 },
  { date: "Apr 08", income: 1610.67 },
  { date: "Apr 09", income: 1635.45 },
  { date: "Apr 10", income: 497.77 },
  { date: "Apr 11", income: 5573.87 },
  { date: "Apr 12", income: 1042.8 },
  { date: "Apr 13", income: 950.39 },
  { date: "Apr 14", income: 694.19 },
  { date: "Apr 15", income: 4477.95 },
  { date: "Apr 16", income: 4047.35 },
  { date: "Apr 17", income: 83.59 },
  { date: "Apr 18", income: 2799.57 },
  { date: "Apr 19", income: 318.55 },
  { date: "Apr 21", income: 1165.54 },
  { date: "Apr 22", income: 4224.88 },
  { date: "Apr 24", income: 1502.74 },
  { date: "Apr 25", income: 732.12 },
  { date: "Apr 26", income: 1127.31 },
  { date: "Apr 28", income: 754.35 },
  { date: "Apr 29", income: 368.3 },
  { date: "Apr 30", income: 2425.46 },
  { date: "May 02", income: 3208.6 },
  { date: "May 03", income: 226.68 },
  { date: "May 04", income: 276.05 },
  { date: "May 05", income: 2401.24 },
  { date: "May 07", income: 166.74 },
  { date: "May 09", income: 2211.24 },
  { date: "May 10", income: 773.11 },
  { date: "May 11", income: 387.6 },
  { date: "May 12", income: 290.14 },
  { date: "May 14", income: 1588.83 },
  { date: "May 15", income: 1840.61 },
  { date: "May 16", income: 1558.95 },
  { date: "May 17", income: 699.66 },
  { date: "May 18", income: 176.04 },
  { date: "May 19", income: 368.22 },
  { date: "May 21", income: 4103.06 },
  { date: "May 22", income: 4799.67 },
  { date: "May 23", income: 2891.89 },
  { date: "May 24", income: 1250.04 },
  { date: "May 25", income: 3184.64 },
  { date: "May 26", income: 2853.87 },
  { date: "May 27", income: 3542.01 },
  { date: "May 28", income: 3143.84 },
  { date: "May 29", income: 1638.48 },
  { date: "May 30", income: 303.32 },
  { date: "May 31", income: 3235.76 },
  { date: "Jun 01", income: 156.26 },
  { date: "Jun 02", income: 116.04 },
  { date: "Jun 03", income: 899.71 },
  { date: "Jun 05", income: 1104.44 },
  { date: "Jun 07", income: 1593.8 },
  { date: "Jun 08", income: 740.47 },
  { date: "Jun 09", income: 1353.46 },
  { date: "Jun 10", income: 507.55 },
  { date: "Jun 11", income: 2691.76 },
  { date: "Jun 12", income: 3779.65 },
  { date: "Jun 13", income: 307.31 },
  { date: "Jun 14", income: 422.84 },
  { date: "Jun 17", income: 1465.74 },
  { date: "Jun 19", income: 4677.93 },
  { date: "Jun 20", income: 2550.43 },
  { date: "Jun 21", income: 396.47 },
  { date: "Jun 22", income: 451.36 },
  { date: "Jun 23", income: 362.85 },
  { date: "Jun 24", income: 238.84 },
  { date: "Jun 25", income: 318.28 },
  { date: "Jun 26", income: 1455.23 },
  { date: "Jun 27", income: 1008.21 },
  { date: "Jun 29", income: 222.32 },
  { date: "Jun 30", income: 2506.31 },
  { date: "Jul 01", income: 109.47 },
  { date: "Jul 02", income: 3659.14 },
  { date: "Jul 03", income: 268.13 },
  { date: "Jul 06", income: 440.54 },
  { date: "Jul 07", income: 935.31 },
  { date: "Jul 08", income: 531.41 },
  { date: "Jul 09", income: 803.77 },
  { date: "Jul 12", income: 2357.97 },
  { date: "Jul 13", income: 1386.67 },
  { date: "Jul 14", income: 242.75 },
  { date: "Jul 15", income: 272.04 },
  { date: "Jul 16", income: 1172.72 },
  { date: "Jul 17", income: 3387.98 },
  { date: "Jul 18", income: 2805.05 },
  { date: "Jul 19", income: 772.91 },
  { date: "Jul 20", income: 525.12 },
  { date: "Jul 21", income: 374.88 },
  { date: "Jul 23", income: 1861.18 },
  { date: "Jul 25", income: 380.36 },
  { date: "Jul 26", income: 1271.27 },
  { date: "Jul 28", income: 460.95 },
  { date: "Jul 29", income: 3237.65 },
  { date: "Jul 30", income: 170.63 },
  { date: "Jul 31", income: 199.33 },
  { date: "Aug 01", income: 2476.54 },
  { date: "Aug 02", income: 251.47 },
  { date: "Aug 03", income: 499.43 },
  { date: "Aug 04", income: 548.68 },
  { date: "Aug 05", income: 667.2 },
  { date: "Aug 07", income: 868.26 },
  { date: "Aug 08", income: 114.17 },
  { date: "Aug 09", income: 404.4 },
  { date: "Aug 10", income: 2078.78 },
  { date: "Aug 11", income: 967.81 },
  { date: "Aug 12", income: 352.59 },
  { date: "Aug 13", income: 1324.52 },
  { date: "Aug 14", income: 1647.32 },
  { date: "Aug 15", income: 2492.43 },
  { date: "Aug 16", income: 2791.57 },
  { date: "Aug 17", income: 538.88 },
  { date: "Aug 19", income: 3112.02 },
  { date: "Aug 20", income: 774.04 },
  { date: "Aug 21", income: 1122.26 },
  { date: "Aug 22", income: 376.53 },
  { date: "Aug 23", income: 192.86 },
  { date: "Aug 24", income: 473.47 },
  { date: "Aug 25", income: 2509.26 },
  { date: "Aug 26", income: 814.53 },
  { date: "Aug 27", income: 1998.22 },
  { date: "Aug 28", income: 289.53 },
  { date: "Aug 29", income: 956.62 },
  { date: "Aug 30", income: 135.27 },
  { date: "Aug 31", income: 2551.35 },
];

const frenchHolidays = [
  { date: "Jan 01", holiday: "New Year's Day" },
  { date: "Apr 18", holiday: "Good Friday (Alsace and Moselle only)" },
  { date: "Apr 21", holiday: "Easter Monday" },
  { date: "May 01", holiday: "Labor Day" },
  { date: "May 08", holiday: "Victory Day" },
  { date: "May 28", holiday: "F1 Grand Prix" },
  { date: "May 29", holiday: "Ascension Day" },
  { date: "Jun 09", holiday: "Whit Monday" },
  { date: "Jul 14", holiday: "Bastille Day" },
  { date: "Aug 15", holiday: "Assumption of Mary" },
];

// Create a map for quick holiday lookup
const holidayMap = new Map(frenchHolidays.map(h => [h.date, h.holiday]));

// Function to parse date string "MMM DD" to a comparable number (day of year approximation)
const parseDate = (dateStr: string): number => {
  const [month, day] = dateStr.split(' ');
  const monthMap: Record<string, number> = {
    'Jan': 0, 'Feb': 31, 'Mar': 59, 'Apr': 90, 'May': 120, 'Jun': 151,
    'Jul': 181, 'Aug': 212, 'Sep': 243, 'Oct': 273, 'Nov': 304, 'Dec': 334
  };
  return monthMap[month] + parseInt(day);
};

// Calculate label positions based on proximity (within 5 days)
const calculateLabelPositions = () => {
  const sortedHolidays = [...frenchHolidays].sort((a, b) => parseDate(a.date) - parseDate(b.date));
  
  const positions: Array<{ date: string; holiday: string; labelPosition: "left" | "right" }> = [];
  
  for (let idx = 0; idx < sortedHolidays.length; idx++) {
    const currentDay = parseDate(sortedHolidays[idx].date);
    let position: "left" | "right" = "right"; // default
    
    // Check if there's a next holiday within 5 days
    if (idx < sortedHolidays.length - 1) {
      const nextDay = parseDate(sortedHolidays[idx + 1].date);
      const daysDifference = nextDay - currentDay;
      
      if (daysDifference <= 5) {
        // This is the FIRST of a close pair, put label on the LEFT
        position = "left";
      }
    }
    
    // Override: if previous holiday was close (within 5 days), this should be RIGHT
    if (idx > 0) {
      const prevDay = parseDate(sortedHolidays[idx - 1].date);
      const daysDifference = currentDay - prevDay;
      
      if (daysDifference <= 5) {
        // This is the SECOND of a close pair, put label on the RIGHT
        position = "right";
      }
    }
    
    positions.push({
      ...sortedHolidays[idx],
      labelPosition: position
    });
  }
  
  return positions;
};

const holidaysWithPositions = calculateLabelPositions();

// Custom tooltip component that shows holidays
const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;
  
  const holiday = holidayMap.get(label);
  
  return (
    <div
      className={cx(
        "rounded-md border text-sm shadow-md",
        "border-border",
        "bg-background"
      )}
    >
      <div className={cx("border-b border-inherit px-4 py-2")}>
        <p
          className={cx(
            "font-medium",
            "text-foreground"
          )}
        >
          {label}
        </p>
        {holiday && (
          <p className={cx(
            "text-xs mt-1",
            "text-chart-2",
            "font-medium"
          )}>
            🎉 {holiday}
          </p>
        )}
      </div>
      <div className={cx("space-y-1 px-4 py-2")}>
        {payload.map((item, index) => (
          <div
            key={`id-${index}`}
            className="flex items-center justify-between space-x-8"
          >
            <div className="flex items-center space-x-2">
              <span
                aria-hidden="true"
                className={cx(
                  "h-[3px] w-3.5 shrink-0 rounded-full bg-chart-1"
                )}
              />
              <p
                className={cx(
                  "text-right whitespace-nowrap",
                  "text-muted-foreground"
                )}
              >
                Income
              </p>
            </div>
            <p
              className={cx(
                "text-right font-medium whitespace-nowrap tabular-nums",
                "text-foreground"
              )}
            >
              €{item.value?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Extract unique months for X-axis ticks (first occurrence of each month)
const getMonthTicks = () => {
  const seen = new Set<string>();
  const ticks: string[] = [];
  
  data.forEach(item => {
    const month = item.date.split(' ')[0];
    if (!seen.has(month)) {
      seen.add(month);
      ticks.push(item.date);
    }
  });
  
  return ticks;
};

const monthTicks = getMonthTicks();

export default function IncomeWithHolidays() {
  return (
    <Card className="w-full h-full">
      <CardContent className=" flex flex-col h-full">
        <LineChart 
          data={data} 
          index="date" 
          categories={["income"]}
          colors={["chart-1"]}
          showGridLines={false}
          showLegend={false}
          customTooltip={CustomTooltip}
          customTicks={monthTicks}
          xAxisTickFormatter={(value) => value.split(' ')[0]}
          valueFormatter={(value) => {
            if (value >= 1000) {
              return `€${(value / 1000).toFixed(1)}k`;
            }
            return `€${value.toFixed(0)}`;
          }}
          verticalReferenceLines={holidaysWithPositions.map((holiday) => ({ 
            label: holiday.holiday, 
            value: holiday.date,
            labelPosition: holiday.labelPosition
          }))}
          verticalReferenceLineColor="var(--chart-2)"
          verticalReferenceLabelColor="fill-chart-2"
          className="bg-background"
        />
      </CardContent>
    </Card>
  );
}
