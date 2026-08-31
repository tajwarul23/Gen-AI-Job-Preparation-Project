import { useInterview } from "../Hooks/useInterview";
import QuestionCard from "../Components/QuestionCard";

const TechnicalQuestion = () => {
  const { report } = useInterview();
  const { technicalQuestions } = report;
  return (
    <div>
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center justify-between gap-3">
          <h2 className="text-base font-bold font-display text-ink leading-snug mb-1.5">Technical Questions of {report.title}</h2>
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
