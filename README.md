# 🌴 Palm Case Study - ResortChain Financial Analysis

A comprehensive financial analysis dashboard for ResortChain International, built as a case study for Palm's Solution Engineer role. This project demonstrates end-to-end data analysis, from exploratory data analysis in Python to an interactive web dashboard showcasing insights and recommendations.

## 📋 Case Study Overview

**Client**: ResortChain International  
**Scope**: Luxury resorts across Europe (France, Italy, Spain)  
**Objective**: Analyze French bank statement data to understand cash flow patterns and identify optimization opportunities

### Data Provided

- **Transactions**: Historical transaction data (January - August 2025)
- **Balances**: Daily balance snapshots
- **System Forecasts**: ML-generated forecasts for various cash flow categories
- **User Forecasts**: Manual forecasts from the finance team

### Analysis Goals

1. **Business Understanding**: Infer business model and identify major cash flow drivers
2. **Pattern Discovery**: Uncover seasonal trends and cyclical behaviors
3. **Forecast Analysis**: Compare system forecasts vs. actual performance
4. **Data Quality**: Assess data integrity and identify anomalies
5. **Recommendations**: Provide actionable insights for financial optimization

## 🎯 Key Features

### Analysis Dashboard
- ✅ **Interactive financial visualizations** using modern charting libraries
- ✅ **Cash flow driver analysis** with detailed breakdowns by category
- ✅ **Forecast accuracy metrics** comparing system vs. user predictions
- ✅ **Data quality assessments** with reconciliation and coverage grids
- ✅ **Seasonal pattern analysis** including day-of-week and holiday impacts
- ✅ **Actionable recommendations** based on comprehensive data analysis

### Technical Implementation
- ✅ **Python data analysis** with Pandas, NumPy, and Plotly
- ✅ **Next.js 15 web application** with modern React patterns
- ✅ **Component-based architecture** for reusable visualizations
- ✅ **Responsive design** optimized for all screen sizes
- ✅ **API routes** for serving processed data
- ✅ **Custom UI components** with shadcn/ui and Tailwind CSS

## 🏗️ Tech Stack

### Data Analysis
- **Python 3.x** - Core data processing
- **Pandas & NumPy** - Data manipulation and analysis
- **Plotly** - Interactive visualizations in notebooks

### Web Application
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Styling
- **[shadcn/ui](https://ui.shadcn.com/)** - Component library
- **[Framer Motion](https://www.framer.com/motion/)** - Animations
- **[Recharts](https://recharts.org/)** - Chart components

## 📁 Project Structure

```
palm-case-study/
├── scripts/
│   ├── main.ipynb                          # 🔬 Main analysis notebook
│   ├── main_backup.ipynb                   # Backup of analysis
│   ├── datasets/
│   │   ├── raw/                            # Source data (CSV files)
│   │   ├── data_quality/                   # Data quality metrics (JSON)
│   │   ├── forecast_analysis/              # Forecast comparison data
│   │   └── extra_datasets/                 # Holiday & revenue data
│   └── NOTEBOOK_REORGANIZATION_SUMMARY.md  # Analysis structure docs
│
├── app/
│   ├── page.tsx                            # 🏠 Main dashboard page
│   ├── api/                                # API routes for data
│   │   ├── data-quality/                   # Data quality endpoints
│   │   ├── forecast/                       # Forecast analysis endpoints
│   │   ├── forecast-accuracy/
│   │   ├── forecast-insights/
│   │   └── forecast-monthly/
│   └── globals.css                         # Global styles
│
├── components/
│   ├── blocks/                             # 📊 Feature-rich analysis blocks
│   │   ├── cash_flow_drivers.tsx           # Cash flow breakdown
│   │   ├── revenue_expenses.tsx            # Revenue vs expenses
│   │   ├── revenue_heatmap_v2.tsx          # Daily revenue patterns
│   │   ├── day_of_week_revenue.tsx         # Weekly seasonality
│   │   ├── income_with_holidays.tsx        # Holiday impact analysis
│   │   ├── forecast_analysis.tsx           # Forecast comparison
│   │   ├── balance_reconciliation_chart.tsx # Balance validation
│   │   ├── transaction_quality_metrics.tsx  # Transaction data quality
│   │   ├── system_forecast_coverage_grid.tsx # Forecast coverage
│   │   ├── user_forecast_status_breakdown.tsx # User forecast stats
│   │   ├── final_recommendations.tsx       # Strategic recommendations
│   │   └── tools_methodology.tsx           # Methodology & tools
│   │
│   ├── charts/                             # 📈 Reusable chart components
│   │   ├── LineChart.tsx                   # Time series visualizations
│   │   ├── BarChart.tsx                    # Categorical comparisons
│   │   ├── ComboChart.tsx                  # Multi-axis charts
│   │   ├── DonutChart.tsx                  # Proportional data
│   │   ├── Heatmap.tsx                     # Matrix visualizations
│   │   ├── BubbleChart.tsx                 # Multi-dimensional data
│   │   └── SparkChart.tsx                  # Compact trend indicators
│   │
│   └── ui/                                 # 🎨 UI primitives & components
│       ├── avatar.tsx, avatar-info.tsx     # User avatars
│       ├── badge.tsx, button.tsx           # Interactive elements
│       ├── card.tsx, callout.tsx           # Content containers
│       ├── chart.tsx                       # Chart wrapper
│       ├── table.tsx                       # Data tables
│       ├── spotlight-new.tsx               # Hero spotlight effect
│       ├── LightRays.tsx, magnet.tsx       # Visual effects
│       ├── BubbleMenu.tsx, StaggeredMenu.tsx # Navigation
│       └── [other ui components]           # Form inputs, dialogs, etc.
│
└── lib/
    ├── utils.ts                            # Utility functions
    ├── chartUtils.ts                       # Chart helpers
    └── redis.ts                            # Data storage (if needed)
```

## 🔬 Key Analysis Files

### `scripts/main.ipynb` 
The comprehensive Jupyter notebook containing:
- Data loading and preprocessing
- Exploratory data analysis (EDA)
- Cash flow pattern identification
- Forecast accuracy calculations
- Data quality assessments
- Statistical analysis and visualizations
- Export of processed datasets for the web dashboard

### `app/page.tsx`
The main dashboard page that:
- Orchestrates all visualization components
- Presents the analysis narrative
- Provides interactive exploration of findings
- Showcases recommendations and insights

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.17.0 or later
- **pnpm** (recommended) or npm/yarn
- **Python** 3.8+ (for running analysis notebooks)
- **Jupyter** (for notebook analysis)

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd palm-case-study
   ```

2. **Install Node.js dependencies**:
   ```bash
   pnpm install
   ```

3. **Install Python dependencies** (for notebooks):
   ```bash
   cd scripts
   pip install pandas numpy plotly jupyter
   ```

4. **Run the development server**:
   ```bash
   pnpm dev
   ```

5. **Access the dashboard**:
   - Main site: [http://localhost:3000](http://localhost:3000)
   - View the complete analysis with all interactive visualizations

### Running the Analysis

To reproduce or modify the analysis:

```bash
cd scripts
jupyter notebook main.ipynb
```

The notebook contains all data processing, analysis, and visualization generation code.

## 📊 Component Library

### Block Components
High-level analysis components that combine multiple visualizations and insights:
- `cash_flow_drivers.tsx` - Breakdown of revenue/expense categories
- `forecast_analysis.tsx` - System vs. actual forecast comparison
- `revenue_heatmap_v2.tsx` - Daily revenue patterns with calendar view
- `balance_reconciliation_chart.tsx` - Data integrity validation
- `final_recommendations.tsx` - Strategic insights and next steps

### Chart Components
Reusable visualization primitives built on Recharts:
- `LineChart.tsx` - Trend analysis over time
- `BarChart.tsx` - Category comparisons
- `ComboChart.tsx` - Combined line/bar visualizations
- `DonutChart.tsx` - Proportional breakdowns
- `Heatmap.tsx` - Matrix data visualization
- `BubbleChart.tsx` - Multi-dimensional scatter plots
- `SparkChart.tsx` - Inline micro-charts

### UI Components
Design system components based on shadcn/ui:
- Cards, buttons, badges, tables
- Form inputs and dialogs
- Navigation components
- Visual effects (spotlight, light rays, magnets)

## 📈 Key Insights Delivered

1. **Cash Flow Patterns**: Identified key drivers (Payroll 66%, Tax 16%, FX 9%)
2. **Seasonality**: Discovered strong day-of-week and holiday effects
3. **Forecast Accuracy**: Compared system ML forecasts vs. finance team predictions
4. **Data Quality**: Assessed transaction completeness and balance reconciliation
5. **Optimization Opportunities**: Provided actionable recommendations for cash flow management

## 🎨 Design Philosophy

- **Data-Driven Storytelling**: Clear narrative flow from analysis to insights
- **Interactive Exploration**: Users can drill down into specific patterns
- **Visual Clarity**: Clean, modern design with focus on readability
- **Responsive**: Works seamlessly across devices
- **Performance**: Optimized loading and rendering of large datasets

## 🛠️ Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint
```

## 📝 Methodology

The analysis follows a structured approach:

1. **Data Exploration**: Understanding data structure and quality
2. **Business Context**: Inferring business model from transactions
3. **Pattern Analysis**: Statistical and visual analysis of trends
4. **Forecast Evaluation**: Comparing predictions to actuals
5. **Quality Assessment**: Data integrity and completeness checks
6. **Synthesis**: Combining insights into actionable recommendations

## 🎯 Case Study Deliverables

✅ **Analysis Summary**: Comprehensive findings and methodology (this dashboard)  
✅ **Code/Queries**: Python notebook with all analysis code (`main.ipynb`)  
✅ **Visualizations**: Interactive charts supporting the narrative  
✅ **Recommendations**: Top 5 strategic recommendations based on analysis  
✅ **Data Quality Report**: Assessment of data integrity and gaps  

## 🤖 AI Tooling

This project leverages modern AI tools for development:
- **Cursor AI**: Code generation and refactoring
- **Claude**: Analysis insights and recommendations
- **Perplexity**: Research and best practices
- **GitHub Copilot**: Code completion

## 📄 License

This is a case study project created for Palm's Solution Engineer role evaluation.

## 👤 Author

**Giannis Kotsas**
- Twitter: [@gianniskotsas_](https://x.com/gianniskotsas_)
- LinkedIn: [gianniskotsas](https://www.linkedin.com/in/gianniskotsas/)
- Email: giannis@kotsas.com

---

*Built with ❤️ using Next.js, React, and modern data visualization tools*
