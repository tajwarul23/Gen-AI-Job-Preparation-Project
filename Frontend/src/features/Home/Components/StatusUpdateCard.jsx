import { Check, MailCheck } from "lucide-react";

const StatusUpdateCard = () => {
  return (
    <div className="bg-surface border border-line rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-violet/40 transition-all group shadow-sm">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-violet/10 border border-violet-border flex items-center justify-center text-violet-text group-hover:scale-110 transition-transform">
            <MailCheck className="w-6 h-6" />
          </div>
        </div>
        <h3 className="text-2xl font-bold font-display text-ink mb-3">
          Automated Candidate Updates
        </h3>
        <p className="text-muted text-xs sm:text-sm leading-relaxed mb-6">
          Move a candidate to Interview, Shortlisted, Hired, or Rejected and
          they're notified instantly, no manual follow-up needed. Interview
          moves include the link, date, and time automatically.
        </p>
        <div className="space-y-2 font-sans text-xs text-ink/80 border-t border-line pt-4 mb-6">
          <div className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-violet-text shrink-0" />
            <span>Instant Email on Every Status Change</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-violet-text shrink-0" />
            <span>Interview Details Sent Automatically</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-violet-text shrink-0" />
            <span>In-App Notification Trail</span>
          </div>
        </div>
      </div>
      <div className="p-3.5 bg-overlay border border-line rounded-xl text-xs font-sans text-muted flex items-center justify-between">
        <span>Status Changed to Interview</span>
        <span className="text-violet-text font-bold">Email Sent</span>
      </div>
    </div>
  );
};

export default StatusUpdateCard;
