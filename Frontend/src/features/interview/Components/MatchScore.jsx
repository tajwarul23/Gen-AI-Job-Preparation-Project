import { useInterview } from "../Hooks/useInterview";

const MatchScore = () => {
  const { report } = useInterview();

  const score = report?.matchScore || 0;

  const getScoreStyle = (score) => {
    if (score >= 80)
      return {
        color: "#22c55e",
        text: "text-green-400",
        label: "Excellent Fit",
      };

    if (score >= 60)
      return {
        color: "#3b82f6",
        text: "text-blue-400",
        label: "Good Match",
      };

    if (score >= 40)
      return {
        color: "#facc15",
        text: "text-yellow-400",
        label: "Average Match",
      };

    return {
      color: "#ef4444",
      text: "text-red-400",
      label: "Needs Work",
    };
  };

  const style = getScoreStyle(score);

  return (
    <div className="flex flex-col items-center gap-4 font-display">

      <h1 className="text-xl font-semibold text-gray-50">
        Match Score
      </h1>

      {/* Circular Progress */}
      <div
        className="relative w-36 h-36 rounded-full flex items-center justify-center"
        style={{
          background: `conic-gradient(${style.color} ${score * 3.6}deg, #1f2937 0deg)`,
        }}
      >

        {/* Inner Circle */}
        <div className="w-28 h-28 rounded-full bg-gray-900 flex flex-col items-center justify-center">

          <span className={`text-3xl font-bold ${style.text}`}>
            {score}%
          </span>

          <span className="text-xs text-gray-500 mt-1">
            ATS Match
          </span>

        </div>
      </div>

      {/* Label */}
      <span className={`text-lg font-semibold ${style.text}`}>
        {style.label}
      </span>

    </div>
  );
};

export default MatchScore;