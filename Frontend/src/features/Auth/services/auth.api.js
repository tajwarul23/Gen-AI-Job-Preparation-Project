import axios from "axios";

//whenever there is any interaction with the cookie we have to use withCredentials : true
////so the browser sends the cookie to server also receives/stores the cookie

//creating an instance of axios that is constant for API calling

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   withCredentials: true,
// });
// const api = axios.create({
//   baseURL: "http://192.168.0.100:3000",
//   withCredentials: true,
// });
const api = axios.create({
  baseURL: "https://gen-ai-job-preparation-project.onrender.com",
  withCredentials: true,
});

export const register = async ({ userName, email, password }) => {
  const response = await api.post("/api/auth/register", {
    userName,
    email,
    password,
  });
  return response.data;
};

export const login = async ({ email, password }) => {
  const response = await api.post("/api/auth/login", {
    email,
    password,
  });
  return response.data;
};

export const logout = async () => {
  const response = await api.post("/api/auth/logout");
  return response.data;
};

export const verifyEmail = async (token) => {
  const response = await api.get(
    `/api/auth/verify-email?verificationToken=${token}`,
  );
  return response.data;
};

export const getMe = async () => {
  const response = await api.get("/api/auth/get-me");
  return response.data;
};


