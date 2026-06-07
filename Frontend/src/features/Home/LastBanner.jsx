import { FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuth } from "../Auth/Hooks/useAuth";

import AllResumes from "../ResumeBuilder/Pages/AllResumes";
const LastBanner = () => {
  const {user} = useAuth();
  if(user){
    return(<AllResumes/>)
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col justify-center items-center border border-violet/40 p-10 rounded-2xl shadow-[0_15px_40px_-25px_rgba(124,90,247,0.25)]">
        <h1 className="max-w-4xl text-4xl text-center sm:text-5xl lg:text-7xl font-black leading-none  text-ink font-display scale-y-75  wrap-break-word">
          Ready to ace your next interview?
        </h1>
        <p className="text-muted font-display mt-4 max-w-xl text-sm sm:text-base">
          Stop guessing what they'll ask. Get a full interview report tailored
          to your role.
        </p>
        <div className="flex gap-3 mt-4 w-sm ">
                <Link to={"/login"} className="flex-1 bg-violet py-2 font-display cursor-pointer text-ink rounded-xl flex justify-center items-center gap-1">
                  Sign in <FiArrowUpRight className="text-xl" />
                </Link >
                <Link to={"/register"} className="flex-1 border border-muted py-2 rounded-xl cursor-pointer text-muted hover:text-ink hover:border-ink transition-colors font-display flex justify-center items-center gap-1">
                Watch a demo <FiArrowUpRight className="text-xl" />
                </Link>
              </div>
      </div>
    </div>
  );
};

export default LastBanner;
