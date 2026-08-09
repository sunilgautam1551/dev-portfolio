/**
 * Illustrative, generic UI — not a screenshot of the real product (which is
 * confidential). Stands in for "high-density enterprise analytics dashboard"
 * with a placeholder data grid and chart, generic labels and numbers only.
 */
const rows = [
  ["Region A", "1,204", "+4.2%"],
  ["Region B", "982", "-1.1%"],
  ["Region C", "2,310", "+8.7%"],
  ["Region D", "641", "+0.4%"],
  ["Region E", "1,578", "+2.9%"],
];

const bars = [40, 65, 30, 80, 55, 70, 45];

export function AnalyticsMockup() {
  return (
    <div
      role="img"
      aria-label="Illustrative mockup of a high-density analytics dashboard with a data grid and bar chart"
      className="border-border bg-card overflow-hidden rounded-xl border shadow-sm"
    >
      <div className="border-border bg-secondary/40 flex items-center gap-1.5 border-b px-4 py-3">
        <span className="size-2.5 rounded-full bg-red-400/70" aria-hidden="true" />
        <span className="size-2.5 rounded-full bg-amber-400/70" aria-hidden="true" />
        <span className="size-2.5 rounded-full bg-emerald-400/70" aria-hidden="true" />
        <span className="text-muted-foreground ml-3 font-mono text-xs">Business Insights</span>
      </div>

      <div className="grid grid-cols-1 gap-px sm:grid-cols-[1.2fr_1fr]">
        <div className="bg-card p-3">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="text-muted-foreground border-border border-b text-[10px] tracking-wide uppercase">
                <th className="pb-2 font-medium">Segment</th>
                <th className="pb-2 font-medium">Volume</th>
                <th className="pb-2 font-medium">Change</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row[0]} className={i % 2 === 0 ? "bg-secondary/30" : ""}>
                  <td className="py-1.5 pl-1 font-medium">{row[0]}</td>
                  <td className="py-1.5 font-mono">{row[1]}</td>
                  <td
                    className={`py-1.5 font-mono ${row[2]!.startsWith("-") ? "text-destructive" : "text-primary"}`}
                  >
                    {row[2]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-card flex min-h-40 flex-col justify-between p-4">
          <p className="text-muted-foreground text-[10px] tracking-wide uppercase sm:text-xs">
            Quarterly Volume
          </p>
          <div className="flex h-24 items-end gap-1.5" aria-hidden="true">
            {bars.map((height, i) => (
              <span
                key={i}
                className="bg-primary/70 flex-1 rounded-t-sm"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
          <p className="text-muted-foreground text-[10px] sm:text-xs">Ag-Grid + Highcharts</p>
        </div>
      </div>
    </div>
  );
}
