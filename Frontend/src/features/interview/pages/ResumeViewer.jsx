import { useEffect } from "react";
import { useResume } from "../Hooks/useResume";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const ResumeViewer = () => {
  const { resume, getResumeById, loading } = useResume();
  const { resumeId } = useParams();

  useEffect(() => {
    if (resumeId) getResumeById(resumeId);
  }, [resumeId]);

  if (loading || !resume) return <h1>Loading...</h1>;

  const googleViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(resume.resumeUrl)}&embedded=true`;

  const handleDownload = async () => {
  try {
    const response = await fetch(resume.resumeUrl);

    if (!response.ok) {
      throw new Error("Failed to download");
    }

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = `${resume.fullName || "resume"}_resume.pdf`;

    document.body.appendChild(link);

    link.click();

    link.remove();

    setTimeout(() => {
      window.URL.revokeObjectURL(url);
    }, 100);

  } catch (error) {
    toast.error(error?.response?.data?.message || "Something went wrong")
  }
};

  return (
    <div className="min-h-screen bg-app flex flex-col items-center py-8 px-4">
      {/* toolbar */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold text-ink">
          {resume.fullName}'s Resume
        </h1>
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 bg-violet hover:bg-violet-dim text-ink text-sm font-medium px-4 py-2 rounded-lg transition-colors cursor-pointer"
        >
          Download Resume
        </button>
      </div>

      {/* pdf viewer */}
      <div className="w-full max-w-4xl min-h-screen  rounded-xl overflow-hidden shadow-lg border-2 border-dashed border-muted">
        <iframe
          src={googleViewerUrl}
          width="100%"
          title="Resume Preview"
          className=" min-h-screen py-5 "
        />
      </div>
    </div>
  );
};

export default ResumeViewer;
