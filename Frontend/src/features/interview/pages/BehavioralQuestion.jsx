import QuestionCard from "../Components/QuestionCard";
import { useInterview } from "../Hooks/useInterview";


const BehavioralQuestion = () => {
    const { report } = useInterview();
  const { behavioralQuestions } = report;
  return (
    <div>
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center justify-between gap-3">
            <h2 className="text-base font-bold font-display text-ink leading-snug mb-1.5">Behavioral Questions of {report.title}</h2>
          {behavioralQuestions.map((q, i) => (
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
}

export default BehavioralQuestion