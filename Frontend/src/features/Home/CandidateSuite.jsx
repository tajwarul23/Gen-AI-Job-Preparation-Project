import { ArrowRight, Terminal } from "lucide-react";
import ResumeAnalyzerCard from "./Components/ResumeAnalyzerCard";
import ResumeBuilderCard from "./Components/ResumeBuilderCard";
import JobTrackerCard from "./Components/JobTrackerCard";
import MarketPlaceCard from "./Components/MarketPlaceCard";
import AnalyzePrepCard from "./Components/AnalyzePrepCard";
import { useNavigate } from "react-router-dom";
import { routeAfterAuth } from "../../Utils/routeAfterAuth";
import { useAuth } from "../Auth/Hooks/useAuth";
const CandidateSuite = () => {
  const navigate = useNavigate();
  const { loading, handleLogin, error, handleGoogleLogin, googleLoading } =
    useAuth();
  const handleContinue = async (intent) => {
    sessionStorage.setItem("authIntent", intent);
    const data = await handleGoogleLogin();
    if (data?.success) {
      routeAfterAuth(data.user, intent, navigate);
    }
  };
  return (
    <section className="mt-30">
      <div className="text-lg inline-flex items-center gap-2 px-10 py-2.5 rounded-full bg-violet/10 border border-violet/20 text-violet font-sans mb-8 tracking-wider uppercase">
        <Terminal />
        CAREER SUITE
      </div>
      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight leading-[1.1] mb-6 max-w-5xl mx-auto text-ink">
        Everything You Need to Land Your{" "}
        <span className="text-transparent bg-clip-text bg-linear-to-b from-violet via-purple to-violet">
          Target Role
        </span>
      </h1>
      <h3 className="text-muted text-lg sm:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
        From ATS optimization to interactive application tracking and job
        description prep.
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <ResumeAnalyzerCard />
        <ResumeBuilderCard />
        <JobTrackerCard />
        <MarketPlaceCard />
        <AnalyzePrepCard />
      </div>
      <button
        onClick={() => {
          handleContinue("candidate");
        }}
        className="group relative ml-auto px-6 py-3 rounded-lg border border-purple-400/40 text-purple-300  uppercase
       backdrop-blur-sm bg-purple-400/10 hover:bg-purple-400/20 
       hover:text-white transition-all duration-300 
       shadow-[0_0_20px_rgba(192,132,252,0.25)] hover:shadow-[0_0_35px_rgba(192,132,252,0.5)]
       focus:outline-none focus:ring-2 focus:ring-purple-400/50 flex items-center justify-center gap-2 cursor-pointer"
      >
        Launch Career Suite
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </button>
    </section>
  );
};

export default CandidateSuite;
