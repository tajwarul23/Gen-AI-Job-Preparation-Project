export const routeAfterAuth = (user, intent, navigate) =>{
    if(user.role === "recruiter" || user.role === "company_admin"){
        navigate("/recruiter/pipeline");
        return;
    }
    if(user.role === "candidate" && intent === "recruiter" && !user.company){
        navigate("/onboarding/company");
        return;
    }
    navigate("/dashboard")
}