import { Briefcase, Building2, CheckCircle2, Plus } from 'lucide-react'

import { useGetCompany } from '../Hooks/useCompany'
import { useNavigate } from 'react-router-dom';

const EmptyPipeline = ({from}) => {
    const {data} = useGetCompany();
    const navigate = useNavigate();
  return (
   <div className="bg-surface border border-line rounded-2xl p-6 sm:p-10 space-y-8 mb-10">
            {/* Header Banner */}
            {
              from === "jobFeed" ? <></>: (<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-gradient-to-r from-violet/10 via-surface to-teal/10 border border-line rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-violet/20 border border-violet/30 flex items-center justify-center text-violet-text shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-display text-ink">
                    {  data?.data?.companyName}'s Workspace
                    
                  </h3>
                  <p className="text-xs text-muted font-mono">
                    Status: Initialized • 0 Active Job Openings
                  </p>
                </div>
              </div>
             
            </div>)
            }

            {/* Main Empty Hero Box */}
            <div className="text-center max-w-2xl mx-auto py-6 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-overlay border border-line flex items-center justify-center mx-auto text-muted">
                <Briefcase className="w-8 h-8 text-teal" />
              </div>
              <h3 className="text-xl font-bold font-display text-ink">
                Your Recruiter Pipeline is Clean & Ready
              </h3>
              <p className="text-xs text-muted leading-relaxed font-sans max-w-lg mx-auto">
                There are no active job openings or candidates in your pipeline
                yet. Publish a job role to start accepting candidate
                applications or import candidate profiles directly.
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => navigate("/recruiter/jobStudio")}
                  className="px-5 py-2.5 bg-teal hover:bg-teal/90 text-app text-xs font-bold rounded-xl transition-all cursor-pointer shadow-md shadow-teal/10 flex items-center gap-2 font-sans"
                >
                  <Plus className="w-4 h-4" />
                  Create First Job Opening
                </button>
                
              </div>
            </div>

            {/* Onboarding Setup Steps */}
            <div className="border-t border-line pt-6">
              <h4 className="text-xs font-mono text-muted uppercase font-bold mb-4 tracking-wider">
                QUICK START CHECKLIST FOR NEW RECRUITERS
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-overlay border border-line rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-teal font-bold uppercase">
                      STEP 1
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-teal" />
                  </div>
                  <h5 className="text-xs font-bold text-ink">
                    Initialize Workspace
                  </h5>
                  <p className="text-[11px] text-muted leading-normal font-sans">
                    Company node configured for{" "}
                    {"DataCore Systems"}.
                  </p>
                </div>

                <div className="p-4 bg-overlay border border-line rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-violet-text font-bold uppercase">
                      STEP 2
                    </span>
                    <span className="text-[10px] font-mono text-muted">
                      PENDING
                    </span>
                  </div>
                  <h5 className="text-xs font-bold text-ink">
                    Post Your First Job
                  </h5>
                  <p className="text-[11px] text-muted leading-normal font-sans">
                    Use Job Studio to set up position specs and candidate match
                    criteria.
                  </p>
                </div>

                <div className="p-4 bg-overlay border border-line rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-muted font-bold uppercase">
                      STEP 3
                    </span>
                    <span className="text-[10px] font-mono text-muted">
                      READY
                    </span>
                  </div>
                  <h5 className="text-xs font-bold text-ink">
                    Recruit & Screen
                  </h5>
                  <p className="text-[11px] text-muted leading-normal font-sans">
                    Applicants will automatically populate this Kanban pipeline.
                  </p>
                </div>
              </div>
            </div>
          </div>
  )
}

export default EmptyPipeline