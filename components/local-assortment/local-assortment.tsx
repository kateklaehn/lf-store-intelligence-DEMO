"use client"

import { useState } from "react"
import {
  Sparkles,
  TrendingUp,
  MapPin,
  Users,
  ShoppingBasket,
  DollarSign,
  Plus,
  FlaskConical,
  AlertTriangle,
  ArrowUpRight,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { assortmentStores, type AssortmentStore } from "@/lib/store-data"
import { cn } from "@/lib/utils"

export function LocalAssortment() {
  const [activeId, setActiveId] = useState(assortmentStores[0].id)
  const active =
    assortmentStores.find((s) => s.id === activeId) ?? assortmentStores[0]

  return (
    <div className="space-y-8">
      {/* Store cards */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Store network
          </h2>
          <span className="text-xs text-muted-foreground">
            {assortmentStores.length} stores · select to focus
          </span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {assortmentStores.map((store) => (
            <StoreCard
              key={store.id}
              store={store}
              active={store.id === activeId}
              onSelect={() => setActiveId(store.id)}
            />
          ))}
        </div>
      </section>

      {/* Comparison table */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Network comparison
        </h2>
        <ComparisonTable activeId={activeId} onSelect={setActiveId} />
      </section>

      {/* Detail + AI panel */}
      <section className="grid gap-6 lg:grid-cols-3">
        <StoreDetail store={active} />
        <AiPanel store={active} />
      </section>
    </div>
  )
}

function StoreCard({
  store,
  active,
  onSelect,
}: {
  store: AssortmentStore
  active: boolean
  onSelect: () => void
}) {
  return (
    <button type="button" onClick={onSelect} className="text-left">
      <Card
        className={cn(
          "h-full gap-4 p-5 transition-all hover:border-primary/40",
          active && "border-primary ring-1 ring-primary",
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary text-sm font-semibold text-primary-foreground">
              {store.initials}
            </div>
            <div className="leading-tight">
              <p className="font-semibold text-foreground">{store.name}</p>
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="size-3" />
                {store.city}
              </p>
            </div>
          </div>
          <Badge className="border-transparent bg-accent text-xs font-medium text-accent-foreground">
            {store.localizationScore} loc
          </Badge>
        </div>

        <div className="flex items-center gap-1.5 text-sm">
          <Users className="size-3.5 text-primary" />
          <span className="font-medium text-foreground">{store.segment}</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {store.overIndexing.slice(0, 3).map((c) => (
            <span
              key={c.category}
              className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
            >
              {c.category}
            </span>
          ))}
        </div>

        <div className="mt-1 grid grid-cols-2 gap-3 border-t border-border pt-3 text-sm">
          <div>
            <p className="text-xs text-muted-foreground">Baskets / wk</p>
            <p className="font-semibold text-foreground">
              {(store.basketsPerWeek / 1000).toFixed(1)}k
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Avg basket</p>
            <p className="font-semibold text-foreground">
              S${store.avgBasket.toFixed(2)}
            </p>
          </div>
        </div>
      </Card>
    </button>
  )
}

function ComparisonTable({
  activeId,
  onSelect,
}: {
  activeId: string
  onSelect: (id: string) => void
}) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/50 hover:bg-secondary/50">
              <TableHead className="min-w-44">Store</TableHead>
              <TableHead>Dominant segment</TableHead>
              <TableHead>Top over-index</TableHead>
              <TableHead className="text-right">Baskets / wk</TableHead>
              <TableHead className="text-right">Avg basket</TableHead>
              <TableHead className="text-right">Localization</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assortmentStores.map((store) => {
              const top = store.overIndexing[0]
              const isActive = store.id === activeId
              return (
                <TableRow
                  key={store.id}
                  onClick={() => onSelect(store.id)}
                  className={cn(
                    "cursor-pointer",
                    isActive && "bg-primary/5 hover:bg-primary/5",
                  )}
                >
                  <TableCell className="font-medium text-foreground">
                    <div className="flex items-center gap-2">
                      <span className="flex size-7 items-center justify-center rounded bg-primary/10 text-xs font-semibold text-primary">
                        {store.initials}
                      </span>
                      {store.name}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {store.segment}
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center gap-1.5">
                      <span className="text-foreground">{top.category}</span>
                      <span className="inline-flex items-center gap-0.5 rounded bg-primary/10 px-1.5 py-0.5 text-xs font-semibold text-primary">
                        <ArrowUpRight className="size-3" />
                        {top.index}
                      </span>
                    </span>
                  </TableCell>
                  <TableCell className="text-right tabular-nums text-foreground">
                    {(store.basketsPerWeek / 1000).toFixed(1)}k
                  </TableCell>
                  <TableCell className="text-right tabular-nums text-foreground">
                    S${store.avgBasket.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-secondary">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${store.localizationScore}%` }}
                        />
                      </div>
                      <span className="w-7 text-right tabular-nums text-xs font-medium text-foreground">
                        {store.localizationScore}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </Card>
  )
}

function StoreDetail({ store }: { store: AssortmentStore }) {
  return (
    <Card className="gap-6 p-6 lg:col-span-2">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-foreground">
              {store.name}
            </h2>
            <Badge className="border-transparent bg-accent text-xs font-medium text-accent-foreground">
              {store.neighborhood}
            </Badge>
          </div>
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Users className="size-3.5" />
            {store.segment} · {store.segmentDetail}
          </p>
        </div>
        <div className="flex gap-4">
          <Metric
            icon={ShoppingBasket}
            label="Baskets / wk"
            value={`${(store.basketsPerWeek / 1000).toFixed(1)}k`}
          />
          <Metric
            icon={DollarSign}
            label="Avg basket"
            value={`S$${store.avgBasket.toFixed(2)}`}
          />
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Neighborhood profile
        </h3>
        <p className="text-pretty text-sm leading-relaxed text-foreground">
          {store.profile}
        </p>
      </div>

      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Top over-indexing categories
        </h3>
        <div className="space-y-2.5">
          {store.overIndexing.map((c) => (
            <div key={c.category} className="flex items-center gap-3">
              <span className="w-44 shrink-0 text-sm text-foreground">
                {c.category}
              </span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${Math.min((c.index / 200) * 100, 100)}%` }}
                />
              </div>
              <span className="w-12 text-right text-sm font-semibold tabular-nums text-primary">
                {c.index}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Index vs. chain average (100 = network norm)
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <h3 className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <Plus className="size-3.5" />
            Recommended SKU expansions
          </h3>
          <ul className="space-y-3">
            {store.skuExpansions.map((s) => (
              <li key={s.category} className="space-y-0.5">
                <p className="text-sm font-medium text-foreground">
                  {s.category}
                </p>
                <p className="text-pretty text-xs leading-relaxed text-muted-foreground">
                  {s.rationale}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <FlaskConical className="size-3.5" />
            Products to test
          </h3>
          <ul className="space-y-2">
            {store.productsToTest.map((p) => (
              <li
                key={p.name}
                className="flex items-center justify-between gap-3 rounded-md border border-border bg-secondary/30 px-3 py-2"
              >
                <span className="text-sm font-medium text-foreground">
                  {p.name}
                </span>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {p.note}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <h3 className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          <AlertTriangle className="size-3.5" />
          Risks &amp; cautions
        </h3>
        <ul className="space-y-2">
          {store.risks.map((r) => (
            <li
              key={r}
              className="flex items-start gap-2.5 rounded-md border border-destructive/20 bg-destructive/5 px-3 py-2 text-sm leading-relaxed text-foreground"
            >
              <AlertTriangle className="mt-0.5 size-4 shrink-0 text-destructive" />
              {r}
            </li>
          ))}
        </ul>
      </div>
    </Card>
  )
}

function Metric({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType
  label: string
  value: string
}) {
  return (
    <div className="text-right">
      <p className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
        <Icon className="size-3" />
        {label}
      </p>
      <p className="text-lg font-semibold tabular-nums text-foreground">
        {value}
      </p>
    </div>
  )
}

function AiPanel({ store }: { store: AssortmentStore }) {
  const topCat = store.overIndexing[0]
  const topSku = store.skuExpansions[0]
  const topTest = store.productsToTest[0]

  return (
    <Card className="h-fit gap-5 border-primary/20 bg-primary/5 p-6">
      <div className="flex items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Sparkles className="size-5" />
        </div>
        <div className="leading-tight">
          <p className="text-sm font-semibold text-foreground">
            AI recommendation
          </p>
          <p className="text-xs text-muted-foreground">{store.name}</p>
        </div>
      </div>

      <p className="text-pretty text-sm leading-relaxed text-foreground">
        {store.name} skews{" "}
        <span className="font-semibold">{store.segment.toLowerCase()}</span> with{" "}
        <span className="font-semibold">{topCat.category}</span> over-indexing at{" "}
        <span className="font-semibold text-primary">{topCat.index}</span> vs.
        the network. Lean the local range into this strength rather than holding
        a uniform chain assortment.
      </p>

      <div className="space-y-3">
        <PanelStep
          label="Expand first"
          value={topSku.category}
          detail={topSku.rationale}
        />
        <PanelStep label="Test next" value={topTest.name} detail={topTest.note} />
        <PanelStep
          label="Watch for"
          value={store.risks[0]}
          tone="caution"
        />
      </div>

      <div className="flex items-center gap-2 rounded-md bg-primary/10 px-3 py-2 text-sm font-medium text-primary">
        <TrendingUp className="size-4" />
        Projected +{(store.localizationScore / 10 + 3).toFixed(1)}% local share
        if actioned
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          className="flex-1 rounded-md border border-border bg-card px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
        >
          Export brief
        </button>
        <button
          type="button"
          className="flex-1 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Add to plan
        </button>
      </div>
    </Card>
  )
}

function PanelStep({
  label,
  value,
  detail,
  tone = "default",
}: {
  label: string
  value: string
  detail?: string
  tone?: "default" | "caution"
}) {
  return (
    <div className="rounded-md border border-border bg-card p-3">
      <p
        className={cn(
          "text-xs font-semibold uppercase tracking-wide",
          tone === "caution" ? "text-destructive" : "text-primary",
        )}
      >
        {label}
      </p>
      <p className="mt-0.5 text-sm font-medium text-foreground">{value}</p>
      {detail ? (
        <p className="mt-0.5 text-pretty text-xs leading-relaxed text-muted-foreground">
          {detail}
        </p>
      ) : null}
    </div>
  )
}
