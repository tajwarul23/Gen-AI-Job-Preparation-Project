import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useResume } from "../Hooks/useResume";

const ResumeCard = ({ resume }) => {
  const navigate = useNavigate();
  const handleViewPDF = (resumeId) => {
  console.log(resumeId);
    navigate(`/resume/${resumeId}`);
  };
  const { deleteResumeById } = useResume();
  const handleDelete = (resumeId) => {
    deleteResumeById(resumeId);
  };
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
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <div className="w-full rounded-2xl border border-line bg-surface p-4 sm:p-5 md:p-6">
      {/* Top */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="w-full h-40 rounded-lg overflow-hidden bg-gray-50 mb-3">
            <img
              src={resume.thumbnailUrl}
              width="100%"
              height="100%"
              title="Resume Preview"
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <h1>
              Resume Title: <span>{resume.title}</span>
            </h1>
            <p>
              ATS Score: <span className="text-teal">{resume.atsScore}</span>
            </p>
          </div>
          <div className="flex justify-between mt-2">
            <button
              className="bg-violet p-1 rounded-sm text-sm text-ink font-display cursor-pointer hover:scale-95"
              onClick={() => {
                handleViewPDF(resume._id);
              }}
            >
              View PDF
            </button>
            <button
              className="bg-violet p-1 rounded-sm text-sm text-ink font-display cursor-pointer hover:scale-95"
              onClick={handleDownload}
            >
              Download PDF
            </button>
          </div>
        </div>
      </div>

      {/* Tags */}

      {/* Bottom */}
      <div className="mt-6 flex  gap-2 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          Generated on:
          <span>
            {" "}
            {new Date(resume.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </p>
        <div className="">
          <button
            onClick={() => {
              handleDelete(resume._id);
            }}
            className="text-red-500 text-lg cursor-pointer"
          >
            <RiDeleteBin6Line />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeCard;
