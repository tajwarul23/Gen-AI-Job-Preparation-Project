import { IoMdCheckmark } from "react-icons/io";
import ResumeForm from "./ResumeForm";

const ResumeBanner = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* divider */}
      <div className="border-t w-150 border-line mb-16 mx-auto" />
      <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* Left */}
        <div className="flex-1">
          <p className="text-violet uppercase font-mono tracking-wider text-sm">
              // Resume Builder
            </p>
          <h1 className="max-w-4xl text-4xl sm:text-5xl lg:text-7xl font-black leading-none  text-ink font-display scale-y-75  wrap-break-word">
            Build a resume that actually gets read
          </h1>
          <p className="text-muted font-display">
            Fill in your details and PrepLab generates a clean, ATS-optimized
            resume. No templates that look like everyone else's.
          </p>
          <div className="flex items-center gap-2 mt-10">
            <IoMdCheckmark className="text-teal"/>
            <h3 className="font-display text-muted ">ATS-optimized formatting</h3>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <IoMdCheckmark className="text-teal"/>
            <h3 className="font-display text-muted ">Action verb suggestions for each bullet</h3>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <IoMdCheckmark className="text-teal"/>
            <h3 className="font-display text-muted ">Export as PDF or Word</h3>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <IoMdCheckmark className="text-teal"/>
            <h3 className="font-display text-muted ">Tailored to a specific job description</h3>
          </div>
        </div>
    {/* Right */}
    <div className="flex-[1.2] w-full">
        <ResumeForm/>
    </div>
      </div>
    </div>
  );
};

export default ResumeBanner;
