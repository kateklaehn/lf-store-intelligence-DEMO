"use client"

import { useState } from "react"
import {
  DoorOpen,
  Croissant,
  Flower2,
  Soup,
  Fish,
  Beef,
  Wine,
  ShoppingCart,
  type LucideIcon,
} from "lucide-react"
import { departments, type DepartmentId, type Department } from "@/lib/store-data"
import { DepartmentPanel } from "./department-panel"
import { cn } from "@/lib/utils"

const icons: Record<DepartmentId, LucideIcon> = {
  entrance: DoorOpen,
  bakery: Croissant,
  flowers: Flower2,
  "prepared-foods": Soup,
  seafood: Fish,
  butchery: Beef,
  wine: Wine,
  checkout: ShoppingCart,
}

function zoneTone(score: number, active: boolean) {
  if (active) return "border-primary bg-primary text-primary-foreground shadow-lg"
  if (score >= 75)
    return "border-primary/30 bg-primary/10 text-foreground hover:border-primary/60"
  if (score >= 65)
    return "border-border bg-card text-foreground hover:border-primary/40"
  return "border-destructive/30 bg-destructive/5 text-foreground hover:border-destructive/50"
}

export function StoreMap() {
  const [selectedId, setSelectedId] = useState<DepartmentId | null>("wine")
  const selected: Department | undefined = departments.find(
    (d) => d.id === selectedId,
  )

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Map */}
      <div className="lg:col-span-2">
        <div className="rounded-xl border border-border bg-card p-4 md:p-6">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              Flagship floor plan · click a zone
            </p>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-sm bg-primary/40" /> Strong
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-sm bg-border" /> Watch
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-sm bg-destructive/40" /> At risk
              </span>
            </div>
          </div>

          <div
            className="grid gap-2.5 sm:gap-3"
            style={{
              gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
              gridTemplateRows: "repeat(3, minmax(96px, 1fr))",
            }}
          >
            {departments.map((d) => {
              const Icon = icons[d.id]
              const active = d.id === selectedId
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setSelectedId(d.id)}
                  aria-pressed={active}
                  className={cn(
                    "flex flex-col justify-between rounded-lg border p-3 text-left transition-all",
                    zoneTone(d.adjacencyScore, active),
                  )}
                  style={{
                    gridColumn: `${d.grid.col} / span ${d.grid.colSpan}`,
                    gridRow: `${d.grid.row} / span ${d.grid.rowSpan}`,
                  }}
                >
                  <Icon
                    className={cn(
                      "size-5",
                      active ? "text-primary-foreground" : "text-primary",
                    )}
                  />
                  <div>
                    <p className="text-sm font-semibold leading-tight">
                      {d.name}
                    </p>
                    <p
                      className={cn(
                        "text-xs",
                        active
                          ? "text-primary-foreground/80"
                          : "text-muted-foreground",
                      )}
                    >
                      Score {d.adjacencyScore}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Side panel */}
      <div className="lg:col-span-1">
        <div className="overflow-hidden rounded-xl border border-border bg-card lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)]">
          {selected ? (
            <DepartmentPanel
              department={selected}
              onClose={() => setSelectedId(null)}
            />
          ) : (
            <div className="flex h-full min-h-64 flex-col items-center justify-center gap-2 p-8 text-center">
              <p className="text-sm font-medium text-foreground">
                No department selected
              </p>
              <p className="text-sm text-muted-foreground">
                Select a zone on the floor plan to view its adjacency
                intelligence and recommended moves.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
