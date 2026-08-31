const InterviewReportSkeleton = () => {
  return (
    <div className="min-h-screen bg-app text-ink">
      <div className="flex items-start gap-2 bg-overlay border border-line rounded-lg px-4 py-3 max-w-sm mx-auto mt-4">
        <span className="text-amber-400 mt-0.5">⚠️</span>
        <p className="text-xs text-muted leading-relaxed font-sans">
          This app uses a{" "}
          <span className="text-amber-400 font-medium">free Gemini API</span>.
          Generation can take{" "}
          <span className="text-ink font-medium">30–60 seconds</span> — please
          don't close or refresh the page.
        </p>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr_290px] gap-6">
          {/* Left Sidebar Skeleton */}
          <aside className="hidden lg:flex flex-col justify-start gap-3 bg-surface rounded-xl p-4 border border-line">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="w-full h-11 bg-overlay rounded-xl animate-pulse"
              />
            ))}
          </aside>

          {/* Main Content Skeleton */}
          <main className="bg-surface rounded-xl p-4 border border-line animate-pulse">
            {/* Badge + Title */}
            <div className="flex flex-col gap-4 mb-5">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-overlay" />
                <div className="h-3 w-32 bg-overlay rounded-md" />
              </div>
              <div className="h-6 w-2/3 bg-overlay rounded-md" />
              <div className="h-4 w-1/4 bg-overlay rounded-md" />

              {/* Tags */}
              <div className="flex gap-2 flex-wrap">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-6 w-20 bg-overlay rounded-full" />
                ))}
              </div>
            </div>

            <div className="border-t border-line mb-5" />

            {/* Content Lines */}
            <div className="space-y-3">
              <div className="h-4 bg-overlay rounded-md w-full" />
              <div className="h-4 bg-overlay rounded-md w-5/6" />
              <div className="h-4 bg-overlay rounded-md w-4/6" />
            </div>

            {/* Card blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-28 bg-overlay rounded-xl" />
              ))}
            </div>
          </main>

          {/* Right Sidebar Skeleton */}
          <aside className="hidden lg:flex flex-col gap-10 bg-surface rounded-xl p-4 border border-line">
            {/* MatchScore */}
            <div className="animate-pulse space-y-3">
              <div className="h-4 w-1/2 bg-overlay rounded-md" />
              <div className="h-24 w-24 rounded-full bg-overlay mx-auto" />
              <div className="h-3 w-3/4 bg-overlay rounded-md mx-auto" />
            </div>
            {/* SkillGaps */}
            <div className="animate-pulse space-y-3">
              <div className="h-4 w-1/2 bg-overlay rounded-md" />
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-3 bg-overlay rounded-md"
                  style={{ width: `${70 - i * 10}%` }}
                />
              ))}
            </div>
          </aside>

          {/* Right Sidebar small screen Skeleton */}
          <div className="lg:hidden space-y-5">
            <div className="bg-surface rounded-xl p-4 border border-line animate-pulse space-y-3">
              <div className="h-4 w-1/2 bg-overlay rounded-md" />
              <div className="h-24 w-24 rounded-full bg-overlay mx-auto" />
            </div>
            <div className="bg-surface rounded-xl p-4 border border-line animate-pulse space-y-3">
              <div className="h-4 w-1/2 bg-overlay rounded-md" />
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-3 bg-overlay rounded-md"
                  style={{ width: `${70 - i * 10}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewReportSkeleton;
