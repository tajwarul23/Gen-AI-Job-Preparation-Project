import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Users, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { useJoinCompany } from "../Hooks/useCompany.js";
import { useState } from "react";

const JoinCompany = () => {
  const [searchParams] = useSearchParams();
  const [pastedLink, setPastedLink] = useState("");
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const { mutate, isPending, isSuccess, isError, error } = useJoinCompany();

  const extractToken = (value) => {
    const trimmed = value.trim();
    try {
      const url = new URL(trimmed);
      return url.searchParams.get("token") || "";
    } catch {
      return trimmed; // not a URL — assume they pasted the raw token
    }
  };

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

      {!token && !isPending && !isSuccess && (
        <div className="flex flex-col items-center gap-3 w-full">
          <p className="text-muted text-sm font-sans">
            Paste your invitation link below to join.
          </p>
          <input
            type="text"
            value={pastedLink}
            onChange={(e) => setPastedLink(e.target.value)}
            placeholder="Paste invite link or token"
            className="w-full bg-overlay text-ink text-sm border border-line rounded-xl p-3 focus:outline-none focus:border-teal placeholder:text-muted font-sans"
          />
          <button
            type="button"
            disabled={!pastedLink.trim()}
            onClick={() => mutate(extractToken(pastedLink))}
            className="btn"
          >
            Join Company
          </button>
        </div>
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
