import { Loader2, SquareKanban } from "lucide-react";
import { useGetCandidateApplications } from "./Hooks/useCandidateApplication.js";
import ApplicationColumn from "./Components/ApplicationColumn.jsx";

const COLUMNS = [
  {
    key: "applied",
    label: "Applied",
    accentClass: "border-violet bg-violet/10 text-violet",
    dotClass: "bg-violet",
  },
  {
    key: "interview",
    label: "Interview",
    accentClass: "border-amber-400/40 bg-amber-400/10 text-amber-400",
    dotClass: "bg-amber-400",
  },
  {
    key: "shortlisted",
    label: "Shortlisted",
    accentClass: "border-blue-400/40 bg-blue-400/10 text-blue-400",
    dotClass: "bg-blue-400",
  },
  {
    key: "hired",
    label: "Hired",
    accentClass: "border-emerald-400/40 bg-emerald-400/10 text-emerald-400",
    dotClass: "bg-emerald-400",
  },
  {
    key: "rejected",
    label: "Rejected",
    accentClass: "border-red-400/40 bg-red-400/10 text-red-400",
    dotClass: "bg-red-400",
  },
];

const CandidateDashBoard = () => {
  const { data, isLoading, isError, error } = useGetCandidateApplications();

  const applications = data?.data?.applications ?? [];

  const applicationsByStatus = COLUMNS.reduce((acc, column) => {
    acc[column.key] = applications.filter((app) => app.status === column.key);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-app">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-2 mb-1">
          <SquareKanban className="w-5 h-5 text-teal" />
          <h1 className="text-xl lg:text-2xl font-bold font-display text-ink">
            Application Tracker
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-muted font-sans mb-6">
          Track every job you've applied to, from first application through to
          an offer.
        </p>

        {isLoading && (
          <div className="flex justify-center py-16">
            <Loader2 className="w-6 h-6 text-teal animate-spin" />
          </div>
        )}

        {isError && (
          <div className="rounded-2xl border border-red-400/20 bg-red-400/5 p-6 text-center">
            <p className="text-sm text-red-400">
              {error?.response?.data?.message || "Failed to load your applications"}
            </p>
          </div>
        )}

        {!isLoading && !isError && applications.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-line bg-surface p-10 text-center">
            <SquareKanban className="h-8 w-8 text-muted" />
            <p className="mt-3 text-sm font-semibold text-ink">
              No applications yet
            </p>
            <p className="mt-1 text-xs text-muted">
              Jobs you apply to will show up here, sorted by status.
            </p>
          </div>
        )}

        {!isLoading && !isError && applications.length > 0 && (
         <div className="max-w-7xl mx-auto">
           <div className="flex flex-wrap justify-center gap-4 pb-4">
            {COLUMNS.map((column) => (
              <ApplicationColumn
                key={column.key}
                label={column.label}
                accentClass={column.accentClass}
                dotClass={column.dotClass}
                applications={applicationsByStatus[column.key]}
              />
            ))}
          </div>
         </div>
        )}
      </div>
    </div>
  );
};

export default CandidateDashBoard;
