import { PageHeader } from "@/components/page-header"
import { AiInsights } from "@/components/ai-insights/ai-insights"

export default function AiInsightsPage() {
  return (
    <div className="flex flex-col">
      <PageHeader
        title="AI Insights"
        description="AI-generated layout and merchandising recommendations derived from basket adjacency patterns, ranked by projected impact."
      >
        <span className="flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-sm text-muted-foreground">
          Updated today
        </span>
      </PageHeader>
      <div className="px-4 py-6 md:px-8">
        <AiInsights />
      </div>
    </div>
  )
}
