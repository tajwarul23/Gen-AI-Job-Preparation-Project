import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen max-w-7xl mx-auto flex justify-around items-center font-display text-white ">
      <div>
        <h2 className="mt-4 text-3xl font-display ">Page Not Found</h2>

        <p className="mt-2 text-center max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Link
          to={"/"}
          className="mt-1 rounded-xl bg-violet px-4 py-2 text-white text-lg text-left w-fit cursor-pointer"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
