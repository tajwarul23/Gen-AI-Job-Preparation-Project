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
const App = () => {
  return (
    <div className="min-h-screen bg-app">
 <Router>
      <Routes>

        {/* Public Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

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

          </Route>

        </Route>

      </Routes>
    </Router>
    </div>
  );
};

export default App;
