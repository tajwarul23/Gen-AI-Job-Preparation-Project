import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div>
        404

  <h2 className="mt-4 text-3xl font-semibold">
    Page Not Found
  </h2>

  <p className="mt-2 text-gray-400 text-center max-w-md">
    The page you're looking for doesn't exist or has been moved.
  </p>

  <Link
    to="/"
    className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-200"
  >
    Go Back Home
  </Link>
</div>
    
  )
}

export default NotFound