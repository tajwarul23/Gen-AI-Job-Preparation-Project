import { createContext, useState, useMemo } from "react";
import { getMe } from "./services/auth.api.js";
import { useEffect } from "react";


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

    try {
      const data = await getMe();
      setUser(data?.user || null);
    } catch (error) {
      setUser(null);

      if (error?.response?.status !== 401) {
        setError(
          error?.response?.data?.message || "Something Went Wrong..!"
        );
        console.log("Error in getUser:", error);
      }
    } finally {
      setIsInitializing(false);
    }
  };

  fetchCurrentUser();
}, []);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
