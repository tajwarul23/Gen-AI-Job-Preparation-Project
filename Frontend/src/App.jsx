import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./features/Auth/pages/Login.jsx";
import Register from "./features/Auth/pages/Register.jsx";

import ResumeAnalyzer from "./features/interview/pages/ResumeAnalyzer.jsx";
import InterviewReport from "./features/interview/pages/InterviewReport.jsx";

import AllReports from "./features/interview/pages/AllReports.jsx";

import MainLayout from "./features/Layout/MainLayout.jsx";
import ProtectedLayout from "./features/Layout/ProtectedLayout.jsx";
import Test from "./test.jsx"
import ResumeBuilder from "./features/interview/pages/ResumeBuilder.jsx";
import HomePage from "./features/Home/HomePage.jsx";

import { Toaster } from "react-hot-toast";

import ResumeViewer from "./features/interview/pages/ResumeViewer.jsx";
import AllResumes from "./features/interview/pages/AllResumes.jsx";
import VerifyEmail from "./features/Auth/pages/VerifyEmail.jsx";
const App = () => {
  return (
    <div className="min-h-screen bg-app">
      <Toaster position="top-right"  toastOptions={{
    duration: 3000, // 3 seconds
  }} />
 <Router>
      <Routes>

        {/* Public Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        {/* Layout with Navbar  */}
        <Route element={<MainLayout />}>

        <Route path="/" element={<HomePage />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedLayout />}>
            
            <Route path="/resume-builder" element={<ResumeBuilder/>} />
            <Route path="/resume-analyzer"element={<ResumeAnalyzer />} />
            <Route path="/interview/allReports" element={<AllReports />} />
            <Route path="/interview/:interviewId" element={<InterviewReport />} /> 
            <Route path="/test" element={<Test/>}/>
            <Route path="/resume/:resumeId" element={<ResumeViewer/>}/>
            <Route path="/resume/allResume" element={<AllResumes/>}/>

          </Route>

        </Route>

      </Routes>
    </Router>
    </div>
  );
};

export default App;
