import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/Hooks/useAuth";
import toast from "react-hot-toast";
import { Cpu } from "lucide-react";


const candidateNavLinks = [
  { to: "/resume-builder", label: "Resume Builder" },
  { to: "/resume-analyzer", label: "Resume Analyzer" },
  { to: "/interview/allReports", label: "Reports" },
  { to: "/resume/allResume", label: "Resumes" },
];

const recruiterNavLinks = [
  { to: "/recruiter/dashboard", label: "Dashboard" },
  { to: "/interview/allReports", label: "Reports" },
];

const Navbar = () => {
  const { user, handleLogout, loading } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const authIntent = sessionStorage.getItem("authIntent");

  let navLinks;
  if (!user) navLinks = [];
  else if (user?.role === "candidate" && authIntent === "recruiter") navLinks = [];
  else if (user?.role === "company_admin" || user.role === "recruiter")
    navLinks = recruiterNavLinks;
  else if (user?.role === "candidate") navLinks = candidateNavLinks;

  const handleLogoutClick = async () => {
    navigate("/");
    const res = await handleLogout();
    toast.success(res?.message || "Logged out successfully!");
  };

  const linkClass = ({ isActive }) =>
    `cursor-pointer text-lg transition-colors duration-200 font-sans ${
      isActive ? "text-ink" : "text-muted hover:text-ink"
    }`;

  return (
    <div className="font-sans">
      <nav className="relative z-10 flex h-16 items-center justify-between border-b border-line px-6 lg:px-8">
        {/* Brand Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-violet/10 border border-violet-border flex items-center justify-center text-violet-text group-hover:bg-violet/20 group-hover:border-violet transition-colors">
            <Cpu className="w-7 h-7 animate-pulse" />
          </div>
          <div>
            <span className="font-display font-bold text-ink text-2xl tracking-relax">
              PrepLab
            </span>
          </div>
        </div>

        {/* ── Desktop nav links — hidden on mobile/tablet ── */}
        <div className="hidden lg:flex flex-1 justify-center gap-8 ">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* ── Desktop right buttons — hidden on mobile/tablet ── */}
        <div className="hidden lg:flex gap-4 shrink-0">
          {user ? (
            loading ? (
              <div className="flex items-center justify-center gap-2">
                <button
                  className="rounded-xl border border-line px-4 py-2 text-lg text-muted font-sans
             cursor-pointer hover:text-ink transition-colors duration-200
             flex items-center gap-2"
                >
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Logging Out
                </button>
              </div>
            ) : (
              <button
                onClick={handleLogoutClick}
                className="rounded-xl border border-line px-4 py-2 text-lg text-muted font-sans
                   cursor-pointer hover:text-ink transition-colors duration-200"
              >
                Logout
              </button>
            )
          ) : (
            <Link
              to={"/login"}
              className="rounded-xl bg-violet px-4 py-2 text-white text-lg cursor-pointer"
            >
              Get Started
            </Link>
          )}
        </div>

        {/* ── Hamburger button — visible on mobile/tablet only ── */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="lg:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8 cursor-pointer"
          aria-label="Toggle menu"
        >
          {/* 3 bars — animate into X when open */}
          <span
            className={`block w-6 h-0.5 bg-ink transition-all duration-300 origin-center
            ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-ink transition-all duration-300
            ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-ink transition-all duration-300 origin-center
            ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </nav>

      {/* ── Mobile drawer — slides down when open ── */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300
        ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="flex flex-col gap-1 px-6 py-4 border-b border-line bg-surface">
          {/* Nav links */}
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={linkClass}
              onClick={() => setMenuOpen(false)} // close on navigate
            >
              {link.label}
            </NavLink>
          ))}

          {/* Divider */}
          <div className="border-t border-line my-2" />

          {/* Auth buttons */}
          {user ? (
            loading ? (
              <div className="flex items-center gap-2">
                <button className="text-left text-lg flex items-center gap-2  text-muted hover:text-ink transition-colors duration-200 cursor-pointer">
                  <div className="w-4 h-4 border-2 border-muted border-t-transparent rounded-full animate-spin" />
                  Logging out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  handleLogoutClick();
                  setMenuOpen(false);
                }}
                className="text-left text-lg text-muted hover:text-ink transition-colors duration-200 cursor-pointer"
              >
                Logout
              </button>
            )
          ) : (
            <Link
              to={"/login"}
              className="mt-1 rounded-xl bg-violet px-4 py-2 text-white text-lg text-left w-fit cursor-pointer"
            >
              Get Started
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
