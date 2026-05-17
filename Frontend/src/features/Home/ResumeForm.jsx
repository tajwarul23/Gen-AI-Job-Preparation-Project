import { Link } from "react-router-dom";


const Field = ({ label }) => (
    <div className="flex items-center gap-3 bg-[#12121a] border border-[#252535] hover:border-[#3a3a55] rounded-[10px] px-4 py-[13px] transition-colors duration-200">
      <span className="w-[7px] h-[7px] rounded-full bg-violet" />
      <span className="font-mono text-[13px] text-[#5a5a78] select-none pointer-events-none">
        {label}
        
      </span>
    </div>
  );

  const Section = ({ title, children }) => (
    <div className="mb-7">
      <div className="flex items-center gap-3 mb-4">
        <span className="font-display text-[11px]  tracking-[0.18em] text-violet uppercase whitespace-nowrap">
          {title}
        </span>
        <div className="flex-1 h-px bg-[#2a2a38]" />
      </div>
      <div className="flex flex-col gap-[10px]">{children}</div>
    </div>
  );
const ResumeForm = () => {
  

  return (
    <div className="  flex justify-center items-start px-4 py-8">
      <div className="bg-surface border border-line rounded-2xl p-7 w-full max-w-[860px]">

        <Section title="Personal Info">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px]">
            <Field label="Full Name" />
            <Field label="Email" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px]">
            <Field label="Phone" />
            <Field label="Location" />
          </div>
          <Field label="LinkedIn / Portfolio URL" />
          <Field label="Professional Summary (2–3 lines)" />
        </Section>

        <Section title="Work Experience">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px]">
            <Field label="Job Title" />
            <Field label="Company" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px]">
            <Field label="Duration" />
            <Field label="Location" />
          </div>
          <Field label="Key Achievements (bullets)" />
        </Section>

        <Section title="Education & Skills">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px]">
            <Field label="Degree & Major" />
            <Field label="University" />
          </div>
          <Field label="Tech Stack / Skills" />
          <Field label="Certifications" />
          <Field label="Projects (name, link, impact)" />
        </Section>

        <button className="mt-2 w-full bg-violet hover:bg-[#7c72f7] active:scale-[0.99] text-white font-semibold text-[15px] tracking-wide rounded-xl py-4 transition-all duration-200 cursor-pointer">
          <Link to={"/resume-builder"}>Generate Resume →</Link>
        </button>
      </div>
    </div>
  );
};

export default ResumeForm;