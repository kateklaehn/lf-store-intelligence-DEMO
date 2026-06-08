"use client"

import { useState } from "react"
import { Sparkles, TrendingUp, ChevronRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { insights, type Insight } from "@/lib/store-data"
import { cn } from "@/lib/utils"

const impactStyles: Record<string, string> = {
  High: "bg-primary text-primary-foreground",
  Medium: "bg-accent text-accent-foreground",
  Low: "bg-muted text-muted-foreground",
}

const filters = ["All", "Layout", "Merchandising", "Operations", "Front End"]

export function AiInsights() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [openId, setOpenId] = useState<string>(insights[0].id)

  const filtered =
    activeFilter === "All"
      ? insights
      : insights.filter((i) => i.category === activeFilter)

  return (
    <div className="space-y-6">
      {/* Summary banner */}
      <Card className="gap-4 border-primary/20 bg-primary/5 p-5">
        <div className="flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="size-5" />
          </div>
          <div className="space-y-1">
            <h2 className="text-base font-semibold text-foreground">
              This week&apos;s adjacency intelligence
            </h2>
            <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
              Analysis of 184,302 baskets surfaced {insights.length} high-value
              layout opportunities. Acting on the top three could lift the
              average basket by an estimated 6–9% on affected trips.
            </p>
          </div>
        </div>
      </Card>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setActiveFilter(f)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
              activeFilter === f
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:text-foreground",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Insights list */}
      <div className="space-y-3">
        {filtered.map((insight) => (
          <InsightCard
            key={insight.id}
            insight={insight}
            open={openId === insight.id}
            onToggle={() =>
              setOpenId(openId === insight.id ? "" : insight.id)
            }
          />
        ))}
      </div>
    </div>
  )
}

function InsightCard({
  insight,
  open,
  onToggle,
}: {
  insight: Insight
  open: boolean
  onToggle: () => void
}) {
  return (
    <Card className="gap-0 overflow-hidden p-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center gap-4 p-5 text-left transition-colors hover:bg-secondary/40"
      >
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              className={cn(
                "border-transparent text-xs font-medium",
                impactStyles[insight.impact],
              )}
            >
              {insight.impact} impact
            </Badge>
            <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
              {insight.category}
            </span>
            <span className="text-xs text-muted-foreground">
              {insight.confidence}% confidence
            </span>
          </div>
          <h3 className="text-base font-semibold text-foreground">
            {insight.title}
          </h3>
          <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
            {insight.summary}
          </p>
        </div>
        <ChevronRight
          className={cn(
            "size-5 shrink-0 text-muted-foreground transition-transform",
            open && "rotate-90",
          )}
        />
      </button>

      {open ? (
        <div className="border-t border-border bg-secondary/30 p-5">
          <p className="text-sm leading-relaxed text-foreground">
            {insight.detail}
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 rounded-md bg-primary/10 px-3 py-2 text-sm font-medium text-primary">
              <TrendingUp className="size-4" />
              {insight.projectedLift}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="rounded-md border border-border bg-card px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
              >
                Dismiss
              </button>
              <button
                type="button"
                className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Add to plan
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </Card>
  )
}
