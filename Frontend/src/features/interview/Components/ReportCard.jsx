
import { Link } from 'react-router-dom'

const ReportCard = ({r}) => {
    const progressStyles = [
  {
    badge: "bg-red-500/10 text-red-400",
    bar: "bg-red-400",
  },
  {
    badge: "bg-yellow-500/10 text-yellow-400",
    bar: "bg-yellow-400",
  },
  {
    badge: "bg-blue-500/10 text-blue-400",
    bar: "bg-blue-400",
  },
  {
    badge: "bg-green-500/10 text-green-400",
    bar: "bg-green-400",
  },
];
    let ind ;
    if(r.matchScore <= 25)ind=0;
    else if(r.matchScore > 25 && r.matchScore <=50)ind=1;
    else if(r.matchScore > 50 && r.matchScore <= 75)ind = 2;
    else  ind = 3;
  return (
    
            <div
              key={r._id}
              className="bg-surface border border-line rounded-2xl p-5
              hover:border-violet/40 transition-all duration-200"
            >
              
              {/* Top */}
              <div className="flex items-start justify-between mb-5">
                <div>
                  <h1 className="text-lg font-semibold text-ink">{r.title}</h1>

                  <p className="text-sm text-muted mt-1">
                    {new Date(r.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {/* Match Score Area */}
<div className="mb-5">

  {/* Top Row */}
  <div className="flex items-center justify-between mb-2">
    
    <p className="text-sm text-muted">
      Match Score
    </p>

    <div className={`px-3 py-1 rounded-full ${progressStyles[ind].badge} text-xs font-semibold`}>
      {r.matchScore}%
    </div>

  </div>

  {/* Progress Bar */}
  <div className="w-full h-2 bg-overlay rounded-full overflow-hidden">

    <div
      className={`h-full ${progressStyles[ind].bar} rounded-full transition-all duration-500`}
      style={{ width: `${r.matchScore}%` }}
    />

  </div>

  {/* Optional Bottom Text */}
  <div className="flex justify-between mt-2 text-xs text-muted">
    <span>Low Match</span>
    <span>Strong Match</span>
  </div>

</div>

              {/* Bottom */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted">
                  AI-generated interview insights
                </p>

                <Link
                  to={`/interview/${r._id}`}
                  className="inline-flex items-center justify-center
                  bg-violet hover:bg-violet/80
                  text-white text-sm font-medium
                  px-4 py-2 rounded-xl
                  transition active:scale-95"
                >
                  View Report
                </Link>
              </div>
            </div>
  )
}

export default ReportCard