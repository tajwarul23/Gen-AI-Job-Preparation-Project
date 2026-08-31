import { Briefcase, MapPin, SignalHigh, Users, Wallet } from "lucide-react";

const statusStyles = {
  OPEN: "border-emerald-400/30 bg-emerald-400/10 text-emerald-400",
  DRAFT: "border-amber-400/30 bg-amber-400/10 text-amber-400",
  CLOSED: "border-line bg-ink/5 text-muted",
};
const formatSalary = (min, max, currency) => {
  const fmt = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "USD",
    maximumFractionDigits: 0,
  });
  if (!min && !max) return "Not disclosed";
  if (min && max) return `${fmt.format(min)} – ${fmt.format(max)}`;
  return fmt.format(min || max);
};
const RecruitPipelineJobList = ({
  jobs = [],
  selectedJobId,
  setSelectedJobId,
}) => {
  return (
    <div className="rounded-2xl border border-line bg-surface p-4 ">
      <div className="mb-4">
        <h2 className="text-sm font-bold text-ink">Jobs</h2>
        <p className="mt-1 text-sm text-muted">
          Select a job to view applicants
        </p>
      </div>

      <div className="flex flex-col gap-2 ">
        {jobs.map((job) => {
          const isSelected = selectedJobId === job._id;

          return (
  <button
    key={job._id}
    type="button"
    onClick={() => setSelectedJobId(job._id)}
    className={`
      group w-full rounded-xl border p-3 text-left
      transition-all duration-200
      cursor-pointer
      ${
        isSelected
          ? "border-violet bg-violet/10 shadow-sm shadow-violet/10"
          : "border-line bg-surface hover:-translate-y-0.5 hover:border-violet/40 hover:bg-overlay hover:shadow-md hover:shadow-black/5"
      }
    `}
  >
    <div className="flex items-start gap-3 ">
      <div
        className={`
          mt-0.5 shrink-0 rounded-lg p-2
          transition-colors
          ${
            isSelected
              ? "bg-violet/20 text-violet"
              : "bg-ink/5 text-muted group-hover:bg-violet/10 group-hover:text-violet"
          }
        `}
      >
        <Briefcase className="h-4 w-4" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex  items-start justify-between gap-2">
          <h3
            className={`
               text-sm font-semibold leading-5 mb-3
              transition-colors
              ${isSelected ? "text-violet" : "text-ink"}
            `}
          >
            {job.title}
          </h3>

          {job.status && (
            <span
              className={`
                shrink-0 rounded-full border px-2 py-0.5
                text-[9px] font-mono font-bold uppercase tracking-wide
                ${statusStyles[job.status] ?? statusStyles.closed}
              `}
            >
              {job.status}
            </span>
          )}
        </div>

        <div className="mb-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
          {job.location && (
            <span className="flex items-center gap-1 text-xs text-muted">
              <MapPin className="h-3 w-3 shrink-0" />
              <span className="truncate">{job.location}</span>
            </span>
          )}

          {job?.experienceLevel && (
            <span className="flex items-center gap-1 text-xs text-muted">
              <SignalHigh className="h-3 w-3 shrink-0" />
              <span className="">{job.experienceLevel} LEVEL</span>
            </span>
          )}
          {typeof job.applicantsCount === "number" && (
            <span
              className={`
                flex items-center gap-1 rounded-full border px-2 py-0.5
                text-sm font-mono font-bold
                transition-colors mt-2
                ${
                  job.applicantsCount > 0
                    ? "border-violet/30 bg-violet/10 text-violet group-hover:border-violet/50 group-hover:bg-violet/15"
                    : "border-line bg-ink/5 text-muted"
                }
              `}
            >
              <Users className="h-3 w-3 shrink-0" />
              {job.applicantsCount}{" "}
              {job.applicantsCount === 1 ? "applicant" : "applicants"}
            </span>
          )}


          {job?.salary && (
            <span className="flex items-center gap-1 mt-2 text-xs text-muted">
              <Wallet className="h-3 w-3 shrink-0" />
              <span className="truncate">
                {formatSalary(
                  job.salary?.salaryMin,
                  job.salary?.salaryMax,
                  job.salary?.currency,
                )}
              </span>
            </span>
          )}
        </div>
      </div>
    </div>
  </button>
);
        })}

        {jobs.length === 0 && (
          <p className="py-6 text-center text-xs text-muted">
            No open positions yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default RecruitPipelineJobList;