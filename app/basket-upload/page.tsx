import { PageHeader } from "@/components/page-header"
import { BasketUpload } from "@/components/basket-upload/basket-upload"

export default function BasketUploadPage() {
  return (
    <div className="flex flex-col">
      <PageHeader
        title="Basket Upload"
        description="Import point-of-sale or loyalty basket exports to refresh adjacency scores and co-purchase intelligence across the store."
      />
      <div className="px-4 py-6 md:px-8">
        <BasketUpload />
      </div>
    </div>
  )
}
