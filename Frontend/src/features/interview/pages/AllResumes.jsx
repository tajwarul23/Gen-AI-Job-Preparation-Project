import { useEffect } from "react";
import { useResume } from "../Hooks/useResume";
import ResumeCard from "./ResumeCard";
import toast from "react-hot-toast";

const AllResumes = () => {
  const { getAllResume, resumes, loading, error } = useResume();
  useEffect(() => {
    getAllResume();
  }, []);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);
  if (loading) return <main>Loading All the resumes...</main>;
  if (!resumes.length)
    return (
      <main>
        <h1 className="text-7xl text-ink">No resume Found..!</h1>
      </main>
    );

  return (
    <div className="min-h-screen text-white font-display">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <p className="text-violet uppercase font-mono tracking-wider text-sm">
            // All Resumes
          </p>

          <h1 className="text-4xl sm:text-5xl font-black text-ink font-display mt-3">
            Your Resumes History
          </h1>

          <p className="text-muted mt-3">Total Reports: {resumes.length}</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {resumes.map((r, i) => (
            <ResumeCard resume={r} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllResumes;
