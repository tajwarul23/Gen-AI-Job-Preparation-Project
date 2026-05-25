import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context.jsx";
import { login, register, logout, getMe } from "../services/auth.api.js";
import { useLocation, useNavigate } from "react-router-dom";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading, error, setError } = context;
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    setError(null);
    try {
      const data = await login({ email, password });
      setUser(data.user);

      navigate(from, { replace: true });
    } catch (error) {
      setError(error?.response?.data?.message || "Something Went Wrong..!");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({ userName, email, password }) => {
    setLoading(true);
    setError(null);
    try {
      const data = await register({ userName, email, password });
      setUser(data.user);
      return data;
    } catch (error) {
      setError(error?.response?.data?.message || "Something Went Wrong..!");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await logout();
      navigate("/");
      setUser(null);
      return data;
      // console.log(data);
    } catch (error) {
      setError(error?.response?.data?.message || "Something Went Wrong..!");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const getAndSetUser = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getMe();
        if (data?.user) {
          setUser(data.user);
        }
      } catch (error) {
        setError(error?.response?.data?.message || "Something Went Wrong..!");

        console.log("Error in useAuth", error.message);

        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getAndSetUser();
  }, [user]);

  return { user, loading, handleRegister, handleLogin, handleLogout, error };
};
