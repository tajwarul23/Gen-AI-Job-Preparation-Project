import axios from "axios"

//whenever there is any interaction with the cookie we have to use withCredentials : true 
////so the browser sends the cookie to server also receives/stores the cookie

//creating an instance of axios that is constant for API calling

const api = axios.create({
    baseURL : "http://localhost:3000",
    withCredentials:true
})


export const register = async({userName, email, password})=>{

   try {
     const response = await api.post("/api/auth/register",{
        userName,email,password
    })

    return response.data;

   } catch (error) {
    console.log("Error in register", error.message)
   }
}

export const login = async({email, password})=>{
    try {
        const response = await api.post("/api/auth/login",{
            email, password
        })
        return response.data;
    } catch (error) {
        console.log("Error in login", error.message);
        
    }
}

export const logout = async()=>{
    try {
        const response = await api.get("/api/auth/logout")
        return response.data
    } catch (error) {
        console.log("Error in logout", error.message);
    }
}

export const getMe = async()=>{
    try {
        const response = await api.get("/api/auth/get-me");
        return response.data;
    } catch (error) {
        console.log("Error in getMe", error.message);
    }
}