"use client";

import IncomeWithHolidays from "@/components/blocks/income_with_holidays";
import RevenueExpenses from "@/components/blocks/revenue_expenses";
import RevenueHeatmap from "@/components/blocks/revenue_heatmap";
import { RevenueHeatmapV2 } from "@/components/blocks/revenue_heatmap_v2";
import { LineChart } from "@/components/charts/LineChart";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { AvatarFallback } from "@radix-ui/react-avatar";
import {
  ArrowRightIcon,
  TrendingUp,
  Calendar,
  Users,
  Lightbulb,
} from "lucide-react";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center pb-32 bg-background p-4 relative">
      <section className="w-full max-w-3xl">
        <div className="min-h-screen flex flex-col gap-2 mb-12 text-center justify-center items-center">
          <h1 className="text-5xl lg:text-7xl">ResortChain Report</h1>
          <p className="text-md lg:text-xl text-muted-foreground">
            A Palm Case Study
          </p>
          <Button className="w-fit mt-4 px-8" variant="outline">
            Get Started
          </Button>
        </div>

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
            <RevenueHeatmapV2 />
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
              events and holidays, while the summer months show volatility. The
              data also shows that the business is not insulated from local
              holiday cycles. My personal guess would be that the hotel is
              located in the South of France, close to the border with Italy and
              Monaco.
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
                June and early July show decline. Implement targeted promotions
                or packages to fill capacity during slower periods.
              </Callout>
            </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
