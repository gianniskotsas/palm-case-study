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
            The analysis began with Claude Desktop, where I inserted the tasks
            and datasets to brainstorm and identify the key areas for analysis,
            lay down my thoughts and create the report structure. For me this is
            the most effective way to start rolling the ideas.
          </p>
          <p className="text-muted-foreground">
            Claude provided strategic direction on which charts to create, what
            patterns to look for, and how to structure the comprehensive
            financial analysis for the luxury resort case study.
          </p>
        </div>
      ),
    },
    {
      title: "Cursor",
      image: "/logos/cursor.jpeg",
      content: (
        <div className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal">
          <p className="mb-4">
            Cursor is my go to IDE for coding, it allows me to write code
            quickly and efficiently. I have set up cursor rules, connected MCP
            servers into Cursor for all my projects, including this one. Here, I
            created a Jupyter Notebook file to conduct all the analysis in
            Python. I like woring in separate code cells, put markdown comments
            to explain my thoughts and code.
          </p>
          <p className="text-muted-foreground">
            When I was starting a big task for the analysis (e.g. Forecasting
            Analysis), I would create a new branch in the repository and work on
            it there. I used the 'Plan' mode of cursor to write down my
            thoughts, Cursor looked through my codebase to see what's possible
            and came back with suggestions or clarifications (that I wouldn't
            have thought of myself). Cursor is the best sparring partner I have
            ever had.
          </p>
        </div>
      ),
    },
    {
      title: "Wispr Flow",
      image: "/logos/wispr_logo.png",
      content: (
        <div className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal">
          <p className="mb-4">
            I poured my coffee, I sat down in front of my computer, I opened
            Cursor and saw that the Financial Forecasting was the next task on
            my list. Typing sometimes feels boring. It feels engineered. Not the
            best way to unravel your thoughts. But talking?
          </p>
          <p className="text-muted-foreground">
            That's when I mostly used Wispr Flow. I just press three buttons on
            my keyboard, mic is activated, and I start talking explaining my
            thoughts, mentioning which files to use, finds them in Cursor and
            automatically puts them in context. And fun fact, I can walk around
            my apartmnent and talk to Wispr Flow, it will follow me around.
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
            Perplexity was instrumental in conducting deep research queries to
            understand the luxury resort business model. I discovered that idle
            cash in luxury resorts is typically invested in short maturities or
            mutual funds with average returns around 3-4%.
          </p>
          <p className="text-muted-foreground mb-4">
            Additionally, I researched all French holidays and neighboring
            country holidays to overlay on the revenue data and identify
            correlations. I also fetched the total expected revenue of luxury
            resorts in France to benchmark ResortChain International against
            market-wide monthly fluctuations.
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
            The report was built as a Next.js app using TypeScript and Tailwind
            CSS, which allowed for rapid development and beautiful, responsive
            styling. This modern stack ensured optimal performance and an
            excellent user experience.
          </p>
          <p className="text-muted-foreground">
            I leveraged component libraries from Shadcn, Visx (from Airbnb), and
            Tremor.so, along with custom enhanced libraries built on top of
            these foundations, to create visualizations and the
            interactive elements you see in the report.
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
            Finally, I utilized MCP servers, specifically Context 7, to fetch
            the most up-to-date documentation for all the libraries used in this
            project. This ensured Cursor had the proper context to implement the
            frontend efficiently.
          </p>
          <p className="text-muted-foreground">
            By integrating the latest documentation directly into the
            development workflow, I could quickly implement components following
            best practices and the most recent API patterns, significantly
            accelerating the development process.
          </p>
        </div>
      ),
    },
  ];

  return <Timeline data={timelineData} />;
}
