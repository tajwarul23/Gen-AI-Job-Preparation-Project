import { useInterview } from "../Hooks/useInterview";

const severityConfig = {
  low: {
    badge: "bg-emerald-400/10 text-emerald-400 border border-emerald-400/30",
    dot: "bg-emerald-400",
    label: "Low",
  },
  medium: {
    badge: "bg-amber-400/10 text-amber-400 border border-amber-400/30",
    dot: "bg-amber-400",
    label: "Medium",
  },
  high: {
    badge: "bg-red-400/10 text-red-400 border border-red-400/30",
    dot: "bg-red-400",
    label: "High",
  },
};

const SkillGaps = () => {
  const { report } = useInterview();

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-1.5 h-1.5 rounded-full bg-violet" />
        <span className="text-[11px] font-mono font-medium text-muted uppercase tracking-widest">
          Skill Gaps
        </span>
      </div>

      {report?.skillGaps?.map((item, i) => {
        const config =
          severityConfig[item.severity?.toLowerCase()] ?? severityConfig.low;
        return (
          <div
            key={i}
            className="flex items-center justify-between bg-overlay rounded-lg px-4 py-3 border border-line"
          >
            <div className="flex items-center justify-between w-full gap-3">
              <div className="flex items-center  gap-3 flex-1">
                <div
                  className={`w-2.5 h-2.5 rounded-full shrink-0 ${config.dot}`}
                />
                <span className="text-sm text-ink tracking-tight font-sans">
                  {item.skill}
                </span>
              </div>
              <span
                className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${config.badge}`}
              >
                {config.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SkillGaps;
