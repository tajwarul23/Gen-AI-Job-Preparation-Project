import { Users } from "lucide-react";

const ApplicantCard = () => {
  return (
    <div className="bg-surface border border-violet-border rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-violet transition-all group relative overflow-hidden shadow-sm">
      <div className="absolute top-0 right-0 w-32 h-32 bg-violet/10 rounded-full blur-2xl pointer-events-none" />
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-purple/10 border border-purple-border flex items-center justify-center text-purple group-hover:scale-110 transition-transform">
            <Users className="w-6 h-6" />
          </div>
        </div>
        <h3 className="text-2xl font-bold font-display text-ink mb-3">
          Applicant Fit Scoring
        </h3>
        <p className="text-muted text-xs sm:text-sm leading-relaxed mb-6">
          View real-time applicant pipelines scored by fit percentage, years
          experience, and core strengths. Make confident hiring decisions
          faster.
        </p>

        {/* Live Candidate Fit Pipeline Preview */}
        <div className="space-y-2.5 mb-6">
          <span className="text-sm font-sans text-muted uppercase block font-bold">
            LIVE SCORED CANDIDATE PIPELINE
          </span>
          {[
  {
    name: "Candidate A",
    role: "Senior Backend Engineer",
    fit: 92,
    exp: "7 Yrs Exp",
    strength: "Node.js architecture, distributed systems, database optimization",
    weakness: "Limited experience with large-scale cloud infrastructure and Kubernetes",
  },
  {
    name: "Candidate B",
    role: "Full Stack Engineer",
    fit: 76,
    exp: "5 Yrs Exp",
    strength: "React ecosystem, API design, modern frontend architecture",
    weakness: "Needs deeper experience with system design and high-traffic applications",
  },
  {
    name: "Candidate C",
    role: "Platform Engineer",
    fit: 58,
    exp: "4 Yrs Exp",
    strength: "Docker, CI/CD pipelines, Redis caching, backend automation",
    weakness: "Limited exposure to distributed systems and production monitoring",
  },
].map((cand, i) => (
            <div
              key={i}
              className="p-3 bg-overlay border border-line rounded-xl text-xs space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="text-ink font-bold">{cand.name}</span>
                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded bg-violet/10 text-violet-text font-sans text-sm font-bold border border-violet-border">
                    {cand.exp}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded font-sans text-sm font-bold border ${
                      cand.fit >= 80
                        ? "bg-teal/10 text-teal border-teal-border"
                        : cand.fit >= 60
                          ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/30"
                          : "bg-red-500/10 text-red-500 border-red-500/30"
                    }`}
                  >
                    {cand.fit}% Fit
                  </span>
                </div>
              </div>
              <div className="text-[11px] text-muted flex items-center justify-between">
                <span>{cand.role}</span>
              </div>
              <p className="text-sm text-ink/80 font-sans pt-1 border-t border-line/60">
                <strong><span className="text-teal/70">Strength</span>:</strong> {cand.strength}
              </p>
              <p className="text-sm text-ink/80 font-sans pt-1 border-t border-line/60">
                <strong><span className="text-yellow-500/70">Weakness</span>:</strong> {cand.weakness}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* <button
                onClick={() => login("recruiter")}
                className="w-full py-3 bg-violet hover:bg-violet/90 text-white font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-violet/20"
              >
                Launch Recruiter Pipeline
                <ArrowRight className="w-4 h-4" />
              </button> */}
    </div>
  );
};

export default ApplicantCard;
