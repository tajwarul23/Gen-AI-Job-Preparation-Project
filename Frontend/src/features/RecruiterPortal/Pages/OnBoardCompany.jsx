import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import CreateCompanyForm from "../Components/CreateCompanyForm.jsx";
import JoinCompany from "./JoinCompany.jsx";
import { useAuth } from "../../Auth/Hooks/useAuth.js";

const OnBoardCompany = () => {
  const { user, handleBecomeCandidate, loading } = useAuth();
  const navigate = useNavigate();

  const handleContinueAsCandidate = async () => {
    const data = await handleBecomeCandidate();
    if (data?.success) {
      toast.success(data?.message || "Switched to candidate");
      navigate("/all/job");
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center m-5">
         <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-ink font-display mb-2">
          WELCOME TO THE RECRUITER CONSOLE
        </h2>
        <p className="text-muted text-sm font-mono tracking-widest uppercase font-bold">
          Select your organizational node to register your pipeline
        </p>
      </div>
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
          <CreateCompanyForm />
          <JoinCompany />
        </div>

        {user?.role === "pending_recruiter" && (
          <button
            type="button"
            onClick={handleContinueAsCandidate}
            disabled={loading}
            className="mt-8 px-5 py-2.5 rounded-xl border-2 border-line text-sm font-semibold text-ink
              hover:bg-overlay hover:border-linehov transition-colors cursor-pointer disabled:opacity-50"
          >
            Not hiring? Continue as a candidate instead
          </button>
        )}
      </div>
    </>
  );
};

export default OnBoardCompany;
