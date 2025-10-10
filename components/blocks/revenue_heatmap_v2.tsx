'use client';

import BubbleChart from "../charts/BubbleChart";
import { Card, CardContent } from "../ui/card";

const data = [
    {
      "name": "Monday",
      "data": [{ weekOfYear: 1, index: 1, value: 0 }, { weekOfYear: 2, index: 1, value: 0 }, { weekOfYear: 3, index: 1, value: 5634.42 }, { weekOfYear: 4, index: 1, value: 0 }, { weekOfYear: 5, index: 1, value: 0 }, { weekOfYear: 6, index: 1, value: 3094.25 }, { weekOfYear: 7, index: 1, value: 3485.07 }, { weekOfYear: 8, index: 1, value: 2657.08 }, { weekOfYear: 9, index: 1, value: 1652.99 }, { weekOfYear: 10, index: 1, value: 0 }, { weekOfYear: 11, index: 1, value: 479.69 }, { weekOfYear: 12, index: 1, value: 1248.69 }, { weekOfYear: 13, index: 1, value: 0 }, { weekOfYear: 14, index: 1, value: 602.42 }, { weekOfYear: 15, index: 1, value: 0 }, { weekOfYear: 16, index: 1, value: 0 }, { weekOfYear: 17, index: 1, value: 1165.54 }, { weekOfYear: 18, index: 1, value: 754.35 }, { weekOfYear: 19, index: 1, value: 2401.24 }, { weekOfYear: 20, index: 1, value: 0 }, { weekOfYear: 21, index: 1, value: 0 }, { weekOfYear: 22, index: 1, value: 2615.16 }, { weekOfYear: 23, index: 1, value: 0 }, { weekOfYear: 24, index: 1, value: 1128.5 }, { weekOfYear: 25, index: 1, value: 0 }, { weekOfYear: 26, index: 1, value: 0 }, { weekOfYear: 27, index: 1, value: 2339.65 }, { weekOfYear: 28, index: 1, value: 0 }, { weekOfYear: 29, index: 1, value: 0 }, { weekOfYear: 30, index: 1, value: 0 }, { weekOfYear: 31, index: 1, value: 0 }, { weekOfYear: 32, index: 1, value: 0 }, { weekOfYear: 33, index: 1, value: 759.95 }, { weekOfYear: 34, index: 1, value: 0 }, { weekOfYear: 35, index: 1, value: 2437.63 }]
    },
    {
      "name": "Tuesday",
      "data": [{ weekOfYear: 1, index: 1, value: 0 }, { weekOfYear: 2, index: 1, value: 2029.42 }, { weekOfYear: 3, index: 1, value: 0 }, { weekOfYear: 4, index: 1, value: 8578.78 }, { weekOfYear: 5, index: 1, value: 2759.93 }, { weekOfYear: 6, index: 1, value: 0 }, { weekOfYear: 7, index: 1, value: 1588.42 }, { weekOfYear: 8, index: 1, value: 0 }, { weekOfYear: 9, index: 1, value: 4109.26 }, { weekOfYear: 10, index: 1, value: 2970.49 }, { weekOfYear: 11, index: 1, value: 0 }, { weekOfYear: 12, index: 1, value: 0 }, { weekOfYear: 13, index: 1, value: 2398.82 }, { weekOfYear: 14, index: 1, value: 0 }, { weekOfYear: 15, index: 1, value: 1519.93 }, { weekOfYear: 16, index: 1, value: 4379.09 }, { weekOfYear: 17, index: 1, value: 3485.8 }, { weekOfYear: 18, index: 1, value: 0 }, { weekOfYear: 19, index: 1, value: 0 }, { weekOfYear: 20, index: 1, value: 0 }, { weekOfYear: 21, index: 1, value: 0 }, { weekOfYear: 22, index: 1, value: 3214.08 }, { weekOfYear: 23, index: 1, value: 0 }, { weekOfYear: 24, index: 1, value: 0 }, { weekOfYear: 25, index: 1, value: 885.4 }, { weekOfYear: 26, index: 1, value: 0 }, { weekOfYear: 27, index: 1, value: 0 }, { weekOfYear: 28, index: 1, value: 0 }, { weekOfYear: 29, index: 1, value: 0 }, { weekOfYear: 30, index: 1, value: 0 }, { weekOfYear: 31, index: 1, value: 2496.15 }, { weekOfYear: 32, index: 1, value: 0 }, { weekOfYear: 33, index: 1, value: 0 }, { weekOfYear: 34, index: 1, value: 1588.91 }, { weekOfYear: 35, index: 1, value: 814.53 }]
    },
    {
      "name": "Wednesday",
      "data": [{ weekOfYear: 1, index: 1, value: 525.98 }, { weekOfYear: 2, index: 1, value: 1939.65 }, { weekOfYear: 3, index: 1, value: 0 }, { weekOfYear: 4, index: 1, value: 0 }, { weekOfYear: 5, index: 1, value: 0 }, { weekOfYear: 6, index: 1, value: 1972.11 }, { weekOfYear: 7, index: 1, value: 0 }, { weekOfYear: 8, index: 1, value: 0 }, { weekOfYear: 9, index: 1, value: 998.3 }, { weekOfYear: 10, index: 1, value: 0 }, { weekOfYear: 11, index: 1, value: 2532.3 }, { weekOfYear: 12, index: 1, value: 0 }, { weekOfYear: 13, index: 1, value: 0 }, { weekOfYear: 14, index: 1, value: 4071.99 }, { weekOfYear: 15, index: 1, value: 1635.45 }, { weekOfYear: 16, index: 1, value: 4047.35 }, { weekOfYear: 17, index: 1, value: 0 }, { weekOfYear: 18, index: 1, value: 2425.46 }, { weekOfYear: 19, index: 1, value: 0 }, { weekOfYear: 20, index: 1, value: 887.92 }, { weekOfYear: 21, index: 1, value: 4103.06 }, { weekOfYear: 22, index: 1, value: 2570.18 }, { weekOfYear: 23, index: 1, value: 0 }, { weekOfYear: 24, index: 1, value: 2104.88 }, { weekOfYear: 25, index: 1, value: 0 }, { weekOfYear: 26, index: 1, value: 0 }, { weekOfYear: 27, index: 1, value: 2968.91 }, { weekOfYear: 28, index: 1, value: 803.77 }, { weekOfYear: 29, index: 1, value: 1172.72 }, { weekOfYear: 30, index: 1, value: 1861.18 }, { weekOfYear: 31, index: 1, value: 0 }, { weekOfYear: 32, index: 1, value: 0 }, { weekOfYear: 33, index: 1, value: 1324.52 }, { weekOfYear: 34, index: 1, value: 0 }, { weekOfYear: 35, index: 1, value: 1825.66 }]
    },
    {
      "name": "Thursday",
      "data": [{ weekOfYear: 1, index: 1, value: 0 }, { weekOfYear: 2, index: 1, value: 0 }, { weekOfYear: 3, index: 1, value: 0 }, { weekOfYear: 4, index: 1, value: 2304.46 }, { weekOfYear: 5, index: 1, value: 0 }, { weekOfYear: 6, index: 1, value: 0 }, { weekOfYear: 7, index: 1, value: 688.42 }, { weekOfYear: 8, index: 1, value: 0 }, { weekOfYear: 9, index: 1, value: 0 }, { weekOfYear: 10, index: 1, value: 0 }, { weekOfYear: 11, index: 1, value: 0 }, { weekOfYear: 12, index: 1, value: 0 }, { weekOfYear: 13, index: 1, value: 0 }, { weekOfYear: 14, index: 1, value: 0 }, { weekOfYear: 15, index: 1, value: 0 }, { weekOfYear: 16, index: 1, value: 0 }, { weekOfYear: 17, index: 1, value: 1193.36 }, { weekOfYear: 18, index: 1, value: 0 }, { weekOfYear: 19, index: 1, value: 0 }, { weekOfYear: 20, index: 1, value: 1526.11 }, { weekOfYear: 21, index: 1, value: 4799.67 }, { weekOfYear: 22, index: 1, value: 978.35 }, { weekOfYear: 23, index: 1, value: 0 }, { weekOfYear: 24, index: 1, value: 2804.05 }, { weekOfYear: 25, index: 1, value: 4677.93 }, { weekOfYear: 26, index: 1, value: 824.56 }, { weekOfYear: 27, index: 1, value: 0 }, { weekOfYear: 28, index: 1, value: 0 }, { weekOfYear: 29, index: 1, value: 2953.47 }, { weekOfYear: 30, index: 1, value: 0 }, { weekOfYear: 31, index: 1, value: 0 }, { weekOfYear: 32, index: 1, value: 868.26 }, { weekOfYear: 33, index: 1, value: 0 }, { weekOfYear: 34, index: 1, value: 808.19 }, { weekOfYear: 35, index: 1, value: 0 }]
    },
    {
      "name": "Friday",
      "data": [{ weekOfYear: 1, index: 1, value: 0 }, { weekOfYear: 2, index: 1, value: 0 }, { weekOfYear: 3, index: 1, value: 1491.71 }, { weekOfYear: 4, index: 1, value: 0 }, { weekOfYear: 5, index: 1, value: 0 }, { weekOfYear: 6, index: 1, value: 1183.45 }, { weekOfYear: 7, index: 1, value: 0 }, { weekOfYear: 8, index: 1, value: 1460.67 }, { weekOfYear: 9, index: 1, value: 0 }, { weekOfYear: 10, index: 1, value: 0 }, { weekOfYear: 11, index: 1, value: 0 }, { weekOfYear: 12, index: 1, value: 0 }, { weekOfYear: 13, index: 1, value: 0 }, { weekOfYear: 14, index: 1, value: 0 }, { weekOfYear: 15, index: 1, value: 4675.92 }, { weekOfYear: 16, index: 1, value: 1426.13 }, { weekOfYear: 17, index: 1, value: 0 }, { weekOfYear: 18, index: 1, value: 2879.08 }, { weekOfYear: 19, index: 1, value: 2211.24 }, { weekOfYear: 20, index: 1, value: 1364.9 }, { weekOfYear: 21, index: 1, value: 2830.44 }, { weekOfYear: 22, index: 1, value: 0 }, { weekOfYear: 23, index: 1, value: 0 }, { weekOfYear: 24, index: 1, value: 0 }, { weekOfYear: 25, index: 1, value: 2329.14 }, { weekOfYear: 26, index: 1, value: 1008.21 }, { weekOfYear: 27, index: 1, value: 0 }, { weekOfYear: 28, index: 1, value: 0 }, { weekOfYear: 29, index: 1, value: 2805.05 }, { weekOfYear: 30, index: 1, value: 0 }, { weekOfYear: 31, index: 1, value: 2343.76 }, { weekOfYear: 32, index: 1, value: 0 }, { weekOfYear: 33, index: 1, value: 2189.16 }, { weekOfYear: 34, index: 1, value: 0 }, { weekOfYear: 35, index: 1, value: 956.62 }]
    },
    {
      "name": "Saturday",
      "data": [{ weekOfYear: 1, index: 1, value: 0 }, { weekOfYear: 2, index: 1, value: 0 }, { weekOfYear: 3, index: 1, value: 2998.9 }, { weekOfYear: 4, index: 1, value: 683.98 }, { weekOfYear: 5, index: 1, value: 814.08 }, { weekOfYear: 6, index: 1, value: 1590.59 }, { weekOfYear: 7, index: 1, value: 0 }, { weekOfYear: 8, index: 1, value: 0 }, { weekOfYear: 9, index: 1, value: 0 }, { weekOfYear: 10, index: 1, value: 0 }, { weekOfYear: 11, index: 1, value: 0 }, { weekOfYear: 12, index: 1, value: 0 }, { weekOfYear: 13, index: 1, value: 0 }, { weekOfYear: 14, index: 1, value: 4903.31 }, { weekOfYear: 15, index: 1, value: 0 }, { weekOfYear: 16, index: 1, value: 0 }, { weekOfYear: 17, index: 1, value: 0 }, { weekOfYear: 18, index: 1, value: 0 }, { weekOfYear: 19, index: 1, value: 0 }, { weekOfYear: 20, index: 1, value: 0 }, { weekOfYear: 21, index: 1, value: 861.61 }, { weekOfYear: 22, index: 1, value: 2801.46 }, { weekOfYear: 23, index: 1, value: 1057.06 }, { weekOfYear: 24, index: 1, value: 0 }, { weekOfYear: 25, index: 1, value: 0 }, { weekOfYear: 26, index: 1, value: 0 }, { weekOfYear: 27, index: 1, value: 0 }, { weekOfYear: 28, index: 1, value: 1664.41 }, { weekOfYear: 29, index: 1, value: 0 }, { weekOfYear: 30, index: 1, value: 0 }, { weekOfYear: 31, index: 1, value: 0 }, { weekOfYear: 32, index: 1, value: 0 }, { weekOfYear: 33, index: 1, value: 2155.29 }, { weekOfYear: 34, index: 1, value: 0 }, { weekOfYear: 35, index: 1, value: 0 }]
    },
    {
      "name": "Sunday",
      "data": [{ weekOfYear: 1, index: 1, value: 0 }, { weekOfYear: 2, index: 1, value: 4905.9 }, { weekOfYear: 3, index: 1, value: 0 }, { weekOfYear: 4, index: 1, value: 0 }, { weekOfYear: 5, index: 1, value: 0 }, { weekOfYear: 6, index: 1, value: 2137.76 }, { weekOfYear: 7, index: 1, value: 0 }, { weekOfYear: 8, index: 1, value: 5508.78 }, { weekOfYear: 9, index: 1, value: 0 }, { weekOfYear: 10, index: 1, value: 3427.66 }, { weekOfYear: 11, index: 1, value: 3779.93 }, { weekOfYear: 12, index: 1, value: 859.88 }, { weekOfYear: 13, index: 1, value: 0 }, { weekOfYear: 14, index: 1, value: 2209.38 }, { weekOfYear: 15, index: 1, value: 680.85 }, { weekOfYear: 16, index: 1, value: 0 }, { weekOfYear: 17, index: 1, value: 0 }, { weekOfYear: 18, index: 1, value: 0 }, { weekOfYear: 19, index: 1, value: 0 }, { weekOfYear: 20, index: 1, value: 0 }, { weekOfYear: 21, index: 1, value: 2975.17 }, { weekOfYear: 22, index: 1, value: 0 }, { weekOfYear: 23, index: 1, value: 0 }, { weekOfYear: 24, index: 1, value: 0 }, { weekOfYear: 25, index: 1, value: 451.36 }, { weekOfYear: 26, index: 1, value: 0 }, { weekOfYear: 27, index: 1, value: 0 }, { weekOfYear: 28, index: 1, value: 827.14 }, { weekOfYear: 29, index: 1, value: 0 }, { weekOfYear: 30, index: 1, value: 0 }, { weekOfYear: 31, index: 1, value: 0 }, { weekOfYear: 32, index: 1, value: 2006.94 }, { weekOfYear: 33, index: 1, value: 0 }, { weekOfYear: 34, index: 1, value: 0 }, { weekOfYear: 35, index: 1, value: 1984.23 }]
    },
  ];

// Helper function to convert week number to month name
const getMonthFromWeek = (weekNumber: number): string => {
  if (weekNumber >= 1 && weekNumber <= 4) return 'Jan';
  if (weekNumber >= 5 && weekNumber <= 8) return 'Feb';
  if (weekNumber >= 9 && weekNumber <= 13) return 'Mar';
  if (weekNumber >= 14 && weekNumber <= 17) return 'Apr';
  if (weekNumber >= 18 && weekNumber <= 22) return 'May';
  if (weekNumber >= 23 && weekNumber <= 26) return 'Jun';
  if (weekNumber >= 27 && weekNumber <= 30) return 'Jul';
  if (weekNumber >= 31 && weekNumber <= 35) return 'Aug';
  return '';
};

// Custom tick formatter that shows months at specific week positions
const formatXAxisTick = (value: any): string => {
  const weekNum = Number(value);
  // Show month names only at the first week of each month
  if ([1, 5, 9, 14, 18, 23, 27, 31].includes(weekNum)) {
    return getMonthFromWeek(weekNum);
  }
  return '';
};

export const RevenueHeatmapV2 = () => {
  return (
    <Card className="w-full h-full">
      <CardContent className="pt-6 flex flex-col h-full">
        <BubbleChart
          data={data}
          useGradient={true}
          rowHeight={60}
          xAxisTickFormatter={formatXAxisTick}
          showBottomBorder={false}
          xAxisFontSize={12}
        />
      </CardContent>
    </Card>
  );
};
