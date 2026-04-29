import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./features/Auth/pages/Login.jsx"
import Register from "./features/Auth/pages/Register.jsx"



const App = () => {
  return (
    <div className="min-h-screen bg-gray-950">
      
      <Router>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App