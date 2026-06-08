"use client"

import { useState, useRef, useCallback } from "react"
import {
  UploadCloud,
  FileSpreadsheet,
  CheckCircle2,
  Loader2,
  Database,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type Status = "idle" | "uploading" | "done"

const recentUploads = [
  { name: "pos_baskets_wk07.csv", rows: "184,302", date: "Today, 08:14", status: "Processed" },
  { name: "pos_baskets_wk06.csv", rows: "179,640", date: "Jun 1", status: "Processed" },
  { name: "loyalty_join_q2.csv", rows: "52,118", date: "May 28", status: "Processed" },
  { name: "pos_baskets_wk05.csv", rows: "176,905", date: "May 25", status: "Processed" },
]

const detected = [
  { field: "basket_id", mapped: "Transaction ID", confidence: 99 },
  { field: "line_items", mapped: "Product / Category", confidence: 97 },
  { field: "store_id", mapped: "Location", confidence: 95 },
  { field: "timestamp", mapped: "Purchase time", confidence: 92 },
  { field: "loyalty_id", mapped: "Customer (optional)", confidence: 81 },
]

export function BasketUpload() {
  const [status, setStatus] = useState<Status>("idle")
  const [fileName, setFileName] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback((name: string) => {
    setFileName(name)
    setStatus("uploading")
    setTimeout(() => setStatus("done"), 1800)
  }, [])

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragging(false)
      const file = e.dataTransfer.files?.[0]
      handleFile(file ? file.name : "pos_baskets_wk08.csv")
    },
    [handleFile],
  )

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        {/* Dropzone */}
        <Card className="p-0">
          <div
            onDragOver={(e) => {
              e.preventDefault()
              setDragging(true)
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            className={cn(
              "flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed p-10 text-center transition-colors",
              dragging
                ? "border-primary bg-primary/5"
                : "border-border bg-secondary/40",
            )}
          >
            <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              {status === "uploading" ? (
                <Loader2 className="size-7 animate-spin" />
              ) : status === "done" ? (
                <CheckCircle2 className="size-7" />
              ) : (
                <UploadCloud className="size-7" />
              )}
            </div>

            {status === "done" ? (
              <div className="space-y-1">
                <p className="text-base font-semibold text-foreground">
                  {fileName} processed
                </p>
                <p className="text-sm text-muted-foreground">
                  184,302 baskets ingested and ready for adjacency analysis.
                </p>
              </div>
            ) : status === "uploading" ? (
              <div className="space-y-1">
                <p className="text-base font-semibold text-foreground">
                  Processing {fileName}…
                </p>
                <p className="text-sm text-muted-foreground">
                  Parsing line items and computing co-purchase lift.
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                <p className="text-base font-semibold text-foreground">
                  Drag &amp; drop your basket export
                </p>
                <p className="text-sm text-muted-foreground">
                  CSV or Parquet from your POS or loyalty system, up to 2GB.
                </p>
              </div>
            )}

            <input
              ref={inputRef}
              type="file"
              accept=".csv,.parquet"
              className="hidden"
              onChange={(e) =>
                handleFile(e.target.files?.[0]?.name ?? "basket_export.csv")
              }
            />
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              {status === "done" ? "Upload another file" : "Browse files"}
            </button>
          </div>
        </Card>

        {/* Detected schema */}
        <Card className="gap-4 p-5">
          <div className="flex items-center gap-2">
            <Database className="size-4 text-primary" />
            <h2 className="text-base font-semibold text-foreground">
              Detected column mapping
            </h2>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Source field</TableHead>
                <TableHead>Mapped to</TableHead>
                <TableHead className="text-right">Confidence</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {detected.map((d) => (
                <TableRow key={d.field}>
                  <TableCell className="font-mono text-sm text-foreground">
                    {d.field}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {d.mapped}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge className="border-transparent bg-primary/10 font-medium text-primary">
                      {d.confidence}%
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>

      {/* Recent uploads */}
      <div className="lg:col-span-1">
        <Card className="gap-4 p-5">
          <h2 className="text-base font-semibold text-foreground">
            Recent uploads
          </h2>
          <ul className="space-y-3">
            {recentUploads.map((u) => (
              <li
                key={u.name}
                className="flex items-start gap-3 rounded-lg border border-border bg-background p-3"
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
                  <FileSpreadsheet className="size-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">
                    {u.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {u.rows} baskets · {u.date}
                  </p>
                </div>
                <Badge className="border-transparent bg-primary/10 text-xs font-medium text-primary">
                  {u.status}
                </Badge>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  )
}
