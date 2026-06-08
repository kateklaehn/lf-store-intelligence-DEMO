"use client"

import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { adjacencyTrend } from "@/lib/store-data"

const config = {
  score: {
    label: "Adjacency Score",
    color: "var(--chart-1)",
  },
  basket: {
    label: "Avg. Basket ($)",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig

export function TrendChart() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-base">Adjacency & basket performance</CardTitle>
        <p className="text-sm text-muted-foreground">
          Rolling 7-week trend across the flagship store
        </p>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="h-[280px] w-full">
          <AreaChart data={adjacencyTrend} margin={{ left: 0, right: 8, top: 8 }}>
            <defs>
              <linearGradient id="fillScore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-score)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--color-score)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="fillBasket" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-basket)" stopOpacity={0.25} />
                <stop offset="95%" stopColor="var(--color-basket)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="week"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              width={32}
              domain={[55, 80]}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Area
              dataKey="score"
              type="monotone"
              fill="url(#fillScore)"
              stroke="var(--color-score)"
              strokeWidth={2}
            />
            <Area
              dataKey="basket"
              type="monotone"
              fill="url(#fillBasket)"
              stroke="var(--color-basket)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
