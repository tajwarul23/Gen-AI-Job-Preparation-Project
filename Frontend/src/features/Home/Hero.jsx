import { useNavigate } from "react-router-dom";

import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import CandidateSuite from "./CandidateSuite";
import RecruiterSuite from "./RecruiterSuite";
import { useAuth } from "../Auth/Hooks/useAuth";
import { routeAfterAuth } from "../../Utils/routeAfterAuth";
const Hero = () => {
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
    // ← overflow-hidden here stops glows from causing horizontal scroll
    <div className="relative overflow-x-hidden">
      {/* MAIN LARGE GLOW */}
      <div
        className="pointer-events-none absolute left-1/2 top-30
                      h-112.5 w-[min(64rem,100vw)]
                      -translate-x-1/2 rounded-full
                      bg-violet/5 blur-[160px]"
      />

      {/* SECONDARY GLOW */}
      <div
        className="pointer-events-none absolute left-[40%] top-[20px]
                      h-[250px] w-[min(350px,80vw)]
                      rounded-full bg-purple/20 blur-[120px]"
      />

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-violet/10 border border-violet/20 text-violet font-sans mb-8 tracking-wider uppercase"
        >
          <span className="inline-block  w-2 h-2 bg-violet rounded-full animate-pulse" />
          DUAL INTELLIGENCE SUITE
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight leading-[1.1] mb-6 max-w-5xl mx-auto text-ink"
        >
          The Ultimate{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet via-purple to-violet">
            AI-Powered
          </span>{" "}
          Candidate Intelligence & Recruiter Insights
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-muted text-lg sm:text-xl max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          Bridging the gap between elite engineering talent and high-growth
          organizations with deep behavioral synthesis, ATS resume parsing, and
          high-fidelity technical evaluation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
            <button
      onClick={() => {
              handleContinue("candidate")
            }}
        className="uppercase px-6 py-3 rounded-lg border border-purple-400/40 text-purple-300 
             backdrop-blur-sm bg-purple-400/10 hover:bg-purple-400/20 
             hover:text-white transition-all duration-300 
             focus:outline-none focus:ring-2 focus:ring-purple-400/50 flex items-center justify-center gap-2 cursor-pointer"
      >
        Find Your Next Role
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </button>
          <button
            onClick={() => {
              handleContinue("recruiter")
            }}
            className="uppercase w-full sm:w-auto px-8 py-4 bg-surface hover:bg-overlay border border-line hover:border-linehov text-ink font-semibold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            Hire Smarter with AI
            <Sparkles className="w-4 h-4 text-purple" />
          </button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          viewport={{ once: false, amount: 0.1 }}
        >
          <CandidateSuite />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          viewport={{ once: false, amount: 0.1 }}
        >
          <RecruiterSuite />
        </motion.div>
      </section>
    </div>
  );
};

export default Hero;
