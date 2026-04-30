import { useContext } from "react";
import { AuthContext } from "../auth.context.jsx";
import { login, register, logout } from "../services/auth.api.js";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;
  const navigate = useNavigate();

  const handleLogin = async ({ email, password }) => {
    setLoading(true);

    try {
      const data = await login({ email, password });
      setUser(data.user);
      // console.log("Logged in successfully", data.user);
      navigate('/');
      
    } catch (error) {
      console.log("Error in handleLogin", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({ userName, email, password }) => {
    setLoading(true);

    try {
      const data = await register({ userName, email, password });
      setUser(data.user);
    } catch (error) {
      console.log("Error in handleRegister", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      const data = await logout();
      setUser(null);
    } catch (error) {
      console.log("Error in handleLogout", error.message);
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, handleRegister, handleLogin, handleLogout };
};
