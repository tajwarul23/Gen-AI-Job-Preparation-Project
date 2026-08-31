import { useEffect, useState } from "react";
import { useGetCompany } from "../Hooks/useCompany";
import { useGetCompanyJobFeed } from "../Hooks/useJob";
import toast from "react-hot-toast";

import PipelineHeader from "../Components/PipelineHeader";
import EmptyPipeline from "../Components/EmptyPipeline";
import RecruitPipelineJobList from "../Components/RecruitPipelineJobList";
import RecruitPipelineApplicantInfo from "../Components/RecruitPipelineApplicantInfo";
import RecruitPipelineApplicantList from "../Components/RecruitPipelineApplicantList";
import { useSearchParams } from "react-router-dom";

const RecruitPipeline = () => {
  const { isError, error } = useGetCompany();
  const { data: jobsData } = useGetCompanyJobFeed();

  const [searchParams] = useSearchParams();
  const jobParam = searchParams.get("job");

  const [selectedJobId, setSelectedJobId] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);

  

  
  useEffect(() => {
    const jobs = jobsData?.data?.jobs ?? [];
    if(jobs.length === 0 || selectedJobId)return;

    const jobExists = jobParam && jobs.some((j)=> j._id === jobParam);
    setSelectedJobId(jobExists? jobParam: jobs[0]._id);
  }, [jobsData, selectedJobId, jobParam]);

  // Handle company error
  useEffect(() => {
    if (isError) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch Company Information",
      );
    }
  }, [isError, error]);

  const jobs = jobsData?.data?.jobs ?? [];
  const hasJobs = jobs.length > 0;

  // When recruiter changes job,
  // clear the previously selected applicant
  const [statusFilter, setStatusFilter] = useState("");
  const handleJobChange = (jobId) => {
    setSelectedJobId(jobId);
    setSelectedApplication(null);
    setStatusFilter("");
  };

  return (
    <div className="mx-auto min-h-screen max-w-7xl px-4 sm:px-6 lg:px-8">
      <PipelineHeader />

      {hasJobs ? (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          {/* JOBS */}
          <div className="lg:col-span-3">
            <RecruitPipelineJobList
              jobs={jobs}
              selectedJobId={selectedJobId}
              setSelectedJobId={handleJobChange}
            />
          </div>

          {/* APPLICANTS */}
          <div className="lg:col-span-4">
            <div className="mb-3">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-sm font-mono font-semibold uppercase tracking-wider text-muted">
                  Sort Applicants by Application Status
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => setStatusFilter("")}
                  className={`
        rounded-lg border px-2.5 py-1.5
        text-sm font-semibold transition-colors
        cursor-pointer
        ${
          statusFilter === ""
            ? "border-violet bg-violet/10 text-violet"
            : "border-line bg-surface text-muted hover:border-violet/30 hover:text-violet"
        }
      `}
                >
                  All
                </button>
                <button
                  type="button"
                  onClick={() => setStatusFilter("applied")}
                  className={`
        rounded-lg border px-2.5 py-1.5
        text-sm font-semibold transition-colors
        cursor-pointer
        ${
          statusFilter === "applied"
            ? "border-violet bg-violet/10 text-violet"
            : "border-line bg-surface text-muted hover:border-violet/30 hover:text-violet"
        }
      `}
                >
                  Applied
                </button>

                <button
                  type="button"
                  onClick={() => setStatusFilter("interview")}
                  className={`
        rounded-lg border px-2.5 py-1.5
        text-sm font-semibold transition-colors
        cursor-pointer
        ${
          statusFilter === "interview"
            ? "border-amber-400/40 bg-amber-400/10 text-amber-400"
            : "border-line bg-surface text-muted hover:border-amber-400/30 hover:text-amber-400"
        }
      `}
                >
                  Interviewed
                </button>

                <button
                  type="button"
                  onClick={() => setStatusFilter("shortlisted")}
                  className={`
        rounded-lg border px-2.5 py-1.5
        text-sm font-semibold transition-colors
        cursor-pointer
        ${
          statusFilter === "shortlisted"
            ? "border-blue-400/40 bg-blue-400/10 text-blue-400"
            : "border-line bg-surface text-muted hover:border-blue-400/30 hover:text-blue-400"
        }
      `}
                >
                  Shortlisted
                </button>

                <button
                  type="button"
                  onClick={() => setStatusFilter("hired")}
                  className={`
        rounded-lg border px-2.5 py-1.5
        text-sm font-semibold transition-colors
        cursor-pointer
        ${
          statusFilter === "hired"
            ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-400"
            : "border-line bg-surface text-muted hover:border-emerald-400/30 hover:text-emerald-400"
        }
      `}
                >
                  Hired
                </button>

                <button
                  type="button"
                  onClick={() => setStatusFilter("rejected")}
                  className={`
        rounded-lg border px-2.5 py-1.5
        text-sm font-semibold transition-colors
        cursor-pointer
        ${
          statusFilter === "rejected"
            ? "border-red-400/40 bg-red-400/10 text-red-400"
            : "border-line bg-surface text-muted hover:border-red-400/30 hover:text-red-400"
        }
      `}
                >
                  Rejected
                </button>
              </div>
            </div>
            <RecruitPipelineApplicantList
              selectedJobId={selectedJobId}
              selectedApplication={selectedApplication}
              setSelectedApplication={setSelectedApplication}
              statusFilter={statusFilter}
            />
          </div>

          {/* APPLICANT INFO */}
          <div className="lg:col-span-5">
            <RecruitPipelineApplicantInfo application={selectedApplication} />
          </div>
        </div>
      ) : (
        <main className="mx-auto max-w-5xl">
          <EmptyPipeline />
        </main>
      )}
    </div>
  );
};

export default RecruitPipeline;
