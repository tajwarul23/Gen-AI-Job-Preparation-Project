import { useInterview } from "../Hooks/useInterview";

const MatchScore = () => {
  const { report } = useInterview();
  const score = report?.matchScore;

  const getScoreStyle = (score) => {
    if (score >= 80) return {
      ring: "bg-green-500",
      text: "text-green-400",
      label: "Excellent",
      labelColor: "text-green-400"
    };
    if (score >= 60) return {
      ring: "bg-blue-500",
      text: "text-blue-400",
      label: "Good",
      labelColor: "text-blue-400"
    };
    if (score >= 40) return {
      ring: "bg-yellow-500",
      text: "text-yellow-400",
      label: "Average",
      labelColor: "text-yellow-400"
    };
    return {
      ring: "bg-red-500",
      text: "text-red-400",
      label: "Needs Work",
      labelColor: "text-red-400"
    };
  };

  const style = getScoreStyle(score);

  return (
    <div className="flex flex-col items-center gap-2">
       <h1 className="text-xl font-semibold text-gray-50 leading-snug mb-1.5">
                  Match Score
                </h1>
      <div className={`w-30 h-30 ${style.ring} rounded-full flex items-center justify-center`}>
        <div className="bg-gray-900 w-26 h-26 rounded-full flex flex-col items-center justify-center">
          <span className={`text-3xl font-bold tracking-tight ${style.text}`}>{score} %</span>
          
        </div>
      </div>
      <span className={`text-xl font-medium ${style.labelColor}`}>{style.label}</span>
    </div>
  );
};

export default MatchScore;
