import { useInterview } from "../Hooks/useInterview";

const MatchScore = () => {
  const { report } = useInterview();

  const score = report?.matchScore || 0;

  const getScoreStyle = (score) => {
    if (score >= 80)
      return {
        color: "var(--color-emerald-400)",
        text: "text-emerald-400",
        label: "Excellent Fit",
      };

    if (score >= 60)
      return {
        color: "var(--color-blue-400)",
        text: "text-blue-400",
        label: "Good Match",
      };

    if (score >= 40)
      return {
        color: "var(--color-amber-400)",
        text: "text-amber-400",
        label: "Average Match",
      };

    return {
      color: "var(--color-red-400)",
      text: "text-red-400",
      label: "Needs Work",
    };
  };

  const style = getScoreStyle(score);

  return (
    <div className="flex flex-col items-center gap-4">

      <h2 className="text-base font-bold font-display text-ink">
        Match Score
      </h2>

      {/* Circular Progress */}
      <div
        className="relative w-36 h-36 rounded-full flex items-center justify-center"
        style={{
          background: `conic-gradient(${style.color} ${score * 3.6}deg, var(--color-overlay) 0deg)`,
        }}
      >

        {/* Inner Circle */}
        <div className="w-28 h-28 rounded-full bg-app flex flex-col items-center justify-center">

          <span className={`text-3xl font-bold font-display ${style.text}`}>
            {score}%
          </span>

          <span className="text-xs text-muted font-sans mt-1">
            ATS Match
          </span>

        </div>
      </div>

      {/* Label */}
      <span className={`text-lg font-semibold font-sans ${style.text}`}>
        {style.label}
      </span>

    </div>
  );
};

export default MatchScore;