import { createContext, useMemo, useState } from "react";

export const ResumeContext = createContext();

export const ResumeProvider = ({children})=>{

    const [loading, setLoading] = useState(false);
    const [resume, setResume] = useState(null);
    const [error, setError] = useState(null);
    const [resumes, setResumes] = useState([]);

    const value = useMemo(()=>({
        loading, setLoading, resume, setResume, resumes, setResumes, error, setError
    }),[loading, resume, resumes, error]);


    return(
        <ResumeContext.Provider value={value}>
            {children}
        </ResumeContext.Provider>
    )
}