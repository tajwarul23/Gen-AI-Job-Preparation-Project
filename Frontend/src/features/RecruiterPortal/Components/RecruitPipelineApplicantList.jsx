import { useEffect } from "react";
import {
  CalendarClock,
  CheckCircle2,
  FileText,
  Loader2,
  Mail,
  Star,
  UserRound,
  XCircle,
} from "lucide-react";
import {
  useGetAllApplicationForCompany,
  useUpdateApplicationStatus,
} from "../Hooks/useApplication";

const statusStyles = {
  applied: "bg-violet/10 text-violet",
  shortlisted: "bg-blue-400/10 text-blue-400",
  rejected: "bg-red-400/10 text-red-400",
  hired: "bg-emerald-400/10 text-emerald-400",
};

const RecruitPipelineApplicantList = ({
  selectedJobId,
  selectedApplication,
  setSelectedApplication,
  statusFilter,
}) => {
  const { data, isLoading, isError, error } = useGetAllApplicationForCompany({
    job: selectedJobId,
    status: statusFilter,
  });

  const {
    mutate: UpdateApplicationStatus,
    isPending,
    variables: pendingVariables,
  } = useUpdateApplicationStatus();

  const handleUpdateApplicationStatus = (applicationId, status) => {
    UpdateApplicationStatus({
      applicationId,
      status,
    });
  };
  const isActionPending = (applicationId, status) => {
    return (
      isPending &&
      pendingVariables?.applicationId === applicationId &&
      pendingVariables?.status === status
    );
  };
  const applications = data?.data?.applications ?? [];

  // Automatically select first applicant
  useEffect(() => {
    if (applications.length === 0) {
      setSelectedApplication(null);
      return;
    }

    const selectedStillExists = applications.some(
      (application) => application._id === selectedApplication?._id,
    );

    if (!selectedStillExists) {
      setSelectedApplication(applications[0]);
    }
  }, [applications, selectedApplication, setSelectedApplication]);

  const handleViewResume = (resumeId) => {
    window.open(`/resume/${resumeId}`, "_blank", "noopener,noreferrer");
  };

  const handleContactEmail = (email) => {
    if (!email) return;

    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`,
      "_blank",
    );
  };

  if (!selectedJobId) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-line bg-surface p-8 text-center">
        <UserRound className="h-8 w-8 text-muted" />
        <p className="mt-3 text-sm text-muted">
          Select a job to view applicants.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-line bg-surface p-4">
        <div className="mb-4 h-4 w-24 animate-pulse rounded bg-ink/10" />
        <div className="flex flex-col gap-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-16 animate-pulse rounded-xl border border-line bg-ink/5"
            />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-red-400/20 bg-red-400/5 p-6 text-center">
        <p className="text-sm text-red-400">
          {error?.response?.data?.message || "Failed to load applicants"}
        </p>
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-line bg-surface p-8 text-center">
        <UserRound className="h-8 w-8 text-muted" />
        <p className="mt-3 text-sm font-semibold text-ink">No applicants yet</p>
        <p className="mt-1 text-xs text-muted">
          Applicants for this job will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {applications.map((application) => {
        const isSelected = application._id === selectedApplication?._id;
        const candidate = application.candidate;
        const matchScore = application.recruiterReport?.matchScore;

        const stop = (fn) => (e) => {
          e.stopPropagation();
          fn();
        };

        return (
          <div
            key={application._id}
            role="button"
            tabIndex={0}
            onClick={() => setSelectedApplication(application)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setSelectedApplication(application);
              }
            }}
            className={`
            group w-full rounded-xl border p-3 text-left
            transition-all duration-200
            cursor-pointer
            ${
              isSelected
                ? "border-violet shadow-sm shadow-violet/10"
                : "border-line bg-surface hover:-translate-y-0.5 hover:border-violet/40 hover:bg-overlay hover:shadow-md hover:shadow-black/5"
            }
          `}
          >
            <div className="flex items-start gap-3">
              <div
                className={`
                flex h-9 w-9 shrink-0 items-center justify-center
                rounded-full text-sm font-bold
                transition-colors
                ${
                  isSelected
                    ? "bg-violet text-white"
                    : "bg-ink/10 text-muted group-hover:bg-violet/10 group-hover:text-violet"
                }
              `}
              >
                {candidate?.userName?.[0]?.toUpperCase() ?? (
                  <UserRound className="h-4 w-4" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                {/* - NAME + STATUS - */}
                <div className="flex items-start justify-between gap-2">
                  <h3
                    className={`
                    truncate text-sm font-semibold
                    transition-colors
                    ${isSelected ? "text-violet" : "text-ink"}
                  `}
                  >
                    {candidate?.userName || "Unknown Candidate"}
                  </h3>

                  <div className="flex shrink-0 items-center gap-1.5">
                    {matchScore != null && (
                      <span className="rounded-full border border-violet/30 bg-violet/10 px-1.5 py-0.5 text-[9px] font-mono font-bold text-violet">
                        {matchScore}%
                      </span>
                    )}

                    <span
                      className={`
                      rounded-full px-2 py-0.5
                      text-[9px] font-mono font-bold uppercase
                      ${statusStyles[application.status] ?? "bg-ink/5 text-muted"}
                    `}
                    >
                      {application.status}
                    </span>
                  </div>
                </div>

                <p className="mt-1 flex items-center gap-1 truncate text-xs text-muted">
                  <Mail className="h-3 w-3 shrink-0" />
                  {candidate?.email}
                </p>

                {/* - CONTACT / RESUME (secondary, plain links under candidate info) - */}
                <div className="mt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={stop(() =>
                      handleViewResume(application?.resume?._id),
                    )}
                    className="
                    flex items-center gap-1 text-xs font-semibold text-muted
                    transition-colors
                    hover:text-violet
                    cursor-pointer
                  "
                  >
                    <FileText className="h-3 w-3" />
                    View Resume
                  </button>

                  <button
                    type="button"
                    onClick={stop(() => handleContactEmail(candidate?.email))}
                    className="
                    flex items-center gap-1 text-xs font-semibold text-muted
                    transition-colors
                    hover:text-blue-400
                    cursor-pointer
                  "
                  >
                    <Mail className="h-3 w-3" />
                    Contact via Email
                  </button>
                </div>

                {/* - TAKE ACTION - */}
                <div className="mt-3 border-t border-line pt-2.5">
                  <p className="mb-1.5 text-[9px] font-mono uppercase tracking-wider text-muted">
                    Take Action
                  </p>

                  <div className="flex flex-wrap items-center gap-1.5">
                    <button
                      type="button"
                      onClick={stop(() =>
                        handleUpdateApplicationStatus(
                          application._id,
                          "interview",
                        ),
                      )}
                      className="
                      flex items-center gap-1.5 rounded-lg
                      border border-amber-400/30 bg-amber-400/5 px-2.5 py-1
                      text-[11px] font-semibold text-amber-400
                      transition-colors
                      hover:bg-amber-400/15
                      cursor-pointer
                    "
                    >
                      {isActionPending(application._id, "interview") ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <CalendarClock className="h-3.5 w-3.5" />
                      )}
                      Interview
                    </button>

                    <button
                      type="button"
                      onClick={stop(() =>
                        handleUpdateApplicationStatus(
                          application._id,
                          "shortlisted",
                        ),
                      )}
                      className="
                      flex items-center gap-1.5 rounded-lg
                      border border-blue-400/30 bg-blue-400/5 px-2.5 py-1
                      text-[11px] font-semibold text-blue-400
                      transition-colors
                      hover:bg-blue-400/15
                      cursor-pointer
                    "
                    >
                      {isActionPending(application._id, "shortlisted") ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Star className="h-3.5 w-3.5" />
                      )}
                      Shortlist
                    </button>

                    <button
                      type="button"
                      onClick={stop(() =>
                        handleUpdateApplicationStatus(application._id, "hired"),
                      )}
                      className="
                      flex items-center gap-1.5 rounded-lg
                      border border-emerald-400/30 bg-emerald-400/5 px-2.5 py-1
                      text-[11px] font-semibold text-emerald-400
                      transition-colors
                      hover:bg-emerald-400/15
                      cursor-pointer
                    "
                    >
                      {isActionPending(application._id, "hired") ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      )}
                      Hire
                    </button>

                    <button
                      type="button"
                      disabled={isPending}
                      onClick={stop(() =>
                        handleUpdateApplicationStatus(
                          application._id,
                          "rejected",
                        ),
                      )}
                      className="
                      flex items-center gap-1.5 rounded-lg
                      border border-red-400/30 bg-red-400/5 px-2.5 py-1
                      text-[11px] font-semibold text-red-400
                      transition-colors
                      hover:bg-red-400/15
                      cursor-pointer
                    "
                    >
                      {isActionPending(application._id, "rejected") ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <XCircle className="h-3.5 w-3.5" />
                      )}
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecruitPipelineApplicantList;
