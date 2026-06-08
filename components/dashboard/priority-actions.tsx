import Link from "next/link"
import { ArrowUpRight, Sparkles } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { insights } from "@/lib/store-data"
import { cn } from "@/lib/utils"

const impactStyles: Record<string, string> = {
  High: "bg-primary text-primary-foreground",
  Medium: "bg-accent text-accent-foreground",
  Low: "bg-muted text-muted-foreground",
}

export function PriorityActions() {
  const top = insights.slice(0, 3)
  return (
    <Card className="gap-4 p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-primary" />
          <h2 className="text-base font-semibold text-foreground">
            Priority actions
          </h2>
        </div>
        <Link
          href="/ai-insights"
          className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          View all
          <ArrowUpRight className="size-4" />
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {top.map((i) => (
          <Link
            key={i.id}
            href="/ai-insights"
            className="group flex flex-col gap-2 rounded-lg border border-border bg-background p-4 transition-colors hover:border-primary/40"
          >
            <div className="flex items-center justify-between">
              <Badge
                className={cn(
                  "border-transparent text-xs font-medium",
                  impactStyles[i.impact],
                )}
              >
                {i.impact} impact
              </Badge>
              <span className="text-xs text-muted-foreground">
                {i.confidence}% conf.
              </span>
            </div>
            <p className="text-sm font-semibold leading-snug text-foreground">
              {i.title}
            </p>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {i.projectedLift}
            </p>
          </Link>
        ))}
      </div>
    </Card>
  )
}
