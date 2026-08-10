//  title="Skill Gaps"
//               items={report.skillGaps}
//               icon={TrendingUp}
//               color="text-yellow-500
const ReportList = ({
  title,
  items = [],
  icon: Icon,
  color = "text-ink",
  type = "area",
}) => {
  if (!items.length) return null;

  return (
    <div>
      {/* Section Header */}
      <p className="mb-3 flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-muted">
        <Icon className={`h-3.5 w-3.5 ${color}`} />
        {title}
      </p>

      {/* Items */}
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li
            key={index}
            className="rounded-xl bg-ink/5 px-3 py-3 text-xs leading-5 text-ink/80"
          >
            {type === "skillGaps" ? (
              <div className="flex items-center justify-between gap-3">
                <p className="min-w-0 font-semibold text-ink">
                  {item.skill}
                </p>

                <span
                  className={`
                    shrink-0 rounded-full border px-2.5 py-0.5
                    text-[9px] font-mono font-bold uppercase
                    ${
                      item.severity === "high"
                        ? "border-red-500/20 bg-red-500/10 text-red-400"
                        : item.severity === "medium"
                          ? "border-yellow-500/20 bg-yellow-500/10 text-yellow-500"
                          : "border-teal/20 bg-teal/10 text-teal"
                    }
                  `}
                >
                  {item.severity}
                </span>
              </div>
            ) : (
              <>
                <p className="font-semibold text-ink">
                  {item.area}
                </p>

                {item.explanation && (
                  <p className="mt-1 text-muted">
                    {item.explanation}
                  </p>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReportList;

