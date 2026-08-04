import { ArrowRight, Briefcase } from "lucide-react";

import JobStudioCard from "./Components/JobStudioCard";
import ApplicantCard from "./Components/ApplicantCard";
import { useNavigate } from "react-router-dom";
import { routeAfterAuth } from "../../Utils/routeAfterAuth";
import { useAuth } from "../Auth/Hooks/useAuth";

const RecruiterSuite = () => {
    const navigate = useNavigate();
  const { loading, handleLogin, error, handleGoogleLogin,googleLoading } = useAuth();
    const handleContinue = async(intent) =>{
      sessionStorage.setItem("authIntent", intent);
      const data = await handleGoogleLogin();
      if(data?.success){
        routeAfterAuth(data.user, intent, navigate);
      }
    }
  
  return (
    <section className="mt-30">
      <div className="text-lg inline-flex items-center gap-2 px-10 py-2.5 rounded-full bg-violet/10 border border-violet/20 text-violet font-sans mb-8 tracking-wider uppercase">
        <Briefcase />
        RECRUITER SUITE
      </div>
      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight leading-[1.1] mb-6 max-w-5xl mx-auto text-ink">
        Streamline Hiring with <br></br>
        <span className="text-transparent bg-clip-text bg-linear-to-b from-violet via-purple to-violet">
          AI Precision
        </span>
      </h1>
      <h3 className="text-muted text-lg sm:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
        Define role requirements and intelligently evaluate applicant pipelines
        with AI-driven fit scoring, helping you identify the strongest
        candidates faster.
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 max-w-5xl mx-auto">
        <JobStudioCard />
        <ApplicantCard />
      </div>

      <button
        onClick={() => {
          handleContinue("recruiter")
        }}
        className="group relative ml-auto px-6 py-3 rounded-lg border border-purple-400/40 text-purple-300 uppercase 
       backdrop-blur-sm bg-purple-400/10 hover:bg-purple-400/20 
       hover:text-white transition-all duration-300 
       shadow-[0_0_20px_rgba(192,132,252,0.25)] hover:shadow-[0_0_35px_rgba(192,132,252,0.5)]
       focus:outline-none focus:ring-2 focus:ring-purple-400/50 flex items-center justify-center gap-2 cursor-pointer"
      >
        Launch Recruiter Suite
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </button>
    </section>
  );
};

export default RecruiterSuite;
