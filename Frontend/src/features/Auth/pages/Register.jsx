import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth.js";

const Register = () => {
  const {loading, handleRegister} = useAuth();
  const navigate = useNavigate();
  const [formInput, setFormInput] = useState({
    userName: "",
    email: "",
    password:""
  })
  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(formInput);
    navigate('/login')

  };
  const handleChange = (e) =>{
    setFormInput({...formInput, [e.target.name] : e.target.value})
    
  }
  if(loading){
    return (<main className="min-h-screen flex justify-center items-center">
      <h1 className="text-white text-3xl">Loading...</h1>
    </main>)
  }
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <div className="w-full max-w-md bg-gray-900 text-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Register</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div className="flex flex-col gap-2">
            <label htmlFor="userName" className="text-sm text-gray-300">
              User Name
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={formInput.userName}
              placeholder="Enter User Name"
              onChange={handleChange}
              className="px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email Address"
              value={formInput.email}
              onChange={handleChange}
              className="px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm text-gray-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Password"
              value={formInput.password}
              onChange={handleChange}
              className="px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="cursor-pointer w-full py-3 rounded-lg bg-blue-600 active:scale-95 transform ease-in hover:bg-blue-700 transition font-semibold"
          >
            Register
          </button>
          <h1 className="text-md">Already Registered?<Link className="ml-1 text-blue-700 " to={"/login"}>Login</Link></h1>
        </form>
      </div>
    </main>
  );
};

export default Register;
