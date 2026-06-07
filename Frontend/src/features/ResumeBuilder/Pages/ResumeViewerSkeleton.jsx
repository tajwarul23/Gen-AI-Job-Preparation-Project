const ResumeViewerSkeleton = () => {
  return (
    <div className="min-h-screen bg-app flex flex-col items-center py-8 px-4 animate-pulse">
      
      {/* Toolbar Skeleton */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-4">
        <div className="h-6 w-64 bg-gray-700 rounded-md" />
        <div className="h-10 w-36 bg-gray-700 rounded-lg" />
      </div>

      {/* PDF Viewer Skeleton */}
      <div className="w-full max-w-4xl min-h-screen rounded-xl border-2 border-dashed border-muted bg-gray-800 relative overflow-hidden">
        
        {/* Fake PDF lines */}
        <div className="absolute inset-0 p-6 space-y-4">
          <div className="h-4 w-full bg-gray-700 rounded" />
          <div className="h-4 w-5/6 bg-gray-700 rounded" />
          <div className="h-4 w-4/6 bg-gray-700 rounded" />
          <div className="h-4 w-3/6 bg-gray-700 rounded" />
          
          <div className="h-4 w-full bg-gray-700 rounded mt-6" />
          <div className="h-4 w-5/6 bg-gray-700 rounded" />
          <div className="h-4 w-4/6 bg-gray-700 rounded" />
          
          <div className="h-4 w-full bg-gray-700 rounded mt-6" />
          <div className="h-4 w-3/5 bg-gray-700 rounded" />
        </div>

        {/* Loading overlay hint */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-sm text-muted bg-black/40 px-4 py-2 rounded-lg">
            Loading resume preview...
          </div>
        </div>

      </div>
    </div>
  );
};

export default ResumeViewerSkeleton;