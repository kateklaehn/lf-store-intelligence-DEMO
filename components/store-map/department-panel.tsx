"use client"

import { X, TrendingUp, TrendingDown, Lightbulb, MoveRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import type { Department } from "@/lib/store-data"
import { cn } from "@/lib/utils"

function scoreTone(score: number) {
  if (score >= 75) return "text-primary"
  if (score >= 65) return "text-chart-4"
  return "text-destructive"
}

export function DepartmentPanel({
  department,
  onClose,
}: {
  department: Department
  onClose: () => void
}) {
  const up = department.trend >= 0
  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 border-b border-border p-5">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wide text-primary">
            {department.category}
          </p>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            {department.name}
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close panel"
          className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <X className="size-4" />
        </button>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto p-5">
        {/* Score */}
        <div>
          <div className="flex items-end justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              Adjacency score
            </span>
            <div
              className={cn(
                "flex items-center gap-1 text-xs font-medium",
                up ? "text-primary" : "text-destructive",
              )}
            >
              {up ? (
                <TrendingUp className="size-3.5" />
              ) : (
                <TrendingDown className="size-3.5" />
              )}
              {up ? "+" : ""}
              {department.trend}%
            </div>
          </div>
          <div className="mt-1 flex items-baseline gap-1">
            <span
              className={cn(
                "text-4xl font-semibold tracking-tight",
                scoreTone(department.adjacencyScore),
              )}
            >
              {department.adjacencyScore}
            </span>
            <span className="text-sm text-muted-foreground">/100</span>
          </div>
          <Progress value={department.adjacencyScore} className="mt-3 h-2" />
          <p className="mt-2 text-xs text-muted-foreground">
            {department.weeklyBasketShare}% of weekly baskets touch this zone
          </p>
        </div>

        <Separator />

        {/* Attached categories */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground">
            Top attached categories
          </h3>
          <ul className="space-y-3">
            {department.attached.map((a) => (
              <li key={a.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">{a.name}</span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {a.lift.toFixed(1)}x lift
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={a.attachRate * 2} className="h-1.5" />
                  <span className="w-10 shrink-0 text-right text-xs text-muted-foreground">
                    {a.attachRate}%
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <Separator />

        {/* Optimization notes */}
        <div className="space-y-3">
          <h3 className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
            <Lightbulb className="size-4 text-chart-4" />
            Optimization notes
          </h3>
          <ul className="space-y-2">
            {department.optimizationNotes.map((note, idx) => (
              <li
                key={idx}
                className="rounded-md bg-secondary/60 p-3 text-xs leading-relaxed text-secondary-foreground"
              >
                {note}
              </li>
            ))}
          </ul>
        </div>

        <Separator />

        {/* Recommended moves */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground">
            Recommended moves
          </h3>
          <ul className="space-y-2">
            {department.recommendedMoves.map((move, idx) => (
              <li key={idx} className="flex gap-2.5">
                <MoveRight className="mt-0.5 size-4 shrink-0 text-primary" />
                <span className="text-sm leading-relaxed text-foreground">
                  {move}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border p-4">
        <button
          type="button"
          className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Apply to layout plan
        </button>
      </div>
    </div>
  )
}
