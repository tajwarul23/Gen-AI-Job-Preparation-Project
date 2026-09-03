import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Users, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { useJoinCompany } from "../Hooks/useCompany.js";

const JoinCompany = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const { mutate, isPending, isSuccess, isError, error } = useJoinCompany();

  useEffect(() => {
    if (token) {
      mutate(token);
    }
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!isSuccess) return;
    const timer = setTimeout(() => navigate("/recruiter/pipeline"), 1500);
    return () => clearTimeout(timer);
  }, [isSuccess, navigate]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-surface border border-line rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center gap-4"
    >
      <div className="flex items-center gap-2">
        <Users className="w-5 h-5 text-violet" />
        <h3 className="text-sm font-mono text-muted tracking-wider uppercase font-bold">
          JOIN COMPANY
        </h3>
      </div>

      {!token && (
        <p className="text-muted text-sm font-sans">
          This link is missing an invite token. Ask your admin to resend the invite.
        </p>
      )}

      {isPending && (
        <div className="flex flex-col items-center gap-2 py-4">
          <Loader2 className="w-6 h-6 text-teal animate-spin" />
          <p className="text-xs text-muted font-mono">Verifying invite...</p>
        </div>
      )}

      {isSuccess && (
        <div className="flex flex-col items-center gap-2 py-4">
          <CheckCircle2 className="w-8 h-8 text-teal" />
          <p className="text-sm text-ink font-sans">
            Joined successfully. Redirecting to your dashboard...
          </p>
        </div>
      )}

      {isError && (
        <div className="flex flex-col items-center gap-2 py-4">
          <XCircle className="w-8 h-8 text-red-400" />
          <p className="text-xs text-red-400 font-mono">
            {error?.response?.data?.message || "Invalid or expired invite link"}
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default JoinCompany;
