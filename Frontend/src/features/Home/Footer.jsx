import { Cpu } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-16">
      {/* Divider */}
      <div className="border-t border-line max-w-6xl mx-auto" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div
            // onClick={() => navigate("landing")}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-violet/10 border border-violet-border flex items-center justify-center text-violet-text group-hover:bg-violet/20 group-hover:border-violet transition-colors">
              <Cpu className="w-7 h-7 animate-pulse" />
            </div>
            <div>
              <span className="font-display font-bold text-ink text-2xl tracking-relax">
                HireFlow
              </span>
            </div>
          </div>

          {/* Copyright */}
          <p className="text-muted text-xs text-center">
            © 2026 HireFlow. Built by engineers, for engineers.
          </p>

          {/* Links */}
          <div className="flex items-center gap-5 text-sm">
            <Link
              className="text-muted hover:text-ink transition-colors"
              to="/"
            >
              Privacy
            </Link>

            <Link
              className="text-muted hover:text-ink transition-colors"
              to="/"
            >
              Terms
            </Link>

            <Link
              className="text-muted hover:text-ink transition-colors"
              to="/"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
