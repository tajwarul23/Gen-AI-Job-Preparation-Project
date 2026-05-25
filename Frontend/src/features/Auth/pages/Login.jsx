import { Link } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth.js";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema } from "../../../Schema/loginSchema.js";
import { useEffect, useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import toast from "react-hot-toast";

const Login = () => {
  const { loading, handleLogin, error } = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });
 useEffect(() => {
    if (error) toast.error(error);
  }, [error]);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
     const res = await handleLogin(data);
     toast.success(res);
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";

      setError("root", { message });
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-surface text-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-center mb-8">
          Login
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-display text-gray-300">Email</label>

            <input
              type="email"
              placeholder="Enter Email Address"
              {...register("email")}
              className="px-4 py-3 rounded-lg bg-overlay border border-line
              focus:outline-none focus:ring-2 focus:ring-violet"
            />

            {errors.email && (
              <p className="text-red-400 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-display text-gray-300">
              Password
            </label>

            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                {...register("password")}
                className="w-full px-4 py-3 pr-12 rounded-lg bg-overlay border border-line
    focus:outline-none focus:ring-2 focus:ring-violet"
              />

              {showPassword ? (
                <button type="button" onClick={() => setShowPassword(!showPassword)}>
                  {" "}
                  <FaRegEye
                    
                    className="absolute right-4 top-1/2 -translate-y-1/2
    text-muted cursor-pointer"
                  />
                </button>
              ) : (
                <button>
                  <FaRegEyeSlash
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2
    text-muted cursor-pointer"
                  />
                </button>
              )}
            </div>

            {errors.password && (
              <p className="text-red-400 text-sm">{errors.password.message}</p>
            )}
          </div>

          {errors.root && (
            <p className="text-red-400 text-sm text-center">
              {errors.root.message}
            </p>
          )}
          <button
            type="submit"
            disabled={loading || !isValid}
            className="cursor-pointer w-full py-3 rounded-lg
  bg-violet hover:bg-violet/80 active:scale-95
  transition font-semibold flex items-center justify-center gap-2
  disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>

          <h1 className="text-md">
            Not registered yet?
            <Link className="ml-1 font-mono text-violet" to="/register">
              Register
            </Link>
          </h1>
        </form>
      </div>
    </main>
  );
};

export default Login;
