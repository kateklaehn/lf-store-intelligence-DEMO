import { TrendingUp, TrendingDown } from "lucide-react"
import { Card } from "@/components/ui/card"
import { kpis } from "@/lib/store-data"
import { cn } from "@/lib/utils"

export function KpiCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {kpis.map((kpi) => {
        const up = kpi.trend >= 0
        return (
          <Card key={kpi.label} className="gap-3 p-5">
            <p className="text-sm font-medium text-muted-foreground">
              {kpi.label}
            </p>
            <div className="flex items-end gap-1.5">
              <span className="text-3xl font-semibold tracking-tight text-foreground">
                {kpi.value}
              </span>
              {kpi.unit ? (
                <span className="pb-1 text-xs text-muted-foreground">
                  {kpi.unit}
                </span>
              ) : null}
            </div>
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
              {kpi.trend}% vs last period
            </div>
          </Card>
        )
      })}
    </div>
  )
}
