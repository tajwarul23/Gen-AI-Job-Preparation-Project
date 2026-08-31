import DayCard from "../Components/DayCard";

import { useInterview } from "../Hooks/useInterview"


const Roadmap = () => {
        
  const {report} = useInterview();
  const {preparationPlan} = report
   return (
    <div>
      <div className="max-w-xl mx-auto">
        <div className="flex flex-col items-center justify-between gap-3">
            <h2 className="text-base font-bold font-display text-ink leading-snug mb-1.5">Roadmap of {report.title}</h2>
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