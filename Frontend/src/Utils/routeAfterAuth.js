export const routeAfterAuth = (user, intent, navigate) =>{
    const wantsRecruiterOnboarding =
        user.role === "pending_recruiter" ||
        (user.role === "candidate" && intent === "recruiter");

    if(wantsRecruiterOnboarding && !user.company){
        navigate("/onboarding/company");
        return;
    }

    if(user.role === "recruiter" || user.role === "company_admin"){
        navigate("/recruiter/pipeline");
        return;
    }
    navigate("/all/job");
}