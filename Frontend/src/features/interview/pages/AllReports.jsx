
import { useEffect } from "react";
import { useInterview } from "../Hooks/useInterview";
import { Link } from "react-router-dom";


const AllReports = () => {
  const {  reports, loading, getAllReport } = useInterview();

useEffect(() => {
    getAllReport()
  }, []);
  
  if (loading || !reports) {
    return (
      <main className="loading-screen text-ink text-7xl">
        <h1>Loading your interview plan...</h1>
      </main>
    );
  }

  return (
    <div className="min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1>This is reports {reports?.length}</h1>
        <div className="grid grid-cols-1 lg:flex justify-around items-center   gap-5 ">
          {reports?.map((r, i) => (
            <div className="bg-gray-900 p-5 rounded-2xl" key={i}>
              <h1>{r.title}</h1>
            <div className="flex flex-col gap-2 ">
                  <p className="text-sm text-gray-500">
                {" "}
                {new Date(r?.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
             <Link
  className="inline-flex items-center justify-center w-fit bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-medium px-3 py-2 rounded-lg transition active:scale-95"
  to={`/interview/${r._id}`}
>
  View Report
</Link>
            </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllReports;
