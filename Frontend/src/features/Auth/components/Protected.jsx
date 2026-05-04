import { Navigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth.js"


const Protected = ({children}) => {
    const {user, loading} = useAuth();
    
    if(loading){
      return <main className="min-h-screen flex justify-center items-center"><h1 className="text-white text-3xl">Loading....</h1></main>
    }
    if(!user){
        return <Navigate to={"/login"}></Navigate>
    }
  return children
}

export default Protected