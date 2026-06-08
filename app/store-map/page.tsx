import { PageHeader } from "@/components/page-header"
import { StoreMap } from "@/components/store-map/store-map"

export default function StoreMapPage() {
  return (
    <div className="flex flex-col">
      <PageHeader
        title="Store Map"
        description="An interactive floor plan of department zones. Select any zone to inspect its adjacency score, attached categories, and recommended layout moves."
      >
        <span className="rounded-md border border-border bg-card px-3 py-1.5 text-sm text-muted-foreground">
          Flagship · Mayfair
        </span>
      </PageHeader>

      <div className="px-4 py-6 md:px-8">
        <StoreMap />
      </div>
    </div>
  )
}
