"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  DollarSign, 
  Gift, 
  TrendingUp, 
  CreditCard, 
  Calendar,
  Target,
  GraduationCap,
  Sparkles
} from "lucide-react";

export default function FinalRecommendations() {
  const recommendations = [
    {
      icon: Users,
      title: "Flexible Staffing Model",
      description: "Hire a small core team of permanent employees and supplement with seasonal workers during peak periods. This will align payroll costs (currently 66% of expenses) with revenue fluctuations.",
    },
    {
      icon: DollarSign,
      title: "Multi-Currency Investment Strategy",
      description: "Open investment accounts in multiple currencies and invest in short-term maturities or mutual funds to reduce foreign exchange fees (currently 9.5% of expenses).",
    },
    {
      icon: Gift,
      title: "Summer Vacation Packages",
      description: "Offer attractive package deals to non-business clientele during summer months to improve occupancy rates and offset the current revenue decline in June-July.",
    },
    {
      icon: TrendingUp,
      title: "Dynamic Pricing Strategy",
      description: "Implement demand-based pricing that adjusts rates around major events (Monaco GP, Easter) and during mid-week business travel periods to maximize revenue.",
    },
    {
      icon: CreditCard,
      title: "Strategic Cash Management",
      description: "Arrange credit lines for volatile months and maintain cash reserves during predictable high-revenue periods to smooth out seasonal cashflow challenges.",
    },
    {
      icon: Calendar,
      title: "Corporate Partnership Program",
      description: "Develop long-term agreements with corporate clients for guaranteed mid-week bookings, capitalizing on the 73.6% resort revenue concentration.",
    },
    {
      icon: Target,
      title: "Revenue Stream Diversification",
      description: "Expand beyond room bookings to include premium spa packages, event hosting, and conference facilities to reduce dependence on accommodation revenue.",
    },
    {
      icon: GraduationCap,
      title: "Forecasting Training Initiative",
      description: "Enhance finance team training on forecasting tools and techniques, as current user forecasts often worsen accuracy instead of improving it.",
    },
    {
      icon: Sparkles,
      title: "Tiered Service Offerings",
      description: "Create distinct service tiers for business vs. leisure clientele to better match offerings with customer expectations and optimize pricing strategies.",
    },
  ];

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {recommendations.map((rec, index) => {
        const Icon = rec.icon;
        return (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Icon className="size-5 text-primary" />
                </div>
                <CardTitle className="text-sm">{rec.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{rec.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

