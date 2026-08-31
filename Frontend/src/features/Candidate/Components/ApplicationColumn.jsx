import ApplicationCard from "./ApplicationCard";

const ApplicationColumn = ({ label, accentClass, dotClass, applications }) => {
  return (
    <div className="flex w-72 shrink-0 flex-col rounded-2xl border border-line bg-surface/50 p-3 sm:w-80">
      <div
        className={`mb-3 flex items-center justify-between rounded-xl border px-3 py-2 ${accentClass}`}
      >
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${dotClass}`} />
          <span className="text-xs font-mono font-bold uppercase tracking-wide">
            {label}
          </span>
        </div>
        <span className="text-xs font-mono font-bold">{applications.length}</span>
      </div>

      <div className="flex flex-col gap-2 overflow-y-auto">
        {applications.length > 0 ? (
          applications.map((application) => (
            <ApplicationCard key={application._id} application={application} />
          ))
        ) : (
          <p className="py-6 text-center text-xs text-muted font-sans">
            Nothing here yet
          </p>
        )}
      </div>
    </div>
  );
};

export default ApplicationColumn;
