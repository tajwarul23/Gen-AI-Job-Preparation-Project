import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { LogOut, Mail, User as UserIcon, Building2 } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../Hooks/useAuth.js";
import LeaveCompanyModalBody from "../../RecruiterPortal/Components/LeaveCompanyModalBody.jsx";

const ROLE_LABELS = {
  candidate: "Candidate",
  recruiter: "Recruiter",
  company_admin: "Company Admin",
};

const Profile = () => {
  const { user, handleLogout, loading } = useAuth();
  const navigate = useNavigate();
  const leaveDialogRef = useRef(null);
  const canLeaveCompany =
    user?.role === "company_admin" || user?.role === "recruiter";

  const handleLogoutClick = async () => {
    navigate("/");
    const res = await handleLogout();
    toast.success(res?.message || "Logged out successfully!");
  };

  return (
    <div className="min-h-screen bg-app flex items-start md:items-center justify-center px-4 pt-16 pb-12 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-surface border border-line rounded-2xl p-6 sm:p-8"
      >
        <div className="flex flex-col items-center text-center gap-3">
          <div className="w-16 h-16 rounded-full bg-violet/10 border border-violet-border flex items-center justify-center text-violet-text font-bold text-2xl font-display">
            {user?.userName?.charAt(0)?.toUpperCase() || (
              <UserIcon className="w-7 h-7" />
            )}
          </div>

          <div>
            <h1 className="text-xl lg:text-2xl font-bold font-display text-ink">
              {user?.userName || "Unnamed User"}
            </h1>
            <p className="text-xs text-muted flex items-center gap-1.5 justify-center mt-1 font-sans">
              <Mail className="w-3.5 h-3.5" />
              {user?.email}
            </p>
          </div>

          <span className="text-xs font-mono uppercase bg-violet/10 text-violet-text border border-violet-border px-2.5 py-1 rounded-full font-bold">
            {ROLE_LABELS[user?.role] || user?.role}
          </span>
        </div>

        <div className="my-6 h-px bg-line" />

        {canLeaveCompany && (
          <button
            onClick={() => leaveDialogRef.current?.showModal()}
            className="w-full py-3 mb-3 rounded-xl border-2 border-line text-muted font-semibold text-sm
              flex items-center justify-center gap-2 cursor-pointer transition-colors
              hover:bg-overlay hover:text-ink"
          >
            <Building2 className="w-4 h-4" />
            Leave Company
          </button>
        )}

        <button
          onClick={handleLogoutClick}
          disabled={loading}
          className="w-full py-3 rounded-xl border-2 border-red-400/60 text-red-400 font-semibold text-sm
            flex items-center justify-center gap-2 cursor-pointer transition-colors
            hover:bg-red-400/10 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
              Logging Out
            </>
          ) : (
            <>
              <LogOut className="w-4 h-4" />
              Logout
            </>
          )}
        </button>
      </motion.div>

      {canLeaveCompany && (
        <LeaveCompanyModalBody leaveDialogRef={leaveDialogRef} />
      )}
    </div>
  );
};

export default Profile;
