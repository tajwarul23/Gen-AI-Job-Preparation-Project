import { Check, FileText } from "lucide-react"


const ResumeBuilderCard = () => {
  return (
    <div className="bg-surface border border-line rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-violet/40 transition-all group shadow-sm">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-violet/10 border border-violet-border flex items-center justify-center text-violet group-hover:scale-110 transition-transform">
                    <FileText className="w-6 h-6" />
                  </div>
                 
                </div>
                <h3 className="text-xl font-bold font-display text-ink mb-2">AI Resume Builder</h3>
                <p className="text-muted text-xs sm:text-sm leading-relaxed mb-4">
                  Builds an ATS-friendly resume using AI. Re-writes bullet points to emphasize quantifiable impact metrics, optimizes keyword density, and outputs Schema.org JSON-LD structured data.
                </p>
                <div className="space-y-1.5 font-sans text-xs text-ink/80 border-t border-line pt-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-violet shrink-0" />
                    <span>Metric-Driven Bullet Alternatives</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-violet shrink-0" />
                    <span>Schema.org JSON-LD Metadata</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-violet shrink-0" />
                    <span>High-Density ATS Keyword Sync</span>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-overlay border border-line rounded-xl text-xs font-sans text-muted flex items-center justify-between">
                <span>ATS Compatibility</span>
                <span className="text-violet font-bold">100% Validated</span>
              </div>
            </div>
  )
}

export default ResumeBuilderCard