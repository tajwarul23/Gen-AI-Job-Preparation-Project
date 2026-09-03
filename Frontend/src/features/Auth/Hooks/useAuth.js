import { useContext } from "react";
import { AuthContext } from "../auth.context.jsx";
import { login, register, logout, becomeCandidate } from "../services/auth.api.js";

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
    googleLoading,
    setGoogleLoading,
  } = context;

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
      console.log(error);
      
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleLogin = async (intent) => {
    setGoogleLoading(true);
    setError(null);
    try {
      const data = await signInWithGoogle(intent);
      if (data?.success) {
        setUser(data.user);
      }
      return data;
    } catch (error) {
      setError(error?.response?.data?.message || "Something Went Wrong..!");
      console.log(error);
    } finally {
      setGoogleLoading(false);
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
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    setError(null);
    try {
      await signOutFromFirebase();
       await logout();


    } catch (error) {
      setError(error?.response?.data?.message || "Something Went Wrong..!");
      console.log(error);
    } finally {
      setUser(null);
      setLoading(false);
    }
  };

  const handleBecomeCandidate = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await becomeCandidate();
      if (data?.success) {
        setUser(data.user);
      }
      return data;
    } catch (error) {
      setError(error?.response?.data?.message || "Something Went Wrong..!");
      
      console.log(error);
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
    handleBecomeCandidate,
    error,
    setError,
    isInitializing,
    handleGoogleLogin,
    googleLoading
  };
};
