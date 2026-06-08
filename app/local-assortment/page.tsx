import { PageHeader } from "@/components/page-header"
import { LocalAssortment } from "@/components/local-assortment/local-assortment"

export default function LocalAssortmentPage() {
  return (
    <div className="flex flex-col">
      <PageHeader
        title="Local Assortment Intelligence"
        description="Neighborhood-level demand signals and AI-recommended range changes for each Little Farms store, ranked by local over-indexing and fit to the dominant customer segment."
      >
        <span className="flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-sm text-muted-foreground">
          5 stores · Singapore
        </span>
      </PageHeader>
      <div className="px-4 py-6 md:px-8">
        <LocalAssortment />
      </div>
    </div>
  )
}
