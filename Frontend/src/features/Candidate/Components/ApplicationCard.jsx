import { Building2, FileText, Loader2 } from "lucide-react";

const getMatchScoreStyles = (score) => {
  if (score >= 80) return "border-emerald-400/30 bg-emerald-400/10 text-emerald-400";
  if (score >= 50) return "border-amber-400/30 bg-amber-400/10 text-amber-400";
  return "border-line bg-ink/5 text-muted";
};

const formatEmploymentType = (value) =>
  value ? value.charAt(0) + value.slice(1).toLowerCase().replace(/_/g, " ") : "";

const ApplicationCard = ({ application }) => {
  const job = application.job;
  const resume = application.resume;

  const handleViewResume = () => {
    if (!resume?._id) return;
    window.open(`/resume/${resume._id}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="rounded-xl border border-line bg-surface p-3 transition-all hover:border-violet/40 hover:shadow-md hover:shadow-black/5">
      <h3 className="text-sm font-semibold text-ink truncate">
        {job?.title || "Untitled Role"}
      </h3>

      <p className="mt-1 flex items-center gap-1 text-xs text-muted truncate">
        <Building2 className="h-3 w-3 shrink-0" />
        {job?.companyName || "Unknown Company"}
      </p>

      <div className="mt-2 flex flex-wrap items-center gap-1.5">
        {job?.employmentType && (
          <span className="rounded-lg border border-line bg-overlay px-2 py-0.5 text-[10px] font-mono uppercase text-muted">
            {formatEmploymentType(job.employmentType)}
          </span>
        )}
        {job?.workMode && (
          <span className="rounded-lg border border-line bg-overlay px-2 py-0.5 text-[10px] font-mono uppercase text-muted">
            {job.workMode}
          </span>
        )}

        {application.recruiterReportStatus === "generated" &&
          application.matchScore != null && (
            <span
              className={`rounded-lg border px-2 py-0.5 text-[10px] font-mono font-bold ${getMatchScoreStyles(application.matchScore)}`}
            >
              {application.matchScore}% Match
            </span>
          )}
        {application.recruiterReportStatus === "generating" && (
          <span className="flex items-center gap-1 rounded-lg border border-line bg-overlay px-2 py-0.5 text-[10px] font-mono text-muted">
            <Loader2 className="h-2.5 w-2.5 animate-spin" />
            Scoring...
          </span>
        )}
      </div>

      <div className="mt-2.5 flex items-center justify-between border-t border-line pt-2">
        <span className="text-[10px] text-muted font-mono">
          Applied {new Date(application.createdAt).toLocaleDateString()}
        </span>

        <button
          type="button"
          disabled={!resume?._id}
          onClick={handleViewResume}
          className="flex items-center gap-1 rounded-lg border border-violet/20 bg-overlay px-2 py-1 text-[10px] font-semibold text-violet/80
            transition-colors hover:border-violet/40 hover:bg-violet/10 hover:text-violet cursor-pointer
            disabled:cursor-not-allowed disabled:opacity-50"
        >
          <FileText className="h-3 w-3" />
          Resume
        </button>
      </div>
    </div>
  );
};

export default ApplicationCard;
