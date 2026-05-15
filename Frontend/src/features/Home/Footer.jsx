import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-16">
      
      {/* Divider */}
      <div className="border-t border-line max-w-6xl mx-auto" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-bold font-mono shrink-0"
          >
            <span className="text-violet">⬡</span>
            <span className="text-ink ml-2">Prep</span>
            <span className="text-violet">Lab</span>
          </Link>

          {/* Copyright */}
          <p className="text-muted text-xs text-center">
            © 2026 PrepLab. Built by engineers, for engineers.
          </p>

          {/* Links */}
          <div className="flex items-center gap-5 text-sm">
            <Link className="text-muted hover:text-ink transition-colors" to="/">
              Privacy
            </Link>

            <Link className="text-muted hover:text-ink transition-colors" to="/">
              Terms
            </Link>

            <Link className="text-muted hover:text-ink transition-colors" to="/">
              Contact
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;