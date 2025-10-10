"use client";

import CashFlowDrivers from "@/components/blocks/cash_flow_drivers";
import DayOfWeekRevenue from "@/components/blocks/day_of_week_revenue";
import IncomeWithHolidays from "@/components/blocks/income_with_holidays";
import RevenueExpenses from "@/components/blocks/revenue_expenses";
import RevenueHeatmap from "@/components/blocks/revenue_heatmap";
import { RevenueHeatmapV2 } from "@/components/blocks/revenue_heatmap_v2";
import ForecastAnalysis from "@/components/blocks/forecast_analysis";
import FinalRecommendations from "@/components/blocks/final_recommendations";
import BalanceReconciliationChart from "@/components/blocks/balance_reconciliation_chart";
import UserForecastStatusBreakdown from "@/components/blocks/user_forecast_status_breakdown";
import SystemForecastCoverageGrid from "@/components/blocks/system_forecast_coverage_grid";
import TransactionQualityMetrics from "@/components/blocks/transaction_quality_metrics";
import ToolsMethodology from "@/components/blocks/tools_methodology";
import { LineChart } from "@/components/charts/LineChart";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarInfo } from "@/components/ui/avatar-info";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { Spotlight } from "@/components/ui/spotlight-new";
import { AvatarFallback } from "@radix-ui/react-avatar";
import {
  ArrowRightIcon,
  TrendingUp,
  Calendar,
  Users,
  Lightbulb,
  TreePalm,
  PiggyBank,
  Badge,
} from "lucide-react";
import Image from "next/image";
import { motion } from "motion/react";
import LightRays from "@/components/ui/LightRays";
import Magnet from "@/components/ui/magnet";

export default function HomePage() {
  // Cash flow drivers data from Python analysis
  const cashFlowDrivers = {
    expenses: {
      Payroll: {
        avg: 40410.91,
        share: 66.26,
        data: [
          32649.74, 29710.32, 49829.74, 52613.36, 40464.44, 41202.42, 46288.0,
          30728.25,
        ],
      },
      Tax: {
        avg: 9800.97,
        share: 16.06,
        data: [
          9771.65, 10052.17, 11745.89, 11405.08, 8674.07, 9607.59, 6321.82,
          10837.49,
        ],
      },
      FX: {
        avg: 5769.26,
        share: 9.45,
        data: [
          7832.74, 4999.63, 6480.44, 4742.14, 6217.9, 5982.84, 4275.71, 5622.66,
        ],
      },
      Investment: {
        avg: 2754.44,
        share: 4.51,
        data: [
          3904.26, 2769.5, 2932.03, 814.6, 2282.34, 2231.32, 3490.73, 3610.73,
        ],
      },
      Insurance: {
        avg: 1132.45,
        share: 1.86,
        data: [
          886.05, 1182.29, 1622.73, 1015.38, 1043.56, 1025.04, 953.69, 1330.86,
        ],
      },
      Maintenance: {
        avg: 1132.02,
        share: 1.85,
        data: [
          1437.41, 1570.15, 1017.61, 896.78, 1077.97, 1257.97, 1170.0, 628.3,
        ],
      },
    },
    revenue: {
      "Resort Revenue": {
        avg: 27739.38,
        share: 73.64,
        data: [
          33853.13, 32941.23, 18299.88, 38573.91, 39019.67, 19610.74, 17552.8,
          22063.65,
        ],
      },
      "Tax Refund": {
        avg: 6249.7,
        share: 16.59,
        data: [
          7059.11, 5252.23, 8035.16, 4587.16, 4247.73, 6875.61, 6985.87,
          6954.75,
        ],
      },
      "Investment Income": {
        avg: 3685.75,
        share: 9.78,
        data: [
          3367.12, 3103.59, 2644.63, 6276.67, 3852.89, 2840.91, 3088.56,
          4311.61,
        ],
      },
    },
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center pb-32 bg-background relative">
      {/* Avatar Info - Fixed Top Left */}
      <div className="fixed top-12 left-10 z-50">
        <AvatarInfo />
      </div>

      <div className="relative min-h-screen flex flex-col gap-2 mb-12 w-full text-center justify-center items-center overflow-hidden">
        {/* <Spotlight
          gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(210, 100%, 85%, .08) 0, hsla(210, 100%, 55%, .02) 50%, hsla(210, 100%, 45%, 0) 80%)"
          gradientSecond=""
          gradientThird=""
        /> */}
        <div className="absolute inset-0 z-0">
          <LightRays
            raysOrigin="top-center"
            raysColor="#ffffff"
            raysSpeed={1.5}
            lightSpread={0.8}
            rayLength={1.2}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0.1}
            distortion={0.05}
            className="custom-rays"
          />
        </div>

        <h1 className="text-5xl lg:text-7xl relative z-50">
          ResortChain Report
          <motion.div
            className="absolute -top-16 -right-16 z-50"
            animate={{
              y: [0, -8, 0, 8, 0],
              x: [0, 8, 0, -8, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          >
            <div className="relative z-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#FF823A"
                className="size-16"
              >
                <path
                  fillRule="evenodd"
                  d="M5.337 21.718a6.707 6.707 0 0 1-.533-.074.75.75 0 0 1-.44-1.223 3.73 3.73 0 0 0 .814-1.686c.023-.115-.022-.317-.254-.543C3.274 16.587 2.25 14.41 2.25 12c0-5.03 4.428-9 9.75-9s9.75 3.97 9.75 9c0 5.03-4.428 9-9.75 9-.833 0-1.643-.097-2.417-.279a6.721 6.721 0 0 1-4.246.997Z"
                  clipRule="evenodd"
                />
              </svg>
              <Image
                src="/palm_logo.jpeg"
                alt="Palm"
                width={40}
                height={40}
                className="size-7 absolute top-4.5 right-4.5"
              />
            </div>
          </motion.div>
        </h1>

        <p className="text-md lg:text-xl text-muted-foreground relative z-50">
          A Palm Case Study
        </p>
        <Magnet padding={100} disabled={false} magnetStrength={10}>
          <Button
            className="w-fit mt-8 py-6 px-12 relative z-50"
            variant="secondary"
            onClick={() => {
              document
                .getElementById("content")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Start Reading{" "}
          </Button>
        </Magnet>
      </div>
      <section className="w-full max-w-3xl" id="content">
        <div className="w-full gap-4 flex flex-col">
          <div className="w-full flex flex-col gap-2">
            <h2 className="text-2xl lg:text-3xl">
              Monthly Expenses vs Revenue
            </h2>
            <p className="text-md text-muted-foreground">
              The monthly financial data reveals a concerning operational
              pattern: the resort operates at a net loss in all months, with
              March particularly alarming at just €28,980 in revenue against
              over €73,000 in expenses. Revenue swings wildly from €49,438 in
              April to €27,627 in July—nearly 80% variance—yet total expenses
              remain stubbornly fixed around €71-73k regardless of business
              levels. Payroll dominates expenses at €29-52k monthly, but shows
              no flexibility to match demand, creating devastating losses during
              slow periods. The resort appears to operate with completely rigid
              costs despite highly seasonal revenue, suggesting critical needs
              for dynamic staffing models, better cost controls, and improved
              cash flow management to survive the volatile monthly swings.
            </p>
          </div>
          <RevenueExpenses />

          <div className="w-full flex flex-col gap-4 mt-12">
            <div className="w-full flex flex-col gap-2">
              <h2 className="text-2xl lg:text-3xl">Cash Flow Drivers</h2>
              <p className="text-md text-muted-foreground">
                Understanding the components of revenue and expenses is critical
                for financial health. Payroll dominates expenses at 66.3%,
                followed by tax payments at 16.1%. Resort revenue constitutes
                73.6% of total income, supplemented by tax refunds (16.6%) and
                investment income (9.8%). These spark charts show monthly trends
                for each category throughout 2025.
              </p>
            </div>

            <div className="w-full flex flex-col gap-2 mt-4">
              <h3 className="text-xl lg:text-2xl">
                Average Monthly Expenses and Revenue by Category
              </h3>
              <CashFlowDrivers data={cashFlowDrivers} />
            </div>
          </div>

          <div className="w-full flex flex-col gap-4 mt-12">
            <div className="w-full flex flex-col gap-2">
              <h2 className="text-2xl lg:text-3xl">Business Model Analysis</h2>
              <p className="text-md text-muted-foreground">
                Based on the cash flow drivers analysis, ResortChain
                International seems to operate under all-inclusive package deals
                offered primarily to business clients. The main revenue is
                generated from the resort revenue, which constitutes 73.6% of
                total income, supplemented by tax refunds (16.6%) and investment
                income (9.8%).
              </p>
              <div className="w-full flex flex-row items-center gap-8 mt-4">
                <div className="flex flex-col items-center justify-center gap-2">
                  <TreePalm
                    strokeWidth={0.5}
                    className="size-32 p-8 border border-border rounded-lg"
                  />
                  <p className="text-md text-muted-foreground">
                    Resort Revenue
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center gap-2">
                  <PiggyBank
                    strokeWidth={0.5}
                    className="size-32 p-8 border border-border rounded-lg"
                  />
                  <p className="text-md text-muted-foreground">
                    Investment Income
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col gap-4 mt-12">
            <div className="w-full flex flex-col gap-2">
              <h2 className="text-2xl lg:text-3xl">
                Financial Health Analysis
              </h2>
              <p className="text-md text-muted-foreground">
                We don&apos;t have enough data to make a definitive financial
                health analysis. From the current data, we can see that the
                resort has declining cash position by almost 30% since the
                beginning of the year. The costs are substantially and
                consistently higher than the revenue. If that trend is a
                continuation of previous months / years, then we can come to a
                conclusion that the resort is not financially healthy. However,
                in the scenario that the hotel just opened and is still in the
                ramp-up phase, then it is expected to have negative cash flow
                for the first few months.
              </p>
            </div>
          </div>

          <div className="w-full flex flex-col gap-4 mt-12">
            <div className="w-full flex flex-col gap-2">
              <h2 className="text-2xl lg:text-3xl">
                Revenue Patterns Analysis
              </h2>
              <p className="text-md text-muted-foreground">
                The heatmap reveals distinct seasonal and weekly patterns
                throughout 2024. May shows the strongest performance with
                consistent high-revenue days, particularly around the Monaco F1
                Grand Prix weekend. Mid-week days (Tuesday-Thursday)
                consistently outperform weekends across most months, indicating
                a business-focused clientele. Notable dips appear in June-July,
                suggesting shoulder season challenges that require strategic
                intervention.
              </p>
            </div>
            <div className="w-full flex flex-col gap-2 mt-8">
              <h3 className="text-xl lg:text-2xl">
                Revenue Heatmap by Day of Week
              </h3>
              <p className="text-md text-muted-foreground mb-4">
                The revenue is distributed primarily during the week days, with
                a peak on Tuesday.
              </p>
              <RevenueHeatmapV2 />
            </div>
            <div className="w-full flex flex-col gap-2 mt-8">
              <h3 className="text-xl lg:text-2xl">
                Average Revenue by Day of Week
              </h3>
              <p className="text-md text-muted-foreground mb-4">
                Monday, Tuesday, and Wednesday are the highest revenue days
              </p>
              <DayOfWeekRevenue />
            </div>
          </div>

          <div className="w-full flex flex-col gap-4 mt-12">
            <div className="w-full flex flex-col gap-2">
              <h2 className="text-2xl lg:text-3xl">
                Daily Revenue with Holiday Correlations
              </h2>
              <p className="text-md text-muted-foreground">
                Overlaying French bank holidays reveals critical insights. The
                highest single-day revenue (€8,969 on January 21) occurs on a
                Tuesday, which is not a holiday or weekend, indicating that
                there was a major conference or business retreat. In all other
                major French holidays, the revenue is minimal. Orthodox and
                Catholic Easter as well as Monaco GP weekends drive significant
                spikes, while the summer months show volatility despite holiday
                periods.
              </p>
            </div>
            <IncomeWithHolidays />

            <div className="w-full flex flex-col gap-2">
              <h2 className="text-xl lg:text-2xl mt-12">
                ResortChain Customer Profiles
              </h2>
              <p className="text-md text-muted-foreground">
                The data reveals a mixed customer personas with both leisure and
                business clientele. The highest revenue days are around major
                events and holidays, while the summer months show volatility.
                The data also shows that the business is not insulated from
                local holiday cycles. My personal guess would be that the hotel
                is located in the South of France, close to the border with
                Italy and Monaco.
              </p>
              <div className="space-y-6 mt-4">
                <Callout title="Event-Driven Demand" variant="default">
                  Revenue peaks correlate with major events (Monaco GP, Easter).
                  Consider premium pricing strategies around confirmed events.
                </Callout>

                <Callout title="Business Travel Focus" variant="default">
                  Mid-week peaks suggest strong business clientele. Target
                  corporate packages and weekday promotions for consistent
                  revenue.
                </Callout>

                <Callout title="Shoulder Season Strategy" variant="default">
                  June and early July show decline. Implement targeted
                  promotions or packages to fill capacity during slower periods.
                </Callout>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col gap-4 mt-16 pt-16 border-t">
            <div className="w-full flex flex-col gap-2">
              <h2 className="text-2xl lg:text-3xl">Forecast Analysis</h2>
              <p className="text-md text-muted-foreground">
                Comprehensive analysis of forecast accuracy comparing multiple
                forecasting methods including ML models, statistical approaches,
                foundation models, and user-generated forecasts. The unified
                forecast represents the best available system forecast, while
                the unified forecast with user overrides incorporates verified
                manual predictions from the finance team.
              </p>
            </div>
            <ForecastAnalysis />
          </div>

          <div className="w-full flex flex-col gap-4 mt-16 pt-16 border-t">
            <div className="w-full flex flex-col gap-2">
              <h2 className="text-2xl lg:text-3xl">Final Recommendations</h2>
              <p className="text-md text-muted-foreground">
                Based on the comprehensive analysis of cash flow patterns,
                forecast accuracy, and operational challenges, here are
                strategic recommendations to improve financial performance and
                operational efficiency.
              </p>
            </div>
            <FinalRecommendations />
          </div>

          <div className="w-full flex flex-col gap-4 mt-16 pt-16 border-t">
            <div className="w-full flex flex-col gap-2">
              <h2 className="text-2xl lg:text-3xl">Data Quality Assessment</h2>
              <p className="text-md text-muted-foreground">
                Comprehensive analysis of data quality, completeness, and
                consistency across transactions, balances, and forecasts.
                Understanding data quality is essential for making confident
                business decisions and identifying areas for process
                improvement.
              </p>
            </div>

            <div className="w-full flex flex-col gap-2 mt-4">
              <h3 className="text-xl lg:text-2xl">Balance Reconciliation</h3>
              <p className="text-md text-muted-foreground mb-4">
                Monthly comparison between transaction-calculated balances and
                daily snapshots. Deviations indicate potential missing
                transactions or data inconsistencies.
              </p>
              <BalanceReconciliationChart />
            </div>

            <div className="w-full flex flex-col gap-2 mt-12">
              <h3 className="text-xl lg:text-2xl">User Forecast Quality</h3>
              <p className="text-md text-muted-foreground mb-4">
                Analysis of manually entered forecasts by the finance team,
                showing verification rates and data completeness.
              </p>
              <UserForecastStatusBreakdown />
            </div>

            <div className="w-full flex flex-col gap-2 mt-12">
              <h3 className="text-xl lg:text-2xl">System Forecast Coverage</h3>
              <p className="text-md text-muted-foreground mb-4">
                Coverage analysis for ML and statistical forecasts across
                categories, identifying gaps where predictions are missing.
              </p>
              <SystemForecastCoverageGrid />
            </div>

            <div className="w-full flex flex-col gap-2 mt-12">
              <h3 className="text-xl lg:text-2xl">Transaction Data Quality</h3>
              <p className="text-md text-muted-foreground mb-4">
                Detailed assessment of transaction data completeness, potential
                duplicates, and data distribution across categories.
              </p>
              <TransactionQualityMetrics />
            </div>
          </div>

          <div className="w-full flex flex-col gap-4 mt-16 pt-16 border-t">
            <div className="w-full flex flex-col gap-2">
              <h2 className="text-2xl lg:text-3xl">Tools & Methodology</h2>
              <p className="text-md text-muted-foreground">
                This comprehensive analysis was built using a modern stack of AI-powered tools and development frameworks. Here's a timeline of the tools and methodologies that made this report possible.
              </p>
            </div>
            <ToolsMethodology />
          </div>

          <div className="w-full flex flex-col gap-4 mt-16 pt-16 border-t">
            <div className="w-full flex flex-col gap-2">
              <h2 className="text-2xl lg:text-3xl">Fun Section</h2>
              <p className="text-md text-muted-foreground">
                Tired of reading through all those numbers and transactions?
                Take a break and restore your brain capacity with these memes
                below.
              </p>
            </div>

            <div className="flex flex-col gap-6 mt-4">
              {/* First image alone in its own row */}
              <div className="border rounded-lg overflow-hidden bg-card hover:shadow-lg transition-shadow">
                <Image
                  src="/memes/meme_1.png"
                  alt="Finance Meme 1"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
              </div>

              {/* Second and third images together in a row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 border rounded-lg overflow-hidden bg-card hover:shadow-lg transition-shadow">
                  <Image
                    src="/memes/meme_2.png"
                    alt="Finance Meme 2"
                    width={600}
                    height={400}
                    className="w-full h-auto"
                  />
                </div>
                <div className="md:col-span-1 border rounded-lg overflow-hidden bg-card hover:shadow-lg transition-shadow">
                  <Image
                    src="/memes/meme_3.png"
                    alt="Finance Meme 3"
                    width={300}
                    height={400}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
