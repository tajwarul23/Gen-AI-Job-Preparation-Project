import { useEffect } from "react";
import { useInterview } from "../Hooks/useInterview";

import AllReportSkeleton from "./AllReportSkeleton";
import ReportCard from "../Components/ReportCard";

const AllReports = () => {
  const { reports, loading, getAllReport } = useInterview();
  
  useEffect(() => {
      if (!reports || reports.length === 0) {
    getAllReport();
  }
  }, []);

  if (loading && !reports) {
    return <AllReportSkeleton />;
  }

  return (
    <div className="min-h-screen text-white font-display">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <p className="text-violet uppercase font-mono tracking-wider text-sm">
            // Interview Reports
          </p>

          <h1 className="text-4xl sm:text-5xl font-black text-ink font-display mt-3">
            Your Analysis History
          </h1>

          <p className="text-muted mt-3">Total Reports: {reports.length}</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {reports?.map((r,i) => (
            <ReportCard r={r} key={i}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllReports;
