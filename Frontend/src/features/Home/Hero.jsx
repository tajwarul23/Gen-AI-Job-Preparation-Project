import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
const Hero = () => {
  return (
    // ← overflow-hidden here stops glows from causing horizontal scroll
    <div className="relative overflow-x-hidden">

      {/* MAIN LARGE GLOW */}
      <div className="pointer-events-none absolute left-1/2 top-30
                      h-112.5 w-[min(64rem,100vw)]
                      -translate-x-1/2 rounded-full
                      bg-violet/5 blur-[160px]" />

      {/* SECONDARY GLOW */}
      <div className="pointer-events-none absolute left-[40%] top-[20px]
                      h-[250px] w-[min(350px,80vw)]
                      rounded-full bg-purple/20 blur-[120px]" />

      {/* HERO SECTION */}
      <section className="relative flex flex-col items-center pt-15  text-center px-4">
        <div className="rounded-full border border-violet-border bg-violet-dim px-5 py-1 text-sm text-violet-text uppercase tracking-wider">
          <span className="inline-block mr-4 w-2 h-2 bg-violet rounded-full animate-pulse" />
          AI-Powered Interview Intelligence
        </div>

        <h1 className="max-w-4xl text-4xl sm:text-5xl lg:text-7xl font-black leading-none text-ink font-display scale-y-75 mt-6">
          Know exactly
          <br />
          <span className="text-violet-text">where you stand</span>
          <br />
          before the interview
        </h1>

        <p className="text-muted font-display mt-4 max-w-xl text-sm sm:text-base">
          Upload your resume, get a deep analysis with technical & behavioral
          questions, a match score against any job, skill gaps, and a
          personalized roadmap to close them.
        </p>

        {/* buttons */}
        <div className="flex flex-col sm:flex-row gap-6 mt-8 items-center">
          <Link
            className="rounded-xl bg-violet px-5 py-1.5 text-white text-lg cursor-pointer font-display"
            to={"/resume-analyzer"}
          >
            Analyze my resume →
          </Link>
          <Link
            className="text-muted border rounded-xl border-line px-5 py-1.5 font-mono
                       hover:text-white transition-all duration-200 hover:border-linehov
                       flex items-center gap-3"
            to={"/resume-analyzer"}
          >
            <FaPlay />
            <span>See Sample Report</span>
          </Link>
        </div>

        {/* Divider */}
        <div className="border-t w-full max-w-lg border-line mt-15 mx-auto" />
      </section>

      {/* Highlights */}
      <div className="flex flex-wrap justify-center gap-6 mt-16 px-4">
        {[
          { top: "1 Upload",    bottom: "Full Analysis" },
          { top: "5+ Sections", bottom: "Per Report" },
          { top: "Powered by",  bottom: "Gemini AI" },
          { top: "Free",        bottom: "No sign-up needed" },
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center text-center border-line rounded-2xl px-8 py-5 min-w-36">
            <span className="text-3xl font-display font-bold text-ink">{item.top}</span>
            <span className="text-sm sm:text-lg text-muted mt-1">{item.bottom}</span>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Hero