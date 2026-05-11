import DayCard from "../Components/DayCard";

import { useInterview } from "../Hooks/useInterview"


const Roadmap = () => {
        
  const {report} = useInterview();
  const {preparationPlan} = report
   return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex flex-col items-center justify-between gap-4">
            <h1 className="text-xl font-semibold text-gray-50 leading-snug mb-1.5 tracking-wide">Roadmap of {report.title}</h1>
          {preparationPlan.map((q, i) => (
            <DayCard
              key={i+1}
             day={i+1}
             focus={q.focus}
             tasks={q.tasks}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Roadmap