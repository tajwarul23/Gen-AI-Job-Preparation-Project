import { useEffect, useState, useRef } from "react";
import { useResume } from "../Hooks/useResume";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import ResumeViewerSkeleton from "./ResumeViewerSkeleton";

const ResumeViewer = () => {
  const { resume, getResumeById, loading, error } = useResume();
  const { resumeId } = useParams();
  const [downloading, setDownloading] = useState(false);
  const intervalRef = useRef(null);
const pollAttemptsRef = useRef(0);
const MAX_POLL_ATTEMPTS = 5; 
  // Initial fetch
  useEffect(() => {
    if (resumeId) getResumeById(resumeId);
  }, [resumeId]);

useEffect(() => {
  if (!resume || !resume.isSaving) return;

  intervalRef.current = setInterval(async () => {
    pollAttemptsRef.current += 1;

    // Give up after 30 seconds — something went wrong on the backend
    if (pollAttemptsRef.current >= MAX_POLL_ATTEMPTS) {
      clearInterval(intervalRef.current);
      toast.error("Resume is taking too long to save. Please refresh the page.");
      return;
    }

    await getResumeById(resumeId);
  }, 3000);

  return () => {
    clearInterval(intervalRef.current);
    pollAttemptsRef.current = 0; // reset counter on cleanup
  };
}, [resume?.isSaving, resumeId]);

  if (loading && !resume) return <ResumeViewerSkeleton />; // only show skeleton on first load, not during polling re-fetches
  if (error) return <div className="text-red-400 text-4xl text-center">{error}</div>;
  if (!resume) return <div className="text-ink text-4xl text-center">No resume found..!</div>;

  const googleViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(resume.resumeUrl)}&embedded=true`;

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const response = await fetch(resume?.resumeUrl);
      if (!response.ok) throw new Error("Failed to download");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${resume.fullName || "resume"}_resume.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => window.URL.revokeObjectURL(url), 100);
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

        {/* Download button — three states: saving, failed, ready */}
        {resume.saveFailed ? (
          <button
            disabled
            className="bg-red-100 text-red-500 p-1 rounded-sm text-sm font-display cursor-not-allowed"
          >
            Save failed — try regenerating
          </button>
        ) : resume.isSaving ? (
          <button
            disabled
            className="bg-violet/50 p-1 rounded-sm text-sm text-ink font-display cursor-not-allowed flex items-center gap-2"
          >
            <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />
            Saving...
          </button>
        ) : (
          <button
            className="bg-violet p-1 rounded-sm text-sm text-ink font-display cursor-pointer hover:scale-95"
            onClick={handleDownload}
            disabled={downloading}
          >
            {downloading ? (
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />
                Downloading...
              </span>
            ) : (
              "Download Resume"
            )}
          </button>
        )}
      </div>

      {/* PDF viewer — show placeholder while still saving */}
      <div className="w-full max-w-4xl min-h-screen rounded-xl overflow-hidden shadow-lg border-2 border-dashed border-muted">
        {resume.isSaving ? (
          // Resume URL not ready yet — show a waiting state instead of broken iframe
          <div className="flex flex-col items-center justify-center min-h-screen gap-3 text-ink/60">
            <span className="w-8 h-8 border-4 border-muted border-t-violet rounded-full animate-spin" />
            <p className="text-sm">Finalizing your resume, hang tight...</p>
          </div>
        ) : (
          <iframe
            src={googleViewerUrl}
            width="100%"
            title="Resume Preview"
            className="min-h-screen py-5"
          />
        )}
      </div>
    </div>
  );
};

export default ResumeViewer;