import { useState } from "react";


const QuestionCard = ({ index, question, intention, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`border rounded-xl overflow-hidden transition-colors ${
      isOpen ? "border-gray-700" : "border-gray-800"
    } bg-gray-900`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left cursor-pointer"
      >
        <div className="flex items-start gap-3 flex-1">
          <span className="min-w-6 h-6 bg-gray-800 border border-gray-700 rounded-md flex items-center justify-center text-xs font-medium text-gray-400 mt-0.5">
            {index}
          </span>
          <span className="text-[15px] font-medium text-white leading-relaxed">
            {question}
          </span>
        </div>
        <svg
          className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none" viewBox="0 0 16 16"
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {isOpen && (
        <div className="px-5 pb-5 pl-[calc(1.25rem+24px+12px)] flex flex-col gap-2.5">
          <div className="bg-gray-800 rounded-lg p-4">
            <p className="text-[11px] font-medium text-gray-400 uppercase tracking-widest mb-1">Intention</p>
            <p className="text-sm text-gray-200 leading-relaxed">{intention}</p>
          </div>
          <div className="border-2 border-green-900 rounded-lg p-4">
            <p className="text-[11px] font-medium text-gray-400 uppercase tracking-widest mb-1">Answer</p>
            <p className="text-sm text-gray-200 leading-relaxed">{answer}</p>
          </div>
        </div>
      )}
    </div>
  );
};
export default QuestionCard