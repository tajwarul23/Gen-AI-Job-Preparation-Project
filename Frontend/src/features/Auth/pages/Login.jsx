import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth.js";

import { useState } from "react";

import { FcGoogle } from "react-icons/fc";
import { ArrowLeft, Key, Terminal } from "lucide-react";

import { routeAfterAuth } from "../../../Utils/routeAfterAuth.js";
const Login = () => {
  const [isCandidateLoading, setIsCandidateLoading] = useState(false);
  const [isRecruiterLoading, setIsRecruiterLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from;
  const { handleGoogleLogin } = useAuth();
const handleContinue = async (intent) => {
  sessionStorage.setItem("authIntent", intent);
  if (intent === "recruiter") setIsRecruiterLoading(true);
  else if (intent === "candidate") setIsCandidateLoading(true);

  try {
    const data = await handleGoogleLogin(intent);
    if (data?.success) {
      if (from) {
        navigate(`${from.pathname}${from.search || ""}`, { replace: true });
      } else {
        routeAfterAuth(data.user, intent, navigate);
      }
    }
  } finally {
    setIsCandidateLoading(false);
    setIsRecruiterLoading(false);
  }
};
  return (
    <div className="bg-app text-ink min-h-screen flex flex-col justify-center items-center px-4 py-12 font-sans relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute w-150 h-150 bg-violet/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Back button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 text-muted hover:text-ink transition-colors text-sm flex items-center gap-2 cursor-pointer font-sans"
      >
        <ArrowLeft className="w-4 h-4" />
        BACK TO MAIN
      </button>

      {/* Dual Login Container */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-surface border border-line rounded-2xl overflow-hidden shadow-2xl relative">
        <div className="absolute top-0 right-1/2 w-[1px] h-full bg-line hidden md:block" />

        {/* Left: Candidate Login */}
        <div className="p-8 sm:p-12 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-6 text-xl">
              <Terminal className="w-5 h-5 text-teal" />
              <h3 className=" font-sans text-ink tracking-wider">
                CANDIDATE PORTAL
              </h3>
            </div>

            <p className="text-muted text-sm mb-8 leading-relaxed font-sans">
              Build your resume, analyze it against real jobs, apply, and prep
              with AI-generated practice questions — all tracked in one place.
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => handleContinue("candidate")}
              className="cursor-pointer w-full flex items-center justify-center gap-3 bg-white text-gray-700 border border-gray-300 rounded-lg px-4 py-3 shadow-sm mt-5 hover:bg-gray-100 hover:shadow-md transition-all duration-200 font-medium"
            >
              <FcGoogle className="text-2xl" />

              {isCandidateLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  Logging in with Google...
                </>
              ) : (
                <span>Continue with Google</span>
              )}
            </button>
          </div>
        </div>

        {/* Right: Recruiter Login */}
        <div className="p-8 sm:p-12 flex flex-col justify-between bg-overlay/50">
          <div>
            <div className="flex items-center gap-2 mb-6 text-xl text-ink">
              <Key className="w-5 h-5 text-violet-text" />
              <span className=" font-sans  tracking-wider">
                RECRUITER PORTAL
              </span>
            </div>

            <p className="text-muted text-sm mb-8 leading-relaxed font-sans">
              Applicants show up already scored by fit — no more reading resumes
              one by one. And when you're posting a new role, AI helps you write
              the description and figure out what to actually screen for.
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => handleContinue("recruiter")}
              className="cursor-pointer w-full flex items-center justify-center gap-3 bg-white text-gray-700 border border-gray-300 rounded-lg px-4 py-3 shadow-sm mt-5 hover:bg-gray-100 hover:shadow-md transition-all duration-200 font-medium"
            >
              <FcGoogle className="text-2xl" />

              {isRecruiterLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  Logging in with Google...
                </>
              ) : (
                <span>Continue with Google</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
