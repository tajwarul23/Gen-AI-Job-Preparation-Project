import { Bot, Check } from "lucide-react";

const AnalyzePrepCard = () => {
  return (
    <div className="bg-surface border border-line rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-violet/40 transition-all group md:col-span-2 lg:col-span-2 shadow-sm">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-violet/10 border border-violet-border flex items-center justify-center text-violet group-hover:scale-110 transition-transform">
            <Bot className="w-6 h-6" />
          </div>
        </div>
        <h3 className="text-xl font-bold font-display text-ink mb-2">
          Analyze & Prep for Specific Job
        </h3>
        <p className="text-muted text-xs sm:text-sm leading-relaxed mb-4">
          Go beyond generic interview practice. Our intelligent engine deciphers
          every job description to reveal the questions, skills, and
          expectations most likely to matter—so you can prepare with confidence.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-sans text-xs text-ink/80 border-t border-line pt-4 mb-4">
          <div className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-violet shrink-0" />
            <span>Precision Match Scoring</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-violet shrink-0" />
            <span>Hidden Skill Gap Discovery</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-violet shrink-0" />
            <span>Personalized Success Blueprint</span>
          </div>
        </div>
      </div>
      <div className="p-3 bg-overlay border border-line rounded-xl text-xs font-sans text-muted flex items-center justify-between">
        <span>Prep Engine</span>
        <span className="text-violet font-bold">Role-Specific Questions</span>
      </div>
    </div>
  );
};

export default AnalyzePrepCard;
