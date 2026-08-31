import { Search, SlidersHorizontal, X, Loader2 } from "lucide-react";
import { useState, useEffect, useRef, useMemo } from "react";
import { useGetJobFeed } from "../features/RecruiterPortal/Hooks/useJob";
import { useDebounce } from "./useDebounce.js";
import JobCard from "../features/RecruiterPortal/Components/JobCard.jsx";


const DEFAULT_FILTERS = {
  q: "",
  location: "",
  workMode: "",
  employmentType: "",
  experienceLevel: "",
  
};

const JobFeed = () => {
  

  const [searchInput, setSearchInput] = useState("");
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [showFilters, setShowFilters] = useState(true);

  const debouncedSearch = useDebounce(searchInput, 400);

  // Push debounced search into the actual filter object used by the query
  useEffect(() => {
    setFilters((prev) => ({ ...prev, q: debouncedSearch }));
  }, [debouncedSearch]);

  // Strip empty values so the query key / request params stay clean
  const activeFilters = useMemo(() => {
    return Object.fromEntries(
      Object.entries(filters).filter(([, v]) => v !== "" && v != null),
    );
  }, [filters]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetJobFeed(activeFilters);

  const jobList = useMemo(
    () => data?.pages.flatMap((page) => page.data.jobs) || [],
    [data],
  );

  const totalLoaded = jobList.length;

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setSearchInput("");
    setFilters(DEFAULT_FILTERS);
  };

  const hasActiveFilters =
    filters.location || filters.workMode || filters.employmentType || filters.experienceLevel;

  // Infinite scroll sentinel
  const sentinelRef = useRef(null);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="min-h-screen bg-app">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl lg:text-2xl font-bold font-display text-ink">
              Job Feed
            </h1>
            <p className="text-xs text-muted font-sans mt-0.5">
              {totalLoaded} open {totalLoaded === 1 ? "role" : "roles"} loaded
            </p>
          </div>

          
        </div>

        {/* Search + Filter toggle */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search job titles, keywords..."
              className="w-full bg-overlay border text-ink font-mono border-line rounded-xl pl-9 pr-3 py-2.5 text-sm
                         focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal
                         placeholder:text-muted transition-all"
            />
          </div>

          

          <button
            type="button"
            onClick={() => setShowFilters((prev) => !prev)}
            className={`px-4 py-2.5 border rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all ${
              showFilters || hasActiveFilters
                ? "bg-teal/10 border-teal text-teal"
                : "bg-overlay border-line text-ink hover:bg-surface"
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Filters
            {hasActiveFilters && (
              <span className="w-1.5 h-1.5 rounded-full bg-teal" />
            )}
          </button>
        </div>

        {/* Filter panel */}
        {showFilters && (
          <div className="bg-surface border border-line rounded-2xl p-4 mb-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label className="block text-ink text-sm font-mono uppercase  mb-1.5">
                Location
              </label>
              <input
                value={filters.location}
                onChange={(e) => updateFilter("location", e.target.value)}
                placeholder="e.g. Sylhet"
                className="w-full bg-overlay border border-line rounded-lg p-2 text-sm text-ink"
              />
            </div>

            <div>
              <label className="block text-sm font-mono uppercase text-ink mb-1.5">
                Work Mode
              </label>
              <select
                value={filters.workMode}
                onChange={(e) => updateFilter("workMode", e.target.value)}
                className="w-full bg-overlay border border-line rounded-lg p-2 text-sm text-ink"
              >
                <option value="">Any</option>
                <option value="REMOTE">Remote</option>
                <option value="HYBRID">Hybrid</option>
                <option value="ONSITE">Onsite</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-mono uppercase text-muted mb-1.5">
                Employment Type
              </label>
              <select
                value={filters.employmentType}
                onChange={(e) => updateFilter("employmentType", e.target.value)}
                className="w-full bg-overlay border border-line rounded-lg p-2 text-sm text-ink"
              >
                <option value="">Any</option>
                <option value="FULL_TIME">Full Time</option>
                <option value="PART_TIME">Part Time</option>
                <option value="CONTRACT">Contract</option>
                <option value="INTERNSHIP">Internship</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-mono uppercase text-muted mb-1.5">
                Experience
              </label>
              <select
                value={filters.experienceLevel}
                onChange={(e) => updateFilter("experienceLevel", e.target.value)}
                className="w-full bg-overlay border border-line rounded-lg p-2 text-sm text-ink"
              >
                <option value="">Any</option>
                <option value="ENTRY">Entry</option>
                <option value="JUNIOR">Junior</option>
                <option value="MID">Mid</option>
                <option value="SENIOR">Senior</option>
                <option value="LEAD">Lead</option>
              </select>
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="sm:col-span-2 lg:col-span-4 text-xs text-muted hover:text-ink flex items-center gap-1.5 justify-center py-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                Clear all filters
              </button>
            )}
          </div>
        )}

        {/* Job Feed */}
        {isLoading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-6 h-6 text-teal animate-spin" />
          </div>
        ) : jobList.length > 0 ? (
          <>
            <div className="grid  gap-4">
              {jobList.map((job) => (
                <JobCard key={job._id || job.id} job={job} view = {"platform"}/>
              ))}
            </div>

            <div ref={sentinelRef} className="flex justify-center py-8">
              {isFetchingNextPage && (
                <Loader2 className="w-5 h-5 text-teal animate-spin" />
              )}
              {!hasNextPage && !isFetchingNextPage && (
                <p className="text-xs text-muted font-mono">
                  You've reached the end of the feed
                </p>
              )}
            </div>
          </>
        ) : (
          <div className="text-4xl text-ink text-center">NO JOB FOUND</div>
        )}
      </div>
    </div>
  );
};

export default JobFeed;