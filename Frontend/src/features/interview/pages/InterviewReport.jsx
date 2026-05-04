import { useEffect, useState } from "react";
import TechnicalQuestion from "./TechnicalQuestion";
import BehavioralQuestion from "./BehavioralQuestion";
import Roadmap from "./Roadmap";
import { useInterview } from "../Hooks/useInterview";
import { useParams } from "react-router-dom";

const InterviewReport = () => {
  const [activeTab, setActiveTab] = useState("technical");
  const { report, getReportById, loading } = useInterview();
  const { interviewId } = useParams();
  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId);
    }
  }, [interviewId]);

  if (loading || !report) {
    return (
      <main className="loading-screen">
        <h1>Loading your interview plan...</h1>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] lg:grid-cols-[260px_1fr_220px] gap-6">
          {/* Left Sidebar */}
          <aside className="hidden min-h-screen  md:flex flex-col  justify-start gap-20  bg-gray-900 rounded-xl p-4 border border-gray-800">
            <button
              onClick={() => setActiveTab("technical")}
              className={`cursor-pointer w-full mt-2 font-semibold text-sm py-3.5 rounded-xl transition active:scale-95 ${
                activeTab === "technical"
                  ? " bg-blue-600 text-white  hover:text-blue-200"
                  : " bg-blue-950/40 text-white shadow-[0_0_24px_rgba(37,99,235,0.4)]"
              }`}
            >
              Technical Question{" "}
            </button>
            <button
              onClick={() => setActiveTab("behavioral")}
              className={`cursor-pointer w-full mt-2 font-semibold text-sm py-3.5 rounded-xl transition active:scale-95 ${
                activeTab === "behavioral"
                 ? " bg-blue-600 text-white  hover:text-blue-200"
                  : " bg-blue-950/40 text-white shadow-[0_0_24px_rgba(37,99,235,0.4)]"
              }`}
            >
              Behavioral Question{" "}
            </button>
            <button
              onClick={() => setActiveTab("roadmap")}
              className={`cursor-pointer w-full mt-2 font-semibold text-sm py-3.5 rounded-xl transition active:scale-95 ${
                activeTab === "roadmap"
                ? " bg-blue-600 text-white hover:text-blue-200"
                  : " bg-blue-950/40 text-white shadow-[0_0_24px_rgba(37,99,235,0.4)]"
              }`}
            >
              Roadmap{" "}
            </button>
          </aside>

          {/* Main Content */}
          <main className="bg-gray-900 rounded-xl p-4 border border-gray-800">
            {/* Header */}
            <div className="flex flex-col items-start justify-between gap-4 flex-wrap mb-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span className="text-[11px] font-medium text-gray-500 uppercase tracking-widest">
                    Interview Report
                  </span>
                </div>
                <h1 className="text-xl font-semibold text-gray-50 leading-snug mb-1.5">
                  {report?.title}
                </h1>
                <p className="text-sm text-gray-500">
                  {new Date(report?.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="flex gap-2 flex-wrap items-center">
                <span onClick={() => setActiveTab("technical")} className=" cursor-pointer text-xs font-medium bg-blue-950 text-blue-300 px-3 py-1 rounded-full border border-blue-800/40">
                  Technical
                </span>
                <span onClick={() => setActiveTab("behavioral")} className=" cursor-pointer text-xs font-medium bg-green-950 text-green-300 px-3 py-1 rounded-full border border-green-800/40">
                  Behavioral
                </span>
                <span onClick={() => setActiveTab("roadmap")} className="cursor-pointer text-xs font-medium bg-purple-950 text-purple-300 px-3 py-1 rounded-full border border-purple-800/40">
                  Roadmap
                </span>
              </div>
            </div>
            <div className="border-t border-gray-800 mb-5" />

            {activeTab === "technical" && <TechnicalQuestion />}
            {activeTab === "behavioral" && <BehavioralQuestion />}
            {activeTab === "roadmap" && <Roadmap />}
          </main>

          {/* Right Sidebar */}
          <aside className="hidden lg:block bg-gray-900 rounded-xl p-4 border border-gray-800">
            Right Sidebar
          </aside>
        </div>
      </div>
    </div>
  );
};

export default InterviewReport;
