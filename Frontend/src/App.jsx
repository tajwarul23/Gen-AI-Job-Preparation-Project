import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { lazy, Suspense } from "react";

import MainLayout from "./features/Layout/MainLayout.jsx";
import ProtectedLayout from "./features/Layout/ProtectedLayout.jsx";
import HomePage from "./features/Home/HomePage.jsx";
import NotFound from "./features/Layout/NotFound.jsx";
import SpinLoader from "./Shared/SpinLoader.jsx";
import CandidateDashBoard from "./features/Candidate/CandidateDashBoard.jsx";


import RecruiterDashBoard from "./features/RecruiterPortal/Pages/RecruiterDashBoard.jsx";

import OnBoardCompany from "./features/RecruiterPortal/Pages/OnBoardCompany.jsx";

const Login = lazy(()=>import("./features/Auth/pages/Login.jsx"))
const Register = lazy(()=>import("./features/Auth/pages/Register.jsx"))
const ResumeAnalyzer = lazy(()=>import("./features/interview/pages/ResumeAnalyzer.jsx"))
const InterviewReport = lazy(()=>import("./features/interview/pages/InterviewReport.jsx"))
const AllReports = lazy(()=>import("./features/interview/pages/AllReports.jsx"))
const ResumeBuilder = lazy(()=>import("./features/ResumeBuilder/Pages/ResumeBuilder.jsx"))
const ResumeViewer = lazy(()=>import("./features/ResumeBuilder/Pages/ResumeViewer.jsx"))
const AllResumes = lazy(()=>import("./features/ResumeBuilder/Pages/AllResumes.jsx"))




const App = () => {
  return (
    <div className="min-h-screen bg-app">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000, // 3 seconds
        }}
      />
      <Router>
        <Routes>
          {/* Public Auth Routes */}
          <Route path="/login" element={<Suspense fallback={<SpinLoader/>}><Login /></Suspense>} />
          <Route path="/register" element={<Suspense fallback={<SpinLoader/>}><Register /></Suspense>} />
          

          <Route path="*" element={<NotFound />} />
          {/* Layout with Navbar  */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            {/* Protected Routes */}
            <Route element={<ProtectedLayout />}>
            <Route path="/onboarding/company" element={<Suspense fallback={<SpinLoader/>}><OnBoardCompany/></Suspense>} />
              <Route path="/candidate/dashboard" element={<Suspense fallback={<SpinLoader/>}><CandidateDashBoard/></Suspense>}/>
              <Route path="/recruiter/dashboard" element={<Suspense fallback={<SpinLoader/>}><RecruiterDashBoard/></Suspense>}/>
              <Route path="/resume-builder" element={<Suspense fallback={<SpinLoader/>}><ResumeBuilder /></Suspense>} />
              <Route path="/resume/:resumeId" element={<Suspense fallback={<SpinLoader/>}><ResumeViewer /></Suspense>} />
              <Route path="/resume/allResume" element={<Suspense fallback={<SpinLoader/>}><AllResumes /></Suspense>} />

              <Route path="/resume-analyzer" element={<Suspense fallback={<SpinLoader/>}><ResumeAnalyzer></ResumeAnalyzer></Suspense>} />
              <Route path="/interview/allReports" element={<Suspense fallback={<SpinLoader/>}><AllReports /></Suspense>} />
              <Route
                path="/interview/:interviewId"
                element={<Suspense fallback={<SpinLoader/>}><InterviewReport /></Suspense>}
              />
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
