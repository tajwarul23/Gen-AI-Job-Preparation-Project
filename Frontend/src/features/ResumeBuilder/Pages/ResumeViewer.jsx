import { useEffect, useState } from "react";
import { useResume } from "../Hooks/useResume";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import ResumeViewerSkeleton from "./ResumeViewerSkeleton";

const ResumeViewer = () => {
  const { resume, getResumeById, loading, error } = useResume();
  const { resumeId } = useParams();
const [downloading, setDownloading] = useState(false);
  useEffect(() => {
    if (resumeId) getResumeById(resumeId);
  }, [resumeId]);

  if (loading ) return (<ResumeViewerSkeleton/>);
    if(error){
     return(<div className="text-red-400 text-4xl text-center">{error}</div>)
  }
  if(!resume){
    return(<div className="text-ink text-4xl text-center">No report found..!</div>)
  }

  const googleViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(resume.resumeUrl)}&embedded=true`;

    const handleDownload = async () => {
    setDownloading(true);
    try {
      const response = await fetch(resume?.resumeUrl);

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
      toast.error(error?.message || "Something went wrong");
    } finally {
      setDownloading(false);
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
              className="bg-violet p-1 rounded-sm text-sm text-ink font-display cursor-pointer hover:scale-95 "
              onClick={handleDownload}
              disabled={downloading}
            >
              {downloading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Downloading Resume...
                </>
              ) : (
                "Download Resume"
              )}
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
