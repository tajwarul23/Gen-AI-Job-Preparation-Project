import { Check, Sparkles } from "lucide-react";

const JobStudioCard = () => {
  return (
    <div className="bg-surface border border-line rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-violet/40 transition-all group shadow-sm">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-violet/10 border border-violet-border flex items-center justify-center text-violet-text group-hover:scale-110 transition-transform">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>
        <h3 className="text-2xl font-bold font-display text-ink mb-3">
          AI Job Studio & Hiring Intelligence
        </h3>
        <p className="text-muted text-xs sm:text-sm leading-relaxed mb-6">
          From a simple role idea to a complete hiring blueprint. Generate job
          descriptions, uncover essential competencies, and create structured
          evaluation signals to attract and assess the right candidates.
        </p>
        <div className="space-y-2 font-sans text-xs text-ink/80 border-t border-line pt-4 mb-6">
          <div className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-violet-text shrink-0" />
            <span>Intelligent Job Description Creation</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-violet-text shrink-0" />
            <span>Candidate Evaluation Signals</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-violet-text shrink-0" />
            <span>Skill Benchmark Discovery</span>
          </div>
        </div>
      </div>
      <div className="p-3.5 bg-overlay border border-line rounded-xl text-xs font-sans text-muted flex items-center justify-between">
        <span>Role Intelligence Generated</span>
        <span className="text-violet-text font-bold">
          Assessment Framework Ready
        </span>
      </div>
    </div>
  );
};

export default JobStudioCard;
