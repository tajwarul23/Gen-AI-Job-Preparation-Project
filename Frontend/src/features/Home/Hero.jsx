import {  useNavigate } from "react-router-dom";

import { motion } from "motion/react";
import { ArrowRight,  Sparkles,  } from "lucide-react";
const Hero = () => {
  const navigate = useNavigate();
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
    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet/10 border border-violet/20 text-violet text-xs font-mono mb-8 tracking-wider uppercase"
  >
    <span className="inline-block  w-2 h-2 bg-violet rounded-full animate-pulse" />
     AI-Powered Interview Intelligence
  </motion.div>

  <motion.h1 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: 0.1 }}
    className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight leading-[1.1] mb-6 max-w-5xl mx-auto text-ink"
  >
    The Ultimate <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet via-purple to-violet">AI Interview</span> & Recruitment Intelligence Suite
  </motion.h1>

  <motion.p 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: 0.2 }}
    className="text-muted text-lg sm:text-xl max-w-3xl mx-auto mb-10 leading-relaxed"
  >
    Bridging the gap between elite engineering talent and high-growth organizations with deep behavioral synthesis, ATS resume parsing, and high-fidelity technical evaluation.
  </motion.p>

  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: 0.3 }}
    className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
  >
    <button 
    onClick={()=>{navigate("/login")}}
      className="w-full sm:w-auto px-8 py-4 bg-violet hover:opacity-90 font-semibold rounded-lg transition-all shadow-[0_0_20px_rgba(106,247,200,0.25)] flex items-center justify-center gap-2 group cursor-pointer text-ink"
    >
      Find Your Next Role
      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
    </button>
    <button 
     onClick={()=>{navigate("/login")}}
      className="w-full sm:w-auto px-8 py-4 bg-surface hover:bg-overlay border border-line hover:border-linehov text-ink font-semibold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
    >
      Hire Smarter with AI
      <Sparkles className="w-4 h-4 text-purple" />
    </button>
  </motion.div>
</section>

      {/* Highlights */}
      <div className="flex flex-wrap justify-center gap-6 mt-16 px-4">
        {[
          { top: "ATS-Friendly", bottom: "Resume Builder" },
          { top: "Deep", bottom: "Resume Analysis" },
          { top: "Professional", bottom: "PDF Resumes" },
          { top: "Powered by", bottom: "Gemini 2.5 Flash" },
        ].map((item, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-center border-line rounded-2xl px-8 py-5 min-w-36"
          >
            <span className="text-3xl font-display font-bold text-ink">
              {item.top}
            </span>
            <span className="text-sm sm:text-lg text-muted mt-1">
              {item.bottom}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
