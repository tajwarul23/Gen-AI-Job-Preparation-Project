import FeatureCard from "./FeatureCard";

const Features = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col justify-center items-center">
        {/* Divider */}
        <div className="border-t w-200 border-line mb-16 mx-auto" />
        {/* Description */}
        <div className="flex flex-wrap sm:flex-nowrap items-baseline-last gap-6">
          <div>
            <p className="text-violet uppercase font-mono tracking-wider text-sm mb-4">
              // What you get
            </p>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight text-ink font-display max-w-2xl wrap-break-words">
              Everything you {""}
              <span className="text-violet-text">need to</span> land the offer
            </h1>
          </div>
          <div>
            <p className="text-muted font-display">
              PrepLab does the deep work — you focus on the prep. One resume
              upload, full intelligence suite.
            </p>
          </div>
        </div>
        {/* Cards */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 mt-10 gap-6">
            {/* Resume Analysis */}
            <FeatureCard
              icon={"⚡"}
              title={"Resume Analysis"}
              description={`
    Deep parse of your resume against a target role.
    Identifies strengths, red flags, and gaps that
    recruiters actually notice.
  `}
              badge={"Core"}
              color={"violet"}
            />
            {/* Technical Questions */}
            <FeatureCard
              icon={"🎯"}
              title={"Technical Questions"}
              description={`Role-specific technical questions generated from your resume and job description. Practice before they ask.`}
              badge={"Generated"}
              color={"coral"}
            />
            {/* Behavioral Questions */}
            <FeatureCard
              icon={"💬"}
              title={"Behavioral Questions"}
              description={`STAR-method behavioral questions tailored to your experience. Covers culture, conflict, leadership, growth.`}
              badge={"STAR method"}
              color = {"teal"}
            />
            {/* Match Score */}
            <FeatureCard
              icon={"📊"}
              title={"Match Score"}
              description={`A precise compatibility score between your resume and the job posting. See exactly how strong your candidacy is.`}
              badge={"0-100"}
              color={"purple"}
            />
            {/* Skill Gap Detection */}
            <FeatureCard
              icon={"🧠"}
              title={"Skill Gap Detection"}
              description={`Side-by-side comparison of what the role demands vs. what your resume shows. No guesswork.`}
              badge={"Visual"}
              color={"coral"}
            />
            {/* Learning Roadmap */}
            <FeatureCard
              icon={"🗺️"}
              title={"Learning Roadmap"}
              description={`A structured, week-by-week plan to close every identified skill gap with curated resources and milestones.`}
              badge={"Actionable"}
              color={"purple"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
