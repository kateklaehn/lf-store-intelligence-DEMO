import { ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { topPairs } from "@/lib/store-data"
import { cn } from "@/lib/utils"

const statusStyles: Record<string, string> = {
  Underexposed: "bg-accent text-accent-foreground",
  Optimize: "bg-secondary text-secondary-foreground",
  Opportunity: "bg-primary/10 text-primary",
  Healthy: "bg-muted text-muted-foreground",
}

export function TopPairsTable() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-base">Top basket adjacencies</CardTitle>
        <p className="text-sm text-muted-foreground">
          Categories most frequently purchased together
        </p>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pairing</TableHead>
              <TableHead className="text-right">Lift</TableHead>
              <TableHead className="hidden text-right sm:table-cell">
                Baskets
              </TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topPairs.map((p) => (
              <TableRow key={`${p.a}-${p.b}`}>
                <TableCell>
                  <div className="flex items-center gap-1.5 font-medium text-foreground">
                    {p.a}
                    <ArrowRight className="size-3.5 text-muted-foreground" />
                    {p.b}
                  </div>
                </TableCell>
                <TableCell className="text-right font-mono text-sm font-medium text-foreground">
                  {p.lift.toFixed(1)}x
                </TableCell>
                <TableCell className="hidden text-right text-sm text-muted-foreground sm:table-cell">
                  {p.baskets.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={cn(
                      "border-transparent font-medium",
                      statusStyles[p.status],
                    )}
                  >
                    {p.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
