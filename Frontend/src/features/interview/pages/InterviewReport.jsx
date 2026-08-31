import { useEffect, useState } from "react";
import TechnicalQuestion from "./TechnicalQuestion";
import BehavioralQuestion from "./BehavioralQuestion";
import Roadmap from "./Roadmap";
import { useInterview } from "../Hooks/useInterview";
import {  useParams } from "react-router-dom";
import MatchScore from "../Components/MatchScore";
import SkillGaps from "../Components/SkillGaps";
import InterviewReportSkeleton from "./InterviewReportSkeleton";
import toast from "react-hot-toast";
import { NotebookPen } from "lucide-react";

const TABS = [
  { key: "technical", label: "Technical Question", accent: "teal" },
  { key: "behavioral", label: "Behavioral Question", accent: "violet" },
  { key: "roadmap", label: "Roadmap", accent: "purple" },
];

const tabActiveClass = {
  teal: "border-teal/30 bg-teal/10 text-teal-text",
  violet: "border-violet-border bg-violet/10 text-violet-text",
  purple: "border-purple-border bg-purple/10 text-purple-text",
};

const InterviewReport = () => {
  const [activeTab, setActiveTab] = useState("technical");
  const { report, getReportById, loading,error} = useInterview();
  const { interviewId } = useParams();
  
  useEffect(() => {
 
    if (!interviewId) {
      toast.error("Invalid interview id");
      return;
    }
    getReportById(interviewId);

  }, [interviewId]);

  if (loading) {
    return (
      <InterviewReportSkeleton/>
    );
  }
   if(error){
     return(
       <div className="min-h-screen bg-app flex items-center justify-center p-8">
         <div className="rounded-2xl border border-red-400/20 bg-red-400/5 p-6 text-center max-w-md">
           <p className="text-sm text-red-400">{error}</p>
         </div>
       </div>
     )
  }
  if(!report){
    return(
      <div className="min-h-screen bg-app flex items-center justify-center p-8">
        <p className="text-sm text-muted">No report found..!</p>
      </div>
    )
  }
 

  return (
    <div className="min-h-screen bg-app text-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr_290px] gap-6">
          {/* Left Sidebar */}
          <aside className="hidden min-h-screen lg:flex flex-col justify-start gap-3 bg-surface rounded-xl p-4 border border-line">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`cursor-pointer w-full font-semibold text-sm py-3 rounded-xl border transition ${
                  activeTab === tab.key
                    ? tabActiveClass[tab.accent]
                    : "border-line bg-overlay text-muted hover:text-ink hover:border-linehov"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </aside>

          {/* Main Content */}
          <main className="bg-surface rounded-xl p-4 border border-line">
            {/* Header */}
            <div className="flex flex-col items-start justify-between gap-4 flex-wrap mb-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <NotebookPen className="w-4 h-4 text-teal" />
                  <span className="text-[11px] font-mono font-medium text-muted uppercase tracking-widest">
                    Interview Report
                  </span>
                </div>
                <h1 className="text-xl lg:text-2xl font-bold font-display text-ink leading-snug mb-1.5">
                  {report?.title}
                </h1>
                <p className="text-sm text-muted font-sans">
                  {report?.createdAt?new Date(report?.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }):"Unknown Date"}
                </p>
              </div>
              <div className="flex gap-2 flex-wrap items-center">
                {TABS.map((tab) => (
                  <span
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`cursor-pointer text-xs font-semibold px-3 py-1 rounded-full border transition ${
                      activeTab === tab.key
                        ? tabActiveClass[tab.accent]
                        : "border-line bg-overlay text-muted hover:text-ink"
                    }`}
                  >
                    {tab.label.replace(" Question", "")}
                  </span>
                ))}
              </div>
            </div>
            <div className="border-t border-line mb-5" />

            {activeTab === "technical" && <TechnicalQuestion />}
            {activeTab === "behavioral" && <BehavioralQuestion />}
            {activeTab === "roadmap" && <Roadmap />}

          </main>

          {/* Right Sidebar */}
          <aside className="hidden lg:flex flex-col gap-10 bg-surface rounded-xl p-4 border border-line">
            <MatchScore />
            <SkillGaps />
          </aside>
          {/* Right side bar on small screen */}
          <div>
            <div className="lg:hidden bg-surface rounded-xl p-4 border border-line">
              <MatchScore />
            </div>
            <div className="lg:hidden bg-surface rounded-xl p-4 border border-line mt-5">
              <SkillGaps />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewReport;
