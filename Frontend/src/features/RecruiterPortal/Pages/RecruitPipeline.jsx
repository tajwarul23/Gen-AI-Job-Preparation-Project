import { Briefcase, Building2, CheckCircle2, Plus, Rss } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetCompany } from "../Hooks/useCompany";
import { useEffect } from "react";
import toast from "react-hot-toast";
import PipelineHeader from "../Components/PipelineHeader";
import EmptyPipeline from "../Components/EmptyPipeline";
import JobPipeline from "../Components/JobPipeline";
import PipelineSidebar from "../Components/PipelineSidebar";
import { useGetCompanyJobFeed } from "../Hooks/useJob";

const RecruitPipeline = () => {
  const navigate = useNavigate();
  const {data, isLoading, isError, error} = useGetCompany()
  const {data:jobs} = useGetCompanyJobFeed();
  const hasJobs = jobs?.data?.count;
  useEffect(()=>{
    if(isError){
      toast.error(error?.response?.data?.message || "Failed to fetch Company Information")
    }
  },[error])
return (
  <div className="max-w-7xl mx-auto min-h-screen">
    <PipelineHeader/>
    {hasJobs ? (
      <div className="grid grid-cols-12 gap-8">
        <main className="col-span-9">
          <JobPipeline />
        </main>

        <aside className="col-span-3">
          <PipelineSidebar />
        </aside>
      </div>
    ) : (
      <main className="max-w-5xl mx-auto">
        <EmptyPipeline />
      </main>
    )}
  </div>
);
};

export default RecruitPipeline;
