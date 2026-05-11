import { useInterview } from "../Hooks/useInterview";

const severityConfig = {
  low: {
    badge: "bg-green-950 text-green-400 border border-green-800/40",
    dot: "bg-green-400",
    label: "Low",
  },
  medium: {
    badge: "bg-yellow-950 text-yellow-400 border border-yellow-800/40",
    dot: "bg-yellow-400",
    label: "Medium",
  },
  high: {
    badge: "bg-red-950 text-red-400 border border-red-800/40",
    dot: "bg-red-400",
    label: "High",
  },
};

const SkillGaps = () => {
  const { report } = useInterview();

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
        <span className="text-[11px] font-medium text-gray-500 uppercase tracking-widest">
          Skill Gaps
        </span>
      </div>

      {report?.skillGaps?.map((item, i) => {
        const config =
          severityConfig[item.severity?.toLowerCase()] ?? severityConfig.low;
        return (
          <div
            key={i}
            className="flex items-center justify-between bg-gray-800 rounded-lg px-4 py-3 border border-gray-700"
          >
            <div className="flex items-center justify-between w-full gap-3">
              <div className="flex items-center  gap-3 flex-1">
                <div
                  className={`w-2.5 h-2.5 rounded-full shrink-0 ${config.dot}`}
                />
                <span className="text-sm text-gray-200 tracking-tight font-medium">
                  {item.skill}
                </span>
              </div>
              <span
                className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${config.badge}`}
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
