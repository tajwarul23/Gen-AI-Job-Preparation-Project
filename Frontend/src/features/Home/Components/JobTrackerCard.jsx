import { Check, Kanban } from "lucide-react"


const JobTrackerCard = () => {
  return (
     <div className="bg-surface border border-line rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-violet/40 transition-all group shadow-sm">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-violet/10 border border-violet-border flex items-center justify-center text-violet group-hover:scale-110 transition-transform">
                    <Kanban className="w-6 h-6" />
                  </div>
                 
                </div>
                <h3 className="text-xl font-bold font-display text-ink mb-2">Application Tracker</h3>
                <p className="text-muted text-xs sm:text-sm leading-relaxed mb-4">
                  Interactive drag-and-drop Kanban application tracker. Monitor your applications across Applied, Interviewing, Offered, and Rejected stages with custom interview notes.
                </p>
                <div className="space-y-1.5 font-sans text-xs text-ink/80 border-t border-line pt-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-violet shrink-0" />
                    <span>Application Progress Dashboard</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-violet shrink-0" />
                    <span>AI Hiring Intelligence</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-violet shrink-0" />
                    <span>Resume & Application Records</span>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-overlay border border-line rounded-xl text-xs font-sans text-muted flex items-center justify-between">
                <span>Pipeline View</span>
                <span className="text-violet font-bold">4 Stage Board</span>
              </div>
            </div>
  )
}

export default JobTrackerCard