/**
 * Illustrative, generic UI — not a screenshot of the real product (which is
 * confidential). Stands in for "role-based documentation platform" with a
 * sidebar nav tree, an article skeleton, and a CMS-editing hint.
 */
const navItems = [
  { label: "Getting Started", active: false },
  { label: "API Reference", active: true },
  { label: "Guides", active: false },
  { label: "Deployment", active: false },
];

const subItems = ["Authentication", "Rate Limits", "Webhooks"];

const contentLines = ["w-full", "w-11/12", "w-full", "w-4/5", "w-full", "w-2/3"];

export function DocsMockup() {
  return (
    <div
      role="img"
      aria-label="Illustrative mockup of a role-based documentation platform with a navigation sidebar and article content"
      className="border-border bg-card overflow-hidden rounded-xl border shadow-sm"
    >
      <div className="border-border bg-secondary/40 flex items-center justify-between gap-1.5 border-b px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-red-400/70" aria-hidden="true" />
          <span className="size-2.5 rounded-full bg-amber-400/70" aria-hidden="true" />
          <span className="size-2.5 rounded-full bg-emerald-400/70" aria-hidden="true" />
          <span className="text-muted-foreground ml-3 font-mono text-xs">Docs Portal</span>
        </div>
        <span className="bg-accent text-accent-foreground rounded-full px-2 py-0.5 text-[10px] font-medium">
          Customer Docs
        </span>
      </div>

      <div className="grid grid-cols-[1fr_1.6fr] sm:grid-cols-[1fr_2fr]">
        <nav aria-hidden="true" className="border-border bg-secondary/20 space-y-0.5 border-r p-3">
          {navItems.map((item) => (
            <div key={item.label}>
              <div
                className={`rounded-md px-2 py-1.5 text-xs font-medium ${
                  item.active ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </div>
              {item.active && (
                <div className="mt-0.5 ml-3 space-y-1 border-l pl-2">
                  {subItems.map((sub) => (
                    <div key={sub} className="text-muted-foreground py-1 text-[10px]">
                      {sub}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="min-h-52 space-y-3 p-4 sm:min-h-60">
          <div className="bg-foreground/80 h-3 w-2/5 rounded-full" />
          <div className="space-y-2 pt-2">
            {contentLines.map((width, i) => (
              <div key={i} className={`bg-muted h-2 ${width} rounded-full`} />
            ))}
          </div>
          <div className="border-border bg-secondary/30 mt-4 rounded-md border p-3">
            <div className="bg-muted h-2 w-1/3 rounded-full" />
            <div className="bg-muted mt-2 h-2 w-1/2 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
