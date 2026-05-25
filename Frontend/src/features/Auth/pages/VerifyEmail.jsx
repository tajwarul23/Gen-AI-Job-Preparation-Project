import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { verifyEmail } from "../services/auth.api.js";
import { useRef } from "react";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("verifying"); 
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const hasRun = useRef(false);

  useEffect(() => {
    if(hasRun.current)return;
    hasRun.current = true;
    const token = searchParams.get("verificationToken");

    if (!token) {
      setStatus("error");
      setMessage("Invalid verification link.");
      return;
    }

    const verify = async () => {
      try {
        const data = await verifyEmail(token);
        setStatus("success");
        setMessage(data.message);
      } catch (error) {
        setStatus("error");
        setMessage(error.response?.data?.message || "Verification failed.");
      }
    };

    verify();
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-surface text-white rounded-2xl shadow-lg p-8 text-center">
        {status === "verifying" && <p>Verifying your email...</p>}

        {status === "success" && (
          <>
            <h1 className="text-2xl font-semibold mb-4">Email Verified!</h1>
            <p className="text-gray-300 mb-6">{message}</p>
            <button
              onClick={() => navigate("/login")}
              className="py-3 px-6 rounded-lg bg-violet hover:bg-violet/80 transition font-semibold"
            >
              Go to Login
            </button>
          </>
        )}

        {status === "error" && (
          <>
            <h1 className="text-2xl font-semibold mb-4">Verification Failed</h1>
            <p className="text-gray-300 mb-6">{message}</p>
            <button
              onClick={() => navigate("/register")}
              className="py-3 px-6 rounded-lg bg-violet hover:bg-violet/80 transition font-semibold"
            >
              Back to Register
            </button>
          </>
        )}
      </div>
    </main>
  );
};

export default VerifyEmail;