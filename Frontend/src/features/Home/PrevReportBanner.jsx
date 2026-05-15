import ReportCard from "./ReportCard";
import { MdLockOutline } from "react-icons/md";
import { FiArrowUpRight } from "react-icons/fi";
import { useAuth } from "../Auth/Hooks/useAuth";
import { Link } from "react-router-dom";
const PrevReportBanner = () => {
  const { user } = useAuth();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Divider */}
      <div className="border-t w-150 border-line mb-16 mx-auto" />
      <div className="flex items-baseline-last gap-7">
        <div>
          <p className="text-violet uppercase font-mono tracking-wider text-sm">
            // Previous Reports
          </p>
          <h1 className="max-w-4xl mt-4 text-4xl sm:text-5xl lg:text-7xl font-black leading-none  text-ink font- scale-y-75  wrap-break-word">
            Your Analysis History
          </h1>
        </div>
        {
          user? <><button className="border font-mono border-muted py-1 rounded-lg text-sm px-2 text-muted cursor-pointer  ">
          View all reports
        </button></>:""
        }
      </div>
      <div className="relative mt-5">
        {/* Blurred cards */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ${user ? "" : "blur-sm pointer-events-none select-none"}  pointer-events-none select-none`}
        >
          <div className="max-w-sm">
            <ReportCard company={"Stripe"} role={"Junior Backend Engineer"} />
          </div>
          <div className="max-w-sm">
            <ReportCard company={"Google"} role={"Junior Backend Engineer"} />
          </div>
          <div className="hidden md:flex max-w-sm">
            <ReportCard company={"Google"} role={"Junior Backend Engineer"} />
          </div>
        </div>

        {/* Overlay (not blurred) */}
        <div
          className={` inset-0 mt-5 flex items-center justify-center ${user ? "hidden" : "absolute"}`}
        >
          <div className="bg-surface border border-line rounded-2xl max-w-sm w-full mx-4">
            <div className="flex flex-col justify-center items-center p-5">
              <div className="text-3xl bg-overlay p-1 w-15 h-15 rounded-full flex items-center justify-center">
                <MdLockOutline className="text-ink" />
              </div>
              <h1 className="font-display text-ink font-semibold mt-2 text-center">
                Your reports are waiting
              </h1>
              <p className="text-muted mt-1 text-center text-sm">
                Sign in to view your full interview report history
              </p>
              <div className="flex gap-3 mt-4 w-full">
                <Link to={"/login"} className="flex-1 bg-violet py-2 font-display cursor-pointer text-ink rounded-xl flex justify-center items-center gap-1">
                  Sign in <FiArrowUpRight className="text-xl" />
                </Link >
                <Link to={"/register"} className="flex-1 border border-muted py-2 rounded-xl cursor-pointer text-ink font-display flex justify-center items-center gap-1">
                  Create Account <FiArrowUpRight className="text-xl" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrevReportBanner;
