import  { useState } from 'react'

const DayCard = ({ day, focus, tasks }) => {
   const [isOpen, setIsOpen] = useState(false);
  
    return (
      <div className={`w-full border rounded-xl overflow-hidden transition-colors  ${
        isOpen ? "border-linehov" : "border-line"
      } bg-surface`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left cursor-pointer"
        >
          <div className="flex justify-self-start  items-center gap-3 flex-1 min-w-0 md:min-w-xl">
            <span className="min-w-6 h-6 bg-overlay border border-line rounded-md flex items-center justify-center text-xs font-mono font-medium text-muted mt-0.5">
              {day}
            </span>
            <span className="text-[15px] font-medium text-ink leading-relaxed font-sans">
             Day No : {day}
            </span>
          </div>
          <svg
            className={`w-4 h-4 text-muted shrink-0 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none" viewBox="0 0 16 16"
          >
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {isOpen && (
          <div className="px-5 pb-5 pl-[calc(1.25rem+24px+12px)] flex flex-col gap-2.5">
            <div className="border border-teal/30 bg-teal/5 rounded-lg p-4">
              <p className="text-[11px] font-mono font-medium text-muted uppercase tracking-widest mb-1">Focus</p>
              <p className="text-sm text-ink leading-relaxed font-sans">{focus}</p>
            </div>
           {
            tasks.map((t,i)=>( <div key={i} className="border border-line rounded-lg p-4">
              <p className="text-[11px] font-mono font-medium text-muted uppercase tracking-widest mb-1">Task:{i+1}</p>
              <p className="text-sm text-ink leading-relaxed font-sans">{t}</p>
            </div>))
           }
          </div>
        )}
      </div>
    );
}

export default DayCard