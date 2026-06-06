import { useContext } from "react";
import { AuthContext } from "../auth.context.jsx";
import { login, register, logout } from "../services/auth.api.js";
import { useLocation, useNavigate } from "react-router-dom";
import { useFirebaseAuth } from "./useFirebaseAuth.js";


export const useAuth = () => {
  const { signInWithGoogle, signOutFromFirebase } = useFirebaseAuth();
  const context = useContext(AuthContext);
  const {
    user,
    setUser,
    loading,
    setLoading,
    error,
    setError,
    isInitializing,
    fetchCurrentUser,
  } = context;
  const navigate = useNavigate();
  

  

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    setError(null);
    try {
      const data = await login({ email, password });
      if (data?.success) {
        console.log(data);

        setUser(data.user);
      }
      return data;
    } catch (error) {
      setError(error?.response?.data?.message || "Something Went Wrong..!");
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await signInWithGoogle();
      if (data?.success) {
        setUser(data.user);
      }
      return data;
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
      if (data?.success) {
        setUser(data.user);
        return data;
      }
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
      await signOutFromFirebase();
      const data = await logout();
      
      if(data?.success){
          setUser(null);
      navigate("/");
      return data;
      }
    } catch (error) {
      setError(error?.response?.data?.message || "Something Went Wrong..!");
    } finally {
      setLoading(false);
    }
  };

 

  return {
    user,
    fetchCurrentUser,
    loading,
    handleRegister,
    handleLogin,
    handleLogout,
    error,
    isInitializing,
    handleGoogleLogin,
    
  };
};
