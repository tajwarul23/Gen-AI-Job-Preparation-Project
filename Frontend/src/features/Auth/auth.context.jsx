import {
  createContext,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import { getMe } from "./services/auth.api.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);

  const fetchCurrentUser = useCallback(async () => {
    setIsInitializing(true);

    try {
      const data = await getMe();
      setUser(data?.user || null);
      console.log("User after fetched or set", data.user);
    } catch (error) {
      setUser(null);

      if (error?.response?.status !== 401) {
        setError(error?.response?.data?.message || "Something Went Wrong..!");
        console.log("Error in fetchCurrentUser",error?.response?.data?.message );
        
      }
    } finally {
      setIsInitializing(false);
    }
  }, []);

  // initial load
  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

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
      fetchCurrentUser,
      googleLoading,
      setGoogleLoading,
    }),
    [user, loading, error, isInitializing, fetchCurrentUser, googleLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
