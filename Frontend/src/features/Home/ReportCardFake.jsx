

const ReportCard = ({company, role}) => {
  return (
    <div className="w-full rounded-2xl border border-line bg-surface p-4 sm:p-5 md:p-6">
  
  {/* Top */}
  <div className="flex items-start justify-between gap-4">
    
    <div className="min-w-0">
      <h2 className="text-base sm:text-lg md:text-xl font-display font-semibold text-ink truncate">
        {company}
      </h2>

      <p className="mt-2 text-sm sm:text-base text-muted leading-relaxed">
        {role}
      </p>
    </div>

    <div className="shrink-0">
      <p className="text-base sm:text-xl md:text-2xl font-bold text-teal whitespace-nowrap">
        87 <span className="text-muted">/ 100</span>
      </p>
    </div>

  </div>

  {/* Tags */}
  <div className="mt-4 flex flex-wrap gap-2">
    <span className="rounded-lg border border-line px-3 py-1 text-xs sm:text-sm text-muted">
      Go
    </span>

    <span className="rounded-lg border border-line px-3 py-1 text-xs sm:text-sm text-muted">
      Distributed Systems
    </span>

    <span className="rounded-lg border border-line px-3 py-1 text-xs sm:text-sm text-muted">
      PostgreSQL
    </span>

    <span className="rounded-lg border border-line px-3 py-1 text-xs sm:text-sm text-muted">
      +4
    </span>
  </div>

  {/* Bottom */}
  <div className="mt-6 flex flex-col gap-2 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
    
    <p>3 gaps found</p>

    <p>2 days ago</p>

  </div>

</div>
  );
};

export default ReportCard;
