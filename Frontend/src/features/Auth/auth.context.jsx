import { createContext, useState, useMemo } from "react";
import { getMe } from "./services/auth.api.js";
import { useEffect } from "react";
import { success } from "zod";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);

  const value = useMemo(
    () => ({
      user,
      setUser,
      loading,
      setLoading,
      error,
      setError,
      isInitializing,
      setIsInitializing,
    }),
    [user, loading, error, isInitializing],
  );

  useEffect(() => {
    const fetchCurrentUser = async () => {
      setIsInitializing(true);
      setError(null);
      try {
        const data = await getMe();
        if (data?.user) {
          setUser(data.user);
        }
      } catch (error) {
        if (error?.response?.status !== 401) {
          setUser(null);
         return;
        }
        setError(error?.response?.data?.message || "Something Went Wrong..!");
        console.log("Error in getUser", error.message);

        setUser(null);
      } finally {
        setIsInitializing(false);
      }
    };
    fetchCurrentUser();
  }, []);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
