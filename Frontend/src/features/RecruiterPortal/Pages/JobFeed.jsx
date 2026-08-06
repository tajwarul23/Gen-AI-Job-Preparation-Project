import { Plus, Building2, Globe } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetCompany } from "../Hooks/useCompany";
import { useGetCompanyJobFeed, useGetCandidateJobFeed } from "../Hooks/useJob";
import JobCard from "../Components/JobCard";
import EmptyPipeline from "../Components/EmptyPipeline";

const JobFeed = () => {
  const [viewMode, setViewMode] = useState("company");
  const navigate = useNavigate();

  const { data: company } = useGetCompany();
  const { data: companyJobs } = useGetCompanyJobFeed();
  const { data: platformJobs } = useGetCandidateJobFeed();

  const activeData = viewMode === "company" ? companyJobs : platformJobs;
  const hasJobs = activeData?.data?.count;
  const jobList = activeData?.data?.jobs || [];

  return (
    <div className="min-h-screen bg-app">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* View toggle */}
        <div className="flex items-center justify-center sm:justify-start mb-6">
          <div className="inline-flex bg-overlay border border-line rounded-xl p-1 gap-1">
            <button
              onClick={() => setViewMode("company")}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-2 ${
                viewMode === "company"
                  ? "bg-teal text-app shadow-sm"
                  : "text-muted hover:text-ink"
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              My Company
            </button>
            <button
              onClick={() => setViewMode("platform")}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-2 ${
                viewMode === "platform"
                  ? "bg-teal text-app shadow-sm"
                  : "text-muted hover:text-ink"
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              All Platform Jobs
            </button>
          </div>
        </div>

        {/* Header */}
        <div className="bg-surface border border-line rounded-2xl p-6 shadow-sm mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-line pb-6">
            <div className="flex items-center gap-4">
              <img
                src={
                  company?.data?.logoUrl ||
                  "https://lh3.googleusercontent.com/d/1zC9f8t_G0wzX7b5Y9iU_pZ9y-T3D2oOa=w100-h100-cc"
                }
                alt={company?.data?.companyName}
                className="w-14 h-14 rounded-2xl object-cover border border-violet-border bg-overlay"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold font-display text-ink">
                    {viewMode === "company"
                      ? `${company?.data?.companyName} Job Feed`
                      : "Platform Job Feed"}
                  </h1>
                  <span className="text-[10px] font-mono uppercase bg-violet/10 text-violet-text border border-violet-border px-2 py-0.5 rounded-full font-bold">
                    {viewMode === "company" ? "Official Feed" : "All Companies"}
                  </span>
                </div>
                <p className="text-xs text-muted font-sans mt-0.5">
                  {viewMode === "company"
                    ? `Manage active postings, update job parameters, and track applicant pipelines for ${company?.data?.companyName}`
                    : "Browse every open role currently live across the platform"}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
              <button
                onClick={() => navigate("/recruiter/jobStudio")}
                className="px-4 py-2 bg-violet hover:bg-violet/90 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <Plus className="w-4 h-4" />
                Post New Role
              </button>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 text-xs font-mono">
            <div className="bg-overlay border border-line rounded-xl p-3">
              <span className="text-muted block text-[10px] uppercase">
                Active Openings
              </span>
              <span className="text-lg font-bold text-teal font-display">
                {hasJobs || 0}
              </span>
            </div>

            {viewMode === "company" && (
              <>
                <div className="bg-overlay border border-line rounded-xl p-3">
                  <span className="text-muted block text-[10px] uppercase">
                    Company Roles
                  </span>
                  <span className="text-lg font-bold text-ink font-display">
                    {hasJobs || 0}
                  </span>
                </div>

                <div className="bg-overlay border border-line rounded-xl p-3">
                  <span className="text-muted block text-[10px] uppercase">
                    Industry
                  </span>
                  <span className="text-xs font-bold text-ink truncate block mt-1">
                    {company?.data?.industry || "Technology"}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Job Feed */}
        {jobList.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {jobList.map((job) => (
              <JobCard key={job._id || job.id} job={job} />
            ))}
          </div>
        ) : (
          <EmptyPipeline from="jobFeed" />
        )}
      </div>
    </div>
  );
};

export default JobFeed;
