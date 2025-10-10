"use client";

import { Timeline } from "@/components/ui/timeline";

export default function ToolsMethodology() {
  const timelineData = [
    {
      title: "Claude Desktop",
      image: "/logos/claude.webp",
      content: (
        <div className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal">
          <p className="mb-4">
            The analysis began with Claude Desktop, where I inserted the tasks and datasets to brainstorm and identify the key areas for analysis. This helped me understand how to most effectively answer the questions requested.
          </p>
          <p className="text-muted-foreground">
            Claude provided strategic direction on which charts to create, what patterns to look for, and how to structure the comprehensive financial analysis for the luxury resort case study.
          </p>
        </div>
      ),
    },
    {
      title: "Cursor IDE",
      image: "/logos/cursor.jpeg",
      content: (
        <div className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal">
          <p className="mb-4">
            Using Cursor IDE, I created a Jupyter Notebook file to conduct all the analysis in Python. This powerful AI-assisted IDE allowed me to efficiently clean the data, understand patterns, and create the right subsets of the main datasets.
          </p>
          <p className="text-muted-foreground">
            The notebook generated CSV files that are fetched from the front-end API routes, enabling the report to render the most recent calculated data with optimal performance.
          </p>
        </div>
      ),
    },
    {
      title: "Perplexity",
      image: "/logos/perplexity.avif",
      content: (
        <div className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal">
          <p className="mb-4">
            Perplexity was instrumental in conducting deep research queries to understand the luxury resort business model. I discovered that idle cash in luxury resorts is typically invested in short maturities or mutual funds with average returns around 2-3%.
          </p>
          <p className="text-muted-foreground mb-4">
            Additionally, I researched all French holidays and neighboring country holidays to overlay on the revenue data and identify correlations. I also fetched the total expected revenue of luxury resorts in France to benchmark ResortChain International against market-wide monthly fluctuations.
          </p>
        </div>
      ),
    },
    {
      title: "Next.js App",
      image: "/logos/nextjs.jpeg",
      content: (
        <div className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal">
          <p className="mb-4">
            The report was built as a Next.js app using TypeScript and Tailwind CSS, which allowed for rapid development and beautiful, responsive styling. This modern stack ensured optimal performance and an excellent user experience.
          </p>
          <p className="text-muted-foreground">
            I leveraged component libraries from Shadcn, Visx (from Airbnb), and Tremor.so, along with custom enhanced libraries built on top of these foundations, to create sophisticated visualizations and interactive elements.
          </p>
        </div>
      ),
    },
    {
      title: "MCP Servers",
      image: "/logos/mcp.png",
      content: (
        <div className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal">
          <p className="mb-4">
            Finally, I utilized MCP servers, specifically Context 7, to fetch the most up-to-date documentation for all the libraries used in this project. This ensured Cursor had the proper context to implement the frontend efficiently.
          </p>
          <p className="text-muted-foreground">
            By integrating the latest documentation directly into the development workflow, I could quickly implement components following best practices and the most recent API patterns, significantly accelerating the development process.
          </p>
        </div>
      ),
    },
  ];

  return <Timeline data={timelineData} />;
}

