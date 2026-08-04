export const routeAfterAuth = (user, intent, navigate) =>{
    if(user.role === "candidate" && intent === "recruiter" && !user.company){
        navigate("/onboarding/company");
        return;
    }

    if(user.role === "recruiter" || user.role === "company_admin"){
        navigate("/recruiter/dashboard");
        return;
    }
    navigate("/candidate/dashboard");
}