import { PageHeader } from "@/components/page-header"
import { KpiCards } from "@/components/dashboard/kpi-cards"
import { TrendChart } from "@/components/dashboard/trend-chart"
import { TopPairsTable } from "@/components/dashboard/top-pairs-table"
import { PriorityActions } from "@/components/dashboard/priority-actions"

export default function DashboardPage() {
  return (
    <div className="flex flex-col">
      <PageHeader
        title="Dashboard"
        description="A real-time view of store layout health and basket adjacency performance across the flagship location."
      >
        <span className="rounded-md border border-border bg-card px-3 py-1.5 text-sm text-muted-foreground">
          Week 7 · Q2
        </span>
      </PageHeader>

      <div className="flex flex-col gap-6 px-4 py-6 md:px-8">
        <KpiCards />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <TrendChart />
          </div>
          <div className="lg:col-span-2">
            <TopPairsTable />
          </div>
        </div>

        <PriorityActions />
      </div>
    </div>
  )
}
