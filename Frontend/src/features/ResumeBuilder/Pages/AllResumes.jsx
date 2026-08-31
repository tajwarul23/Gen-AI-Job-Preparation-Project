import { useEffect } from "react";
import { useResume } from "../Hooks/useResume";
import ResumeCard from "./ResumeCard";
import toast from "react-hot-toast";
import AllReportSkeleton from "../../interview/pages/AllReportSkeleton";
import { Link } from "react-router-dom";
import { FileUser } from "lucide-react";

const AllResumes = () => {
  const { getAllResume, resumes, loading, error } = useResume();
  useEffect(() => {
    getAllResume();
  }, []);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);
  if (loading) return <AllReportSkeleton />;
  if (error) {
    return <div className="text-red-400 text-4xl text-center">{error}</div>;
  }
  if (!resumes?.length) {
    return (
      <div className="my-15 text-white font-display">
        <div className="border-t border-line max-w-6xl mx-auto" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-1 min-w-0">
              <FileUser className="w-5 h-5 text-teal shrink-0" />
              <h1 className="text-xl lg:text-2xl font-bold font-display text-ink min-w-0">
                Your Resume History
              </h1>
            </div>

            <p className="text-xs sm:text-sm text-muted font-sans mb-6">
              Total Resumes: {resumes?.length || 0}
            </p>
          </div>
             <Link
            className="rounded-xl bg-violet px-5 py-1.5 text-white text-lg cursor-pointer font-display"
            to={"/resume-analyzer"}
          >
            Build Resume →
          </Link>
        </div>
         
      </div>
    );
  }
  return (
    <div className="min-h-screen text-white font-display">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1 min-w-0">
            <FileUser className="w-5 h-5 text-teal shrink-0" />
            <h1 className="text-xl lg:text-2xl font-bold font-display text-ink min-w-0">
              Your Resumes History
            </h1>
          </div>

          <p className="text-xs sm:text-sm text-muted font-sans mb-6">
            Total Resumes: {resumes?.length || 0}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {resumes?.map((r) => (
            <ResumeCard resume={r} key={r._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllResumes;
