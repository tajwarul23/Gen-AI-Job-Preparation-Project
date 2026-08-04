import { Check, Target } from "lucide-react"


const ResumeAnalyzerCard = () => {
  return (
    <div className="bg-surface border border-violet-border rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-violet transition-all group relative overflow-hidden md:col-span-2 lg:col-span-1 shadow-sm">
              <div className="absolute top-0 right-0 w-28 h-28 bg-violet/10 rounded-full blur-2xl pointer-events-none" />
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-violet/10 border border-violet-border flex items-center justify-center text-violet group-hover:scale-110 transition-transform">
                    <Target className="w-6 h-6" />
                  </div>
                  
                </div>
                <h3 className="text-xl font-bold font-display text-ink mb-2">AI Resume Analyzer</h3>
                <p className="text-muted text-xs sm:text-sm leading-relaxed mb-4">
                  Analyzes your resume against any provided job description to calculate your <strong>Match Score</strong>, extract <strong>Skill Gaps</strong>, generate <strong>Technical & Behavioral Questions</strong>, and provide an actionable <strong>Skill Gap Roadmap</strong>.
                </p>
                <div className="space-y-1.5 font-sans text-xs text-ink/80 border-t border-line pt-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-violet shrink-0" />
                    <span>Match Score & Executive Feedback</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-violet shrink-0" />
                    <span>Technical & Behavioral Questions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-violet shrink-0" />
                    <span>Identified Skill Gaps & Roadmap</span>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-overlay border border-line rounded-xl text-xs font-sans text-violet flex items-center justify-between font-bold">
                <span>Interactive AI Analysis</span>
                <span>Match Score + Roadmap</span>
              </div>
            </div>
  )
}

export default ResumeAnalyzerCard