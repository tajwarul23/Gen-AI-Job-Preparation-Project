import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../Auth/Hooks/useAuth";

const navLinks = [
  { to: "/resume-builder",      label: "Resume Builder" },
  { to: "/resume-analyzer",     label: "Resume Analyzer" },
  { to: "/interview/allReports", label: "Reports" },
];

const Navbar = () => {
  const { user, handleLogout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `cursor-pointer text-lg transition-colors duration-200 ${
      isActive ? "text-ink" : "text-muted hover:text-ink"
    }`;

  return (
    <div className="font-mono">
      <nav className="relative z-10 flex h-16 items-center justify-between border-b border-line px-6 lg:px-8">

        {/* ── Logo ── */}
        <Link to="/" className="text-3xl font-bold font-mono shrink-0">
          <span className="text-violet">⬡</span>
          <span className="text-ink">Prep</span>{" "}
          <span className="text-violet">Lab</span>
        </Link>

        {/* ── Desktop nav links — hidden on mobile/tablet ── */}
        <div className="hidden lg:flex flex-1 justify-center gap-8">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* ── Desktop right buttons — hidden on mobile/tablet ── */}
        <div className="hidden lg:flex gap-4 shrink-0">
          {user ? (
            <button
              onClick={handleLogout}
              className="rounded-xl border border-line px-4 py-2 text-lg text-muted font-mono
                         cursor-pointer hover:text-ink transition-colors duration-200"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="rounded-xl border border-line px-4 py-2 text-lg text-muted font-mono
                         hover:text-ink transition-colors duration-200"
            >
              Login
            </Link>
          )}
          <button className="rounded-xl bg-violet px-4 py-2 text-white text-lg cursor-pointer">
            Get Started
          </button>
        </div>

        {/* ── Hamburger button — visible on mobile/tablet only ── */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="lg:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8 cursor-pointer"
          aria-label="Toggle menu"
        >
          {/* 3 bars — animate into X when open */}
          <span className={`block w-6 h-0.5 bg-ink transition-all duration-300 origin-center
            ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span className={`block w-6 h-0.5 bg-ink transition-all duration-300
            ${menuOpen ? "opacity-0" : ""}`}
          />
          <span className={`block w-6 h-0.5 bg-ink transition-all duration-300 origin-center
            ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>

      </nav>

      {/* ── Mobile drawer — slides down when open ── */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300
        ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="flex flex-col gap-1 px-6 py-4 border-b border-line bg-surface">

          {/* Nav links */}
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={linkClass}
              onClick={() => setMenuOpen(false)}  // close on navigate
            >
              {link.label}
            </NavLink>
          ))}

          {/* Divider */}
          <div className="border-t border-line my-2" />

          {/* Auth buttons */}
          {user ? (
            <button
              onClick={() => { handleLogout(); setMenuOpen(false); }}
              className="text-left text-lg text-muted hover:text-ink transition-colors duration-200 cursor-pointer"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="text-lg text-muted hover:text-ink transition-colors duration-200"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          )}

          <Link
            className="mt-1 rounded-xl bg-violet px-4 py-2 text-white text-lg text-left w-fit cursor-pointer"
            onClick={() => setMenuOpen(false)}
          >
            Get Started
          </Link>

        </div>
      </div>

    </div>
  );
};

export default Navbar;