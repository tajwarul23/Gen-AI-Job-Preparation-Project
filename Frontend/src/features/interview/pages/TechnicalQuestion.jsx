import { useInterview } from "../Hooks/useInterview";
import QuestionCard from "../Components/QuestionCard";

const TechnicalQuestion = () => {
  const { report } = useInterview();
  const { technicalQuestions } = report;
  return (
    <div className="min-h-screen font-display">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex flex-col items-center justify-between gap-4">
          <h1 className="text-xl font-semibold text-gray-50 leading-snug mb-1.5 tracking-wide">Technical Questions of {report.title}</h1>
          {technicalQuestions.map((q, i) => (
            <QuestionCard
              key={q.question}
              index={i + 1}
              question={q.question}
              intention={q.intention}
              answer={q.answer}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechnicalQuestion;
