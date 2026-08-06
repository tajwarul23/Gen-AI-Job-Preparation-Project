import { MapPin, Users, Wallet, CalendarClock, Briefcase } from "lucide-react";

const formatSalary = (min, max, currency) => {
  const fmt = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "USD",
    maximumFractionDigits: 0,
  });
  if (!min && !max) return "Not disclosed";
  if (min && max) return `${fmt.format(min)} – ${fmt.format(max)}`;
  return fmt.format(min || max);
};

const formatDeadline = (deadline) => {
  if (!deadline) return null;
  const date = new Date(deadline);
  const daysLeft = Math.ceil((date - new Date()) / (1000 * 60 * 60 * 24));
  const label = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return { label, daysLeft };
};

const workModeStyles = {
  REMOTE: "bg-teal/10 text-teal border-teal/30",
  HYBRID: "bg-violet/10 text-violet-text border-violet-border",
  ONSITE: "bg-overlay text-muted border-line",
};

const JobCard = ({ job }) => {
  const {
    title,
    skills = [],
    location,
    workMode,
    employmentType,
    experienceLevel,
    salary,
    vacancy,
    deadline,
  } = job;

  const deadlineInfo = formatDeadline(deadline);
  const isClosingSoon =
    deadlineInfo?.daysLeft !== undefined &&
    deadlineInfo.daysLeft <= 7 &&
    deadlineInfo.daysLeft >= 0;

  return (
    <div className="bg-surface border border-line rounded-2xl p-5 flex flex-col gap-4 hover:border-teal/40 transition-all cursor-pointer">
      {/* Title + Work Mode badge */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-bold font-display text-ink leading-snug">
          {title}
        </h3>
        <span
          className={`shrink-0 text-[10px] font-mono uppercase px-2 py-1 rounded-full border font-bold ${workModeStyles[workMode] || workModeStyles.ONSITE}`}
        >
          {workMode?.toUpperCase()}
        </span>
      </div>

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted font-sans">
        <span className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5" />
          {location?.toUpperCase() || "Location not specified"}
        </span>
        <span className="flex items-center gap-1.5">
          <Briefcase className="w-3.5 h-3.5" />
          {employmentType?.replace("_", " ").toUpperCase()}
        </span>
        <span className="flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5" />
          {vacancy} {vacancy === 1 ? "OPENING" : "OPENINGS"}
        </span>
      </div>

      {/* Skills */}
      {skills.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {skills.slice(0, 5).map((skill, i) => (
            <span
              key={i}
              className="text-[11px] font-mono px-2 py-1 bg-violet border border-line rounded-lg text-ink"
            >
              {skill}
            </span>
          ))}
          {skills.length > 6 && (
            <span className="text-[11px] font-mono px-2 py-1 text-muted">
              +{skills.length - 6} more
            </span>
          )}
        </div>
      )}

      {/* Footer: salary + experience + deadline */}
      <div className="flex items-center justify-between border-t border-line pt-3 mt-auto">
        <div className="flex items-center gap-1.5 text-xs font-mono text-ink">
          <Wallet className="w-3.5 h-3.5 text-teal" />
          {formatSalary(salary?.salaryMin, salary?.salaryMax, salary?.currency)}
        </div>

        {deadlineInfo && (
          <div
            className={`flex items-center gap-1.5 text-[11px] font-mono ${
              isClosingSoon ? "text-red-400" : "text-muted"
            }`}
          >
            <CalendarClock className="w-3.5 h-3.5" />
            {isClosingSoon
              ? `${deadlineInfo.daysLeft}d left`
              : `Closes ${deadlineInfo.label}`}
          </div>
        )}
      </div>

      <div className="text-[10px] font-mono uppercase text-muted tracking-wide">
        {experienceLevel?.toLowerCase()} level
      </div>
    </div>
  );
};

export default JobCard;