import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth.js"
import SpinLoader from "../../../Shared/SpinLoader.jsx";


const Protected = ({children, allowedRoles}) => {
    const {user, isInitializing, loading } = useAuth();
    const location = useLocation();
    
    if (isInitializing || loading) {
    return (
      <SpinLoader/>
    );
  }
    if(!user){
        return <Navigate to={"/login"} state={{from:location}} replace></Navigate>
    }
    if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  return children
}

export default Protected

