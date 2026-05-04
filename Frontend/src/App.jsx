import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./features/Auth/pages/Login.jsx"
import Register from "./features/Auth/pages/Register.jsx"
import Protected from "./features/Auth/components/Protected.jsx";
import Home from "./features/interview/pages/Home.jsx";
import InterviewReport from "./features/interview/pages/InterviewReport.jsx";
import TechnicalQuestion from "./features/interview/pages/TechnicalQuestion.jsx";
import BehavioralQuestion from "./features/interview/pages/BehavioralQuestion.jsx";
import Roadmap from "./features/interview/pages/Roadmap.jsx";





const App = () => {
  return (
    <div className="min-h-screen bg-gray-950">
      
      <Router>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/"  element={<Protected><Home/></Protected>}/>
          <Route path="/interview/:interviewId" element={<Protected><InterviewReport/></Protected>}/>
          <Route path="/interview/techQ" element={<Protected><TechnicalQuestion/></Protected>}/>
          <Route path="/interview/behQ" element={<Protected><BehavioralQuestion/></Protected>}/>
          <Route path="/interview/roadmap" element={<Protected><Roadmap/></Protected>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App