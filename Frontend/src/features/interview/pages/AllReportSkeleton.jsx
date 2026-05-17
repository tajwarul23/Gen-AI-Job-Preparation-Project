const AllReportSkeleton = () => {
  return (
    <div className="min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-surface border border-line rounded-2xl p-5 animate-pulse"
            >

              {/* Top Row */}
              <div className="flex items-center justify-between mb-5">
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-overlay" />

                  <div className="space-y-2">
                    <div className="h-4 w-28 bg-overlay rounded-md" />
                    <div className="h-3 w-20 bg-overlay rounded-md" />
                  </div>
                </div>

                <div className="h-6 w-16 bg-overlay rounded-full" />
              </div>

              {/* Score */}
              <div className="mb-5">
                <div className="h-3 w-24 bg-overlay rounded-md mb-2" />

                <div className="w-full h-2 bg-overlay rounded-full" />
              </div>

              {/* Bottom Content */}
              <div className="space-y-3">
                <div className="h-3 w-full bg-overlay rounded-md" />
                <div className="h-3 w-5/6 bg-overlay rounded-md" />
                <div className="h-3 w-2/3 bg-overlay rounded-md" />
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllReportSkeleton;