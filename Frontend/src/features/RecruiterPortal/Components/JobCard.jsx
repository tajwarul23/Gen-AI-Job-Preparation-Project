import {
  MapPin,
  Users,
  Wallet,
  CalendarClock,
  Briefcase,
  Map,
} from "lucide-react";
import { useRef } from "react";
import { useAuth } from "../../Auth/Hooks/useAuth";
import DescriptionModalBody from "./DescriptionModalBody";
import UpdateModalBody from "./UpdateModalBody";

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
  REMOTE: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  HYBRID: "bg-violet/10 text-violet-text border-violet-border",
  ONSITE: "bg-yellow-500/10 text-yellow-600 border-yellow-500/30",
};

const statusStyles = {
  OPEN: "bg-teal/10 text-teal border-teal/30",
  CLOSED: "bg-red-500/10 text-red-400 border-red-500/30",
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
    description,
    companyName,
    status,
    company,
  } = job;
  const dialogRef = useRef(null);
  const updateDialogRef = useRef(null);
  const deadlineInfo = formatDeadline(deadline);
  const isClosingSoon =
    deadlineInfo?.daysLeft !== undefined &&
    deadlineInfo.daysLeft <= 7 &&
    deadlineInfo.daysLeft >= 0;

  const { user } = useAuth();
  const showUpdateButton = user?.company === company;

  return (
    <div
      className="
      group flex h-full flex-col rounded-2xl
      border border-line bg-surface
      p-5
      transition-all duration-200
      hover:-translate-y-0.5
      hover:border-teal/40
      hover:shadow-lg hover:shadow-black/5
    "
    >
      {/* - HEADER - */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2
            className="
      line-clamp-2 text-base font-bold leading-6
      text-ink transition-colors
      group-hover:text-teal
    "
          >
            {title}
          </h2>

          <div className="flex items-center gap-2">
            <Map />
            <p className="mt-1 text-lg font-sans text-ink">{companyName}</p>
          </div>

          <p className="mt-1 text-[10px] font-mono uppercase tracking-wide text-muted">
            {experienceLevel?.toLowerCase()} level
          </p>
        </div>

        <div className="flex  gap-5">
          <span
            className={`
          rounded-full border px-2.5 py-1
          text-[10px] font-mono font-bold uppercase tracking-wide
          ${statusStyles[status]}
        `}
          >
            {status.toLowerCase()}
          </span>
          <span
            className={`
          shrink-0 rounded-full border px-2.5 py-1
          text-[10px] font-mono font-bold uppercase tracking-wide
          ${workModeStyles[workMode]}
        `}
          >
            {workMode?.toLowerCase()}
          </span>
        </div>
      </div>

      {/* - META - */}
      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
        <span className="flex items-center gap-1.5 text-xs text-muted">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">
            {location || "Location not specified"}
          </span>
        </span>

        <span className="flex items-center gap-1.5 text-xs text-muted">
          <Briefcase className="h-3.5 w-3.5 shrink-0" />
          {employmentType?.replace("_", " ").toLowerCase()}
        </span>

        <span className="flex items-center gap-1.5 text-xs text-muted">
          <Users className="h-3.5 w-3.5 shrink-0" />
          {vacancy} {vacancy === 1 ? "opening" : "openings"}
        </span>
      </div>

      {/* - DIVIDER - */}
      <div className="my-4 h-px bg-line" />

      {/* - SKILLS - */}
      {skills?.length > 0 && (
        <div>
          <p className="mb-2 text-[10px] font-mono uppercase tracking-wider text-muted">
            Skills
          </p>

          <div className="flex flex-wrap gap-1.5">
            {skills.slice(0, 5).map((skill, i) => (
              <span
                key={i}
                className="
                rounded-md border border-line
                bg-overlay px-2 py-1
                text-[11px] font-mono text-ink
                transition-colors
                group-hover:border-teal/20
              "
              >
                {skill}
              </span>
            ))}

            {skills.length > 5 && (
              <span
                className="
                rounded-md px-2 py-1
                text-[11px] font-mono
                text-muted
              "
              >
                +{skills.length - 5} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* - DESCRIPTION - */}
      <div className="mt-5">
        <p className="mb-2 text-[10px] font-mono uppercase tracking-wider text-muted">
          Job Description:
        </p>

        <div className="line-clamp-8 min-h-29 text-sm leading-6 text-ink/80">
          {description
            ?.slice(0, 300)
            .split("\n")
            .filter(Boolean)
            .map((line, index) => {
              const isHeading = line.trim().includes(":");

              return (
                <p
                  key={index}
                  className={isHeading ? "font-semibold text-ink" : ""}
                >
                  {line}
                </p>
              );
            })}
        </div>

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => dialogRef.current?.showModal()}
            className="group inline-flex items-center gap-1.5 text-xs font-semibold text-teal
               hover:text-teal/80 transition-colors cursor-pointer"
          >
            View job description
            <span className="transition-transform group-hover/link:translate-x-0.5">
              →
            </span>
          </button>

          {showUpdateButton && (
            <button
              type="button"
              onClick={() => updateDialogRef.current?.showModal()}
              className="px-3 py-1.5 mt-3 text-xs font-semibold rounded-lg
               border-2 border-teal text-muted
               hover:text-ink hover:bg-overlay
               transition-colors cursor-pointer"
            >
              Update
            </button>
          )}
        </div>
      </div>

      {/* - SPACER - */}
      <div className="flex-1" />

      {/* - FOOTER - */}
      <div className="mt-5 border-t border-line pt-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          {/* Salary */}
          <div>
            <p className="mb-1 text-[10px] font-mono uppercase tracking-wider text-muted">
              Salary
            </p>

            <div className="flex items-center gap-1.5 text-sm font-semibold text-ink">
              <Wallet className="h-3.5 w-3.5 text-teal" />
              {formatSalary(
                salary?.salaryMin,
                salary?.salaryMax,
                salary?.currency,
              )}
            </div>
          </div>

          {/* Deadline */}
          {deadlineInfo && (
            <div className="text-right">
              <div
                className={`
                flex items-center justify-end gap-1.5
                text-[11px] font-mono
                ${isClosingSoon ? "text-red-400" : "text-muted"}
              `}
              >
                <CalendarClock className="h-3.5 w-3.5" />

                {isClosingSoon
                  ? `${deadlineInfo.daysLeft}d left`
                  : `Closes ${deadlineInfo.label}`}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* - DESCRIPTION MODAL - */}

      <DescriptionModalBody
        dialogRef={dialogRef}
        title={title}
        workMode={workMode}
        employmentType={employmentType}
        description={description}
      />
      <UpdateModalBody updateDialogRef={updateDialogRef} job={job} />
    </div>
  );
};

export default JobCard;
