import {
  CheckCircle2,
  FileText,
  TrendingUp,
  AlertTriangle,
  XCircle,
  User2,
  Loader2,
  Sparkles,
  Briefcase,
} from "lucide-react";
import ReportList from "./ReportList";

const statusStyles = {
  applied: "bg-violet/10 text-violet",
  shortlisted: "bg-blue-400/10 text-blue-400",
  rejected: "bg-red-400/10 text-red-400",
  hired: "bg-emerald-400/10 text-emerald-400",
};

const matchScoreColor = (score) => {
  if (score >= 80) return { text: "text-emerald-400", bar: "bg-emerald-400" };
  if (score >= 50) return { text: "text-amber-400", bar: "bg-amber-400" };
  return { text: "text-red-400", bar: "bg-red-400" };
};

const RecruitPipelineApplicantInfo = ({ application }) => {
  if (!application) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-line bg-surface p-10 text-center">
        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-ink/5">
          <FileText className="h-6 w-6 text-muted" />
        </div>
        <p className="text-sm font-semibold text-ink">Select an applicant</p>
        <p className="mt-1 max-w-[220px] text-xs text-muted">
          Applicant details and recruiter report will appear here.
        </p>
      </div>
    );
  }

  const candidate = application?.candidate;
  const report = application?.recruiterReport;
  const reportStatus = application?.recruiterReportStatus;
  const scoreColor = matchScoreColor(report?.matchScore ?? 0);

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface">
      {/* - CANDIDATE HEADER - */}
      <div className="border-b border-line bg-overlay/50 p-5">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-violet/10 text-xl font-bold text-violet ring-4 ring-violet/5">
            {candidate?.userName?.[0]?.toUpperCase() ?? (
              <User2 className="h-6 w-6" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-lg font-bold leading-tight text-ink">
                {candidate?.userName || "Unknown Candidate"}
              </h2>

              <span
                className={`
                  shrink-0 rounded-full px-2.5 py-1
                  text-[10px] font-mono font-bold uppercase tracking-wide
                  ${statusStyles[application.status] ?? "bg-ink/5 text-muted"}
                `}
              >
                {application.status}
              </span>
            </div>

            <p className="mt-1 truncate text-xs text-muted">{candidate?.email}</p>

            <div className="mt-2 flex items-center gap-1.5 text-xs text-muted">
              <Briefcase className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">Applied for {application.job?.title}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5">
        {/* - REPORT: GENERATING - */}
        {reportStatus === "generating" && (
          <div className="flex items-center gap-3 rounded-xl border border-line bg-overlay p-4">
            <Loader2 className="h-4 w-4 shrink-0 animate-spin text-violet" />
            <div>
              <p className="text-sm font-semibold text-ink">
                Generating AI match report…
              </p>
              <p className="mt-0.5 text-xs text-muted">
                This usually takes a few moments.
              </p>
            </div>
          </div>
        )}

        {/* - REPORT: FAILED - */}
        {reportStatus === "failed" && (
          <div className="rounded-xl border border-red-400/20 bg-red-400/5 p-4">
            <div className="flex items-center gap-2 text-red-400">
              <XCircle className="h-4 w-4" />
              <p className="text-sm font-semibold">Report generation failed</p>
            </div>
            <p className="mt-2 text-xs text-muted">
              Something went wrong generating the AI match report for this
              applicant.
            </p>
          </div>
        )}

        {/* - REPORT: MISSING (no status, legacy application) - */}
        {!report && !reportStatus && (
          <div className="rounded-xl border border-amber-400/20 bg-amber-400/5 p-4">
            <div className="flex items-center gap-2 text-amber-400">
              <AlertTriangle className="h-4 w-4" />
              <p className="text-sm font-semibold">Recruiter report unavailable</p>
            </div>
            <p className="mt-2 text-xs text-muted">
              A recruiter report has not been generated for this applicant yet.
            </p>
          </div>
        )}

        {/* - REPORT: GENERATED - */}
        {report && reportStatus === "generated" && (
          <div className="flex flex-col gap-5">
            {/* AI badge */}
            <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-violet">
              <Sparkles className="h-3.5 w-3.5" />
              Generated by AI — verify before making decisions
            </div>

            {/* Match Score */}
            <div className="rounded-xl border border-line bg-overlay p-4">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[10px] font-mono uppercase tracking-wider text-muted">
                  Match Score
                </p>
                <span className={`text-2xl font-bold ${scoreColor.text}`}>
                  {report.matchScore ?? 0}%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-ink/10">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${scoreColor.bar}`}
                  style={{
                    width: `${Math.min(Math.max(report.matchScore ?? 0, 0), 100)}%`,
                  }}
                />
              </div>
            </div>

            {/* Executive Summary */}
            {report.executiveSummary && (
              <div>
                <p className="mb-2 flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-muted">
                  <FileText className="h-3.5 w-3.5" />
                  Executive Summary
                </p>
                <p className="text-sm leading-6 text-ink/80">
                  {report.executiveSummary}
                </p>
              </div>
            )}

            {report.strengths?.length > 0 && (
              <ReportList
                title="Strengths"
                items={report.strengths}
                icon={CheckCircle2}
                color="text-emerald-400"
              />
            )}

            {report.skillGaps?.length > 0 && (
              <ReportList
                title="Skill Gaps"
                items={report.skillGaps}
                icon={TrendingUp}
                color="text-amber-400"
                type="skillGaps"
              />
            )}

            {report.weaknesses?.length > 0 && (
              <ReportList
                title="Weaknesses"
                items={report.weaknesses}
                icon={XCircle}
                color="text-red-400"
              />
            )}

            {report.hiringRecommendation && (
              <div className="rounded-xl border border-violet/20 bg-violet/5 p-4">
                <p className="mb-2 flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-violet">
                  <Sparkles className="h-3 w-3" />
                  AI Hiring Recommendation
                </p>
                <p className="text-sm font-semibold text-ink">
                  {report.hiringRecommendation}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecruitPipelineApplicantInfo;