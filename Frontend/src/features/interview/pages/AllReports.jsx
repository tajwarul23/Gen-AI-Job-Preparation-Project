import { useEffect } from "react";
import { useInterview } from "../Hooks/useInterview";

import AllReportSkeleton from "./AllReportSkeleton";
import ReportCard from "../Components/ReportCard";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { NotebookPen } from "lucide-react";

const AllReports = () => {
  const { reports, loading, getAllReport, error } = useInterview();

  useEffect(() => {
    getAllReport();
  }, []);
  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);
  if (loading) {
    return <AllReportSkeleton />;
  }
  if (error) {
    return <div className="text-red-400 text-4xl text-center">{error}</div>;
  }
  if (!reports?.length) {
    return (
      <div className=" text-white font-display">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-1">
              <NotebookPen className="w-5 h-5 text-teal" />
              <h1 className="text-xl lg:text-2xl font-bold font-display text-ink">
                Your Analysis History
              </h1>
            </div>

            <p className="text-xs sm:text-sm text-muted font-sans mb-6">
              Total Reports: {reports?.length || 0}
            </p>
          </div>
          <Link
            className="rounded-xl bg-violet px-5 py-1.5 text-white text-lg cursor-pointer font-display"
            to={"/resume-analyzer"}
          >
            Analyze Resume →
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
          <div className="flex items-center gap-2 mb-1">
            <NotebookPen className="w-5 h-5 text-teal" />
            <h1 className="text-xl lg:text-2xl font-bold font-display text-ink">
              Your Analysis History
            </h1>
          </div>

          <p className="text-xs text-muted font-sans mb-6">
            Total Reports: {reports?.length || 0}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {reports?.map((r, i) => (
            <ReportCard r={r} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllReports;
