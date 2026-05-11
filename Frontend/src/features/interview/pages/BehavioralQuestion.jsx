import QuestionCard from "../Components/QuestionCard";
import { useInterview } from "../Hooks/useInterview";


const BehavioralQuestion = () => {
    const { report } = useInterview();
  const { behavioralQuestions } = report;
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex flex-col items-center justify-between gap-4">
            <h1 className="text-xl font-semibold text-gray-50 leading-snug mb-1.5 tracking-wide">Behavioral Questions of {report.title}</h1>
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