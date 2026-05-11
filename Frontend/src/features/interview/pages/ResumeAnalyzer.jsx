import {  useState } from "react";
import { useNavigate } from "react-router";
import { useInterview } from "../Hooks/useInterview";


const ResumeAnalyzer = () => {
  const { generateReport, loading} = useInterview();
  const [file, setFile] = useState(null);
  const [selfDescription, setSelfDescription] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  
  const navigate = useNavigate();
  const handleFileChange = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
  };
  const handleClick = async () => {
    if (!file || !selfDescription || !jobDescription) {
      alert("Please fill all fields and upload your resume.");
      return;
    }
    const data = await generateReport({
      jobDescription,
      selfDescription,
      resumeFile: file,
    });
      console.log(data);
      
    navigate(`/interview/${data._id}`);
  };
  if (loading  ) {
    return (
      <main className="min-h-screen flex justify-center items-center">
        <h1 className="text-white text-3xl">Loading....</h1>
      </main>
    );
  }
  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-gray-950 p-8">
      <div className="bg-gray-900 border border-white/[0.07] rounded-2xl p-10 w-full max-w-xl shadow-2xl">
        {/* Header */}
        <div className="mb-8">
          <span className="inline-flex items-center gap-1.5 bg-blue-600/10 border border-blue-500/25 text-blue-400 text-xs font-medium uppercase tracking-widest px-3 py-1 rounded-full mb-4">
            <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
            AI Interview Master
          </span>
          <h1 className="text-3xl font-extrabold text-white leading-tight mb-1">
            Prep smarter. <span className="text-blue-500">Land the role.</span>
          </h1>
          <p className="text-sm text-gray-400 ">
            Paste your details and get a personalized interview report in
            seconds.
          </p>
        </div>

        <hr className="border-white/25 mb-8" />

        {/* About You */}
        <div className="mb-5">
          <label
            htmlFor="selfDescription"
            className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2"
          >
            About You
          </label>
          <textarea
            value={selfDescription}
            onChange={(e) => setSelfDescription(e.target.value)}
            id="selfDescription"
            name="selfDescription"
            rows={3}
            placeholder="Briefly describe your background, experience, and strengths…"
            className="w-full bg-gray-800 border border-white/[0.07] rounded-xl text-gray-100 text-sm font-light placeholder-gray-600 px-4 py-3 resize-none outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 transition"
          />
        </div>

        {/* Job Description */}
        <div className="mb-5">
          <label
            htmlFor="jobDescription"
            className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2"
          >
            Job Description
          </label>
          <textarea
            id="jobDescription"
            name="jobDescription"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={4}
            placeholder="Paste the job description you're applying for…"
            className="w-full bg-gray-800 border border-white/[0.07] rounded-xl text-gray-100 text-sm font-light placeholder-gray-600 px-4 py-3 resize-none outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 transition"
          />
        </div>

        {/* Resume Upload */}
        <div className="mb-5">
          <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
            Resume
          </label>
          <label
            htmlFor="resume"
            className="flex flex-col items-center gap-2 bg-gray-800 border border-dashed border-white/10 rounded-xl p-5 cursor-pointer hover:border-blue-500/40 hover:bg-blue-600/5 transition"
          >
            <div className="w-9 h-9 bg-blue-600/15 rounded-lg flex items-center justify-center text-blue-400 text-lg">
              📄
            </div>
            <p className="text-sm text-gray-500">
              {file ? (
                <span className="text-green-400 font-medium">{file.name}</span>
              ) : (
                <>
                  <span className="text-blue-400 font-medium">
                    Click to upload
                  </span>
                </>
              )}
            </p>
            <p className="text-xs text-gray-600">PDF only · Max 3MB</p>
            <input
              type="file"
              id="resume"
              name="resume"
              accept=".pdf"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>

        {/* Submit */}
        <button
          onClick={handleClick}
          className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-3.5 rounded-xl transition hover:shadow-[0_0_24px_rgba(37,99,235,0.4)] active:scale-95"
        >
          Generate Interview Report →
        </button>
      </div>
            
    </main>
  );
};

export default ResumeAnalyzer;
