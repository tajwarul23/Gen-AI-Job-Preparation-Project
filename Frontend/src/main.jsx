import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./features/Auth/auth.context.jsx";
import { InterviewProvider } from "./features/interview/interview.context.jsx";
// import { ResumeProvider } from "./features/ResumeBuilder/Services/resume.context.jsx";
import { ResumeProvider } from "./features/ResumeBuilder/Services/resume.context.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <InterviewProvider>
        <ResumeProvider>
          <App />
        </ResumeProvider>
      </InterviewProvider>
    </AuthProvider>
  </StrictMode>,
);
