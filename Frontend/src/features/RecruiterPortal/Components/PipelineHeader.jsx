import { Rss } from 'lucide-react';

import { useNavigate } from 'react-router-dom';

const PipelineHeader = () => {
    const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between border-b border-line pb-4 mb-5 mt-5">
            <div>
              <h2 className="text-xl lg:text-2xl font-bold font-display text-ink">
                Active Recruiting Pipelines
              </h2>
              <p className="text-xs text-muted font-mono mt-1">
                EVALUATE AND SEED REAL-TIME CANDIDATES
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate("/recruiter/jobFeed")}
                className="px-3 py-2 bg-overlay hover:bg-surface border border-line text-violet-text text-xs font-bold rounded-xl transition-all cursor-pointer font-sans flex items-center gap-1.5"
              >
                <Rss className="w-3.5 h-3.5 text-violet" />
                Company Job Feed
              </button>
              <button
                onClick={() => navigate("/recruiter/jobStudio")}
                className="px-4 py-2 bg-teal hover:bg-teal/90 text-app text-xs font-bold rounded-xl transition-all cursor-pointer shadow-md shadow-teal/10 font-sans"
              >
                + Create New Job Opening
              </button>
            </div>
          </div>
  )
}

export default PipelineHeader