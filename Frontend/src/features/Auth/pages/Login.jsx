import { Link } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";
import { useState } from "react";

const Login = () => {
  
    const {loading, handleLogin} = useAuth();
    const [formInput, setFormInput] = useState({
      email:"",
      password:""
    })
    
      const handleSubmit = async (e)=>{
        e.preventDefault();
        handleLogin(formInput)
        // console.log(formInput);
    }
    const handleChange = (e)=>{
      
      setFormInput({...formInput, [e.target.name] : e.target.value})
    }
    if(loading){
      return <main className="min-h-screen flex justify-center items-center"><h1 className="text-white text-3xl">Loading....</h1></main>
    }
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <div className="w-full max-w-md bg-gray-900 text-white rounded-2xl shadow-lg p-8">
        
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Email */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formInput.email}
              placeholder="Enter Email Address"
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
              value={formInput.password}
              onChange={handleChange}
              placeholder="Enter Password"
              className="px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="cursor-pointer w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition transform ease-in active:scale-95  font-semibold"
          >
            Login
          </button>
          <h1 className="text-md">Don't have an account?<Link className="ml-1 text-blue-700 " to={"/register"}>Register</Link></h1>
        </form>

      </div>
    </main>
  );
};

export default Login;